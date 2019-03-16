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
days = pd.read_csv("days.csv", header=None).set_index(0).fillna("")
node_attr = pd.read_csv("node_attributes.csv").set_index("item")


################################################################################
# SET UP
################################################################################

# convert the days data into a data frame of nodes and counts
clothes = []
for i, row in days.iterrows():
    items = [e for e in row.tolist() if e != ""]
    clothes.extend(items)
c = Counter(clothes)
counts = pd.DataFrame({"item": list(c.keys()), "n_worn": list(c.values())}).set_index("item")

# join the counts with the node attributes
node_df = node_attr.join(counts)

# add image column
IMG_STRING = "https://raw.githubusercontent.com/malaikahanda/clothes/master/images/{}.png"
node_df["img"] = [IMG_STRING.format(node.replace(" ", "_")) for node in node_df.index.tolist()]
node_df = node_df.reset_index()


################################################################################
# OUTPUT
################################################################################

node_df[node_df["color"] == "red"].to_json("graph_red.json", orient="records")
node_df[node_df["color"] != "red"].to_json("graph.json", orient="records")