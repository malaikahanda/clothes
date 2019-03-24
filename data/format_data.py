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

# read in the files
nodes = pd.read_csv("node_attributes.csv")

# determine sorting column
COL = "color"


################################################################################
# CREATE THE NODES
################################################################################

# add image column
IMG_STRING = "https://raw.githubusercontent.com/malaikahanda/clothes/master/images/{}.png"
nodes["img"] = [IMG_STRING.format(node.replace(" ", "_")) for node in nodes["item"].tolist()]


################################################################################
# CREATE THE LINKS
################################################################################

all_links = []

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
n = nodes.to_json(orient="records")
g = json.dumps({"nodes": json.loads(n), "links": all_links})
# save it

with open("graph.json", "w") as f:
    f.write(g)