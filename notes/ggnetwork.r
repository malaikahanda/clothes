# imports
library(ggnetwork)
library(tidyverse)
library(igraph)

# edges
e = read_csv("edges.csv")
e_sub = as.matrix(e[, 1 : 2])
g = graph_from_edgelist(e_sub, directed = FALSE)

# plot
plot.igraph(g)
