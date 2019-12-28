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
IMG_DIR = "../images"
R_MIN = 25
R_MAX = 40
IMG_STRING = "https://raw.githubusercontent.com/malaikahanda/clothes/master/images/{}.png"


################################################################################
# CREATE THE NODES
################################################################################

# get list of existing images
images = [
  i.replace("_", " ").replace(".png", "")
  for i in os.listdir(IMG_DIR)]

# get count of each clothing item
items = []
for i, row in days.iterrows():
    not_null = [e.strip() for e in row.tolist()[1:] if e != ""]
    items.extend(not_null)
counts = Counter(items)

#temp
print("NEED PICTURES:")
for item in counts.keys():
    if (item not in images):
        print(item)

# temp
print("")
print("COUNTS:")
for e in counts.most_common(len(counts)):
    print(e)

# add count column to nodes df
data = {"item": list(counts.keys()), "n_worn": list(counts.values())}
count_df = pd.DataFrame(data).set_index("item")
nodes = count_df.join(nodes)

# temp
nodes = nodes[nodes.index.isin(images)]
nodes = nodes.dropna(axis="index")
nodes.loc[nodes["n_worn"] > 30, "n_worn"] = 30

# scale the counts to be reasonable
old_min = min(nodes["n_worn"])
old_max = max(nodes["n_worn"])
nodes["radius"] = (((nodes["n_worn"] - old_min) * (R_MAX - R_MIN)) / (old_max - old_min)) + R_MIN
nodes = nodes.round({"radius": 0})

# add image column
nodes["img"] = [IMG_STRING.format(node.replace(" ", "_")) for node in nodes.index.tolist()]


################################################################################
# CREATE THE LINKS
################################################################################

# each node has an associated id
node_ids = dict()

# iterate through the days and create links between all items
all_pairs = []
for i, row in days.iterrows():
    not_null = [e for e in row.tolist()[1:] if e != "" and e in images]
    for item in not_null:
        if item not in node_ids:
            node_ids[item] = len(node_ids)
    ids = [node_ids[n] for n in not_null]
    ids.sort()
    pairs = list(itertools.combinations(ids, 2))
    all_pairs.extend(pairs)

# get the weight of each link
pairs_count = dict()
for x, y in all_pairs:
    if (x, y) in pairs_count:
        pairs_count[(x, y)] += 1
    else:
        pairs_count[(x, y)] = 1

all_links = [{"source": y, "target": y} for (x, y), n in pairs_count.items()]


################################################################################
# OUTPUT
################################################################################

# format the nodes into a list
n_list = [0] * len(node_ids)
n_dict = nodes.to_dict("index")
for item, info in n_dict.items():
    node_id = node_ids[item]
    info["id"] = node_id
    n_list[node_id] = info

# save nodes
with open("nodes.json", "w") as f:
    f.write(json.dumps(n_list))

# save links
with open("links.json", "w") as f:
    f.write(json.dumps(all_links))