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

# globals
COL = "color"
R_MIN = 8
R_MAX = 30

################################################################################
# CREATE A MAP FROM DATE TO ARRAY
################################################################################

date_map = dict()
for i, row in days.iterrows():
    row = row.tolist()
    date = row[0]
    not_null = [e for e in row[1:] if e != ""]
    if (date in date_map):
        date_map[date] += not_null
    else:
        date_map[date] = not_null

# for e in date_map.items():
#     print(e)


################################################################################
# CREATE THE NODES
################################################################################

# get images
images = os.listdir("../images")

# get counts
items = []
for i, row in days.iterrows():
    not_null = [e for e in row.tolist()[1:] if e != ""]
    items.extend(not_null)
counts = Counter(items)


print("NEED PICTURES:")
for item in counts.keys():
    image_name = item.replace(" ", "_") + ".png"
    if (image_name not in images):
        print(item)
        continue

print("")
print("COUNTS:")
for e in counts.most_common(len(counts)):
    print(e)

# add count column
data = {"item": list(counts.keys()), "n_worn": list(counts.values())}
count_df = pd.DataFrame(data).set_index("item")
nodes = count_df.join(nodes)

# scale the counts to be reasonable
old_min = min(nodes["n_worn"])
old_max = max(nodes["n_worn"])
nodes["radius"] = (((nodes["n_worn"] - old_min) * (R_MAX - R_MIN)) / (old_max - old_min)) + R_MIN
nodes = nodes.round({"radius": 0})

# add image column
IMG_STRING = "https://raw.githubusercontent.com/malaikahanda/clothes/master/images/{}.png"
nodes["img"] = [IMG_STRING.format(node.replace(" ", "_")) for node in nodes.index.tolist()]


################################################################################
# CREATE THE LINKS
################################################################################

all_links = []
nodes = nodes.reset_index()

# get all the possible values of COL
groups = nodes[COL].unique()

# for each value, generate a complete graph
for group in groups:
    cluster = nodes[nodes[COL] == group]
    indices = cluster.index.tolist()
    pairs = list(itertools.combinations(indices, 2))
    links = [{"source": x, "target": y} for (x, y) in pairs]
    all_links.extend(links)


################################################################################
# OUTPUT
################################################################################

# create the graph
n = nodes.to_dict("index")
g = json.dumps({"nodes": n, "links": all_links})

# save it
with open("graph.json", "w") as f:
    f.write(g)