var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/data/nodes.json";
d3.json(url).then(function(nodes) {

  // sortby
  var sorter = "color";
  var allSorters = nodes.map(d => d[sorter]);
  var uniqueSorters = Array.from(new Set(allSorters));
  var numSorters = uniqueSorters.length;
  for (i = 0; i < nodes.length; i ++) {
    var node = nodes[i];
    var category = uniqueSorters.findIndex(x => (x === node[sorter]));
    node.sorter = category;
  }


  var width = 1280, height = 720;
  // this needs to be better lol
  var xCenter = [100, 300, 500, 700, 100, 300, 500, 700, 100, 300, 500, 700];
  var yCenter = [-200, -200, -200, -200, 0, 0, 0, 0, 200, 200, 200, 200];

  var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(5))
    .force('x', d3.forceX().x(function(d) { return xCenter[d.sorter]; }))
    .force('y', d3.forceY().y(function(d) { return yCenter[d.sorter]; }))
    .force('collision', d3.forceCollide().radius(20))
    // .force('collision', d3.forceCollide().radius(function(d) { return d.radius; }))
    .on('tick', ticked);


  function ticked() {

    var u = d3.select("svg g")
      .selectAll("image")
      // .selectAll("circle")
      .data(nodes)

    u.enter()
      .append("image")
      .attr("xlink:href", function(d) { return d.img; })
      .attr("width", 40)
      .attr("height", 40)
      // .attr("width", function(d) { return d.radius * 2; })
      // .attr("height", function(d) { return d.radius * 2; })
      .merge(u)
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });

    u.exit().remove();

  }

});
