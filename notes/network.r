# imports
library(networkD3)
library(tidyverse)

# edges
edges = read_csv("edges.csv")
edges_numeric = data.frame(
  from_numeric = as.numeric(factor(edges$e1)) - 1,
  from = edges$e1,
  to_numeric = as.numeric(factor(edges$e2)) - 1,
  to = edges$e2
  )

# nodes
nodes = read_csv("nodes.csv")
nodes_numeric = data.frame(
  node_numeric = as.numeric(factor(nodes$node)) - 1,
  node = nodes$node,
  weight = nodes$weight,
  group = rep("one", nrow(nodes))
  )

# plot
forceNetwork(
  Links = edges_numeric,
  Nodes = nodes_numeric,
  Source="from_numeric",
  Target="to_numeric",
  NodeID = "node",
  linkWidth = 1,
  linkColour = "#afafaf",
  Group = "one",
  fontSize = 12,
  zoom = T,
  legend = T,
  opacity = 0.8,
  charge = -300, 
  width = 600,
  height = 400
  )