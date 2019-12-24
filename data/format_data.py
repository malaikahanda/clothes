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
R_MIN = 8
R_MAX = 30


################################################################################
# CREATE THE NODES
################################################################################

# get images
images = [
  i.replace("_", " ").replace(".png", "")
  for i in os.listdir("../images")]

# get counts
items = []
for i, row in days.iterrows():
    not_null = [e for e in row.tolist()[1:] if e != ""]
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

# add count column
data = {"item": list(counts.keys()), "n_worn": list(counts.values())}
count_df = pd.DataFrame(data).set_index("item")
nodes = count_df.join(nodes)

# temp
nodes = nodes[nodes.index.isin(images)]

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

# keep node ids
node_ids = dict()

# iterate through the days and create links between all items
all_links = []
for i, row in days.iterrows():
    not_null = [e for e in row.tolist()[1:] if e != "" and e in images]
    for item in not_null:
        if item not in node_ids:
            node_ids[item] = len(node_ids)
    ids = [node_ids[n] for n in not_null]
    pairs = list(itertools.combinations(ids, 2))
    links = [{"source": x, "target": y} for (x, y) in pairs]
    all_links.extend(links)


################################################################################
# OUTPUT
################################################################################

# format the nodes into a list
n_list = [0] * len(node_ids)
n_dict = nodes.to_dict("index")
for item, info in n_dict.items():
    node_id = node_ids[item]
    n_list[node_id] = info

# format the graph into json
g = json.dumps({"nodes": n_list, "links": all_links})

# save it
with open("graph.json", "w") as f:
    f.write(g)