# imports
from collections import Counter
import itertools
import json

# read in the file
with open("data.csv") as f:
    data = f.read()
    rows = data.split("\n")

# goal:
# list of nodes, each with a name
# list of edges, each with a source, target, and value

# node info

all_items = []
for row in rows:
    items = [i for i in row.split(",")[1 :] if (i != "")]
    all_items += items

counts = Counter(all_items)

node_dict = {}
nodes = []
for i, n in enumerate(counts):
    node = {
        "name": n,
        "value": counts[n],
        "img": "https://raw.githubusercontent.com/malaikahanda/clothes/master/{name}.png".format(name=n.replace(" ", "_"))
    }
    nodes.append(node)
    node_dict[n] = i

# edge info

all_pairs = []
for row in rows:
    items = sorted([i for i in row.split(",")[1 :] if (i != "")])
    pairs = itertools.combinations(items, 2)
    all_pairs += pairs

counts = Counter(all_pairs)

edges = []
for (src, tgt) in counts:
    edge = {
        "source": node_dict[src],
        "target": node_dict[tgt],
        "value": counts[(src, tgt)]
    }
    edges.append(edge)

# write output
graph = {
    "nodes": nodes,
    "links": edges
}
with open("graph.json", "w") as f:
    json.dump(graph, f)