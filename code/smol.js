// maybe this will help
// https://bl.ocks.org/alex1221/321f17256825486c9deb5278ddb6597c

// TODO: figure out where this function goes
// maybe nest it within the ticked function??
// not updating properly 
function displayRadioValue(idName) { 
  var ele = document.getElementsByName(idName); 
  var selected = null;
  for(i = 0; i < ele.length; i++) { 
    if(ele[i].checked) {
      selected = ele[i].value;
    }
  }
  return selected;
} 

var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/data/nodes.json";
d3.json(url).then(function(nodes) {


  // var nodes = g.nodes;
  // var edges = g.links;

  var width = 1280, height = 720;
  
  var picR = 5;

  // TODO: this needs to be better lol-- should adjust dynamically based on screen size
  var xCenter = [100, 200, 300, 400, 100, 200, 300, 400, 100, 200, 300, 400];
  var yCenter = [-150, -150, -150, -150, 0, 0, 0, 0, 150, 150, 150, 150];

  var graphMode = displayRadioValue("view") == "graph";

  if (graphMode) {
    var simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(2))
        .force('x', d3.forceX().x(function(d) { return xCenter[d.sorter]; }))
        .force('y', d3.forceY().y(function(d) { return yCenter[d.sorter]; }))
        .force('collision', d3.forceCollide().radius(picR))
        // still unsure... do i want to size nodes? or keep them constant
        // .force('collision', d3.forceCollide().radius(function(d) { return d.radius; }))
        .on('tick', ticked);
  } else {
    var simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(2))
        .force('x', d3.forceX().x(function(d) { return yCenter[d.sorter]; }))
        .force('y', d3.forceY().y(function(d) { return xCenter[d.sorter]; }))
        .force('collision', d3.forceCollide().radius(picR))
        // still unsure... do i want to size nodes? or keep them constant
        // .force('collision', d3.forceCollide().radius(function(d) { return d.radius; }))
        .on('tick', ticked);
  }



  function ticked() {

    var sortingCategory = displayRadioValue("sorter");
    console.log(sortingCategory);
    var allValues = nodes.map(d => d[sortingCategory]);
    var uniqueValues = Array.from(new Set(allValues));
    var numUniqueValues = uniqueValues.length;
    for (i = 0; i < nodes.length; i ++) {
      var node = nodes[i];
      var category = uniqueValues.findIndex(x => (x === node[sortingCategory]));
      node.sorter = category;
    }


    simulation = d3.forceSimulation(nodes)
      .force('x', d3.forceX().x(function(d) { return xCenter[d.sorter]; }))
      .force('y', d3.forceY().y(function(d) { return yCenter[d.sorter]; }));

    var u = d3.select("svg g")
      .selectAll("image")
      // .selectAll("circle")
      .data(nodes)

    u.enter()
      .append("image")
      .attr("xlink:href", function(d) { return d.img; })
      // TODO: if the radius is fixed, this should be dynamic as well, based on screen size
      .attr("width", picR * 2)
      .attr("height", picR * 2)
      // .attr("width", function(d) { return d.radius * 2; })
      // .attr("height", function(d) { return d.radius * 2; })
      .merge(u)
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });

    u.exit().remove();

  }

});
