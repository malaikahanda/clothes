################################################################################
# SET UP
################################################################################

# imports
from collections import Counter
import itertools
import json
import os

# read in the file
with open("days.csv") as f:
    data = f.read()
    rows = data.split("\n")

# read in the images
images = os.listdir("../images")

################################################################################
# GRAPH
################################################################################

# nodes

all_items = []
for row in rows:
    items = [i for i in row.split(",")[1 :] if (i != "")]
    all_items += items

counts = Counter(all_items)

node_dict = {}
nodes = []
i = 0
for n in counts:
    image_name = n.replace(" ", "_") + ".png"
    if (image_name not in images):
        continue
    node = {
        "name": n,
        "id": i,
        "n_worn": counts[n],
        "img": "https://raw.githubusercontent.com/malaikahanda/clothes/master/images/{}".format(image_name)
    }
    nodes.append(node)
    node_dict[n] = i
    i += 1

# # edges

# all_pairs = []
# for row in rows:
#     items = sorted([i for i in row.split(",")[1 :] if (i != "")])
#     items = [i for i in items if i in node_dict]
#     pairs = itertools.combinations(items, 2)
#     all_pairs += pairs

# counts = Counter(all_pairs)

# edges = []
# for (src, tgt) in counts:
#     edge = {
#         "source": node_dict[src],
#         "target": node_dict[tgt],
#         "value": counts[(src, tgt)]
#     }
#     edges.append(edge)

################################################################################
# DATES
################################################################################

# dates = {}
# for row in rows:
#     try:
#         items = [i for i in row.split(",") if (i != "")]
#         date = items[0]
#         clothes = items[1 :]
#         dates[date] = clothes
#     except:
#         continue

################################################################################
# OUTPUT
################################################################################

graph = {
    "nodes": nodes,
    "links": [] #edges
}

graph = [nodes, []]
with open("graph.json", "w") as f:
    json.dump(graph, f)

# with open("dates.json", "w") as f:
#     json.dump(dates, f)