################################################################################
# SET UP
################################################################################

# imports
from collections import Counter
import itertools
import json
import numpy as np
import os
import pandas as pd
import random

# read in the files
nodes = pd.read_csv("node_attributes.csv").set_index("item")
days = pd.read_csv("days.csv").fillna("")
images = os.listdir("../images")

# globals
COL = "color"
R_MIN = 8
R_MAX = 30


################################################################################
# CREATE THE NODES
################################################################################

# get counts
items = []
for i, row in days.iterrows():
    not_null = [e for e in row.tolist()[1:] if e != ""]
    items.extend(not_null)
counts = Counter(items)

# print("NEED PICTURES:")
for item in counts.keys():
    image_name = item.replace(" ", "_") + ".png"
    if (image_name not in images):
        print(item)

# print("")
# print("COUNTS:")
for e in counts.most_common(len(counts)):
    # print(e)
    continue

# add count column
data = {"item": list(counts.keys()), "n_worn": list(counts.values())}
count_df = pd.DataFrame(data).set_index("item")
nodes = count_df.join(nodes)

# scale the counts to be reasonable
old_min = min(nodes["n_worn"])
old_max = max(nodes["n_worn"])
nodes["radius"] = (((nodes["n_worn"] - old_min) * (R_MAX - R_MIN)) / (old_max - old_min)) + R_MIN
nodes = nodes.round({"radius": 0})

# map the sorting column to an int
nodes[COL] = nodes[COL].astype("category")
nodes["sorter"] = nodes[COL].cat.codes

# add image column
IMG_STRING = "https://raw.githubusercontent.com/malaikahanda/clothes/master/images/{}.png"
nodes["img"] = [IMG_STRING.format(node.replace(" ", "_")) for node in nodes.index.tolist()]

# TEMP
# remove the rows where i didn't take a pic yet
nodes = nodes[nodes["type"].notna()]


################################################################################
# OUTPUT
################################################################################

# create the list of nodes
n = list(nodes.to_dict("index").values())

# save it
with open("nodes.json", "w") as f:
    json.dump(n, f)