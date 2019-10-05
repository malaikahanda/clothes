
// TODO: figure out where this function goes
// maybe nest it within the ticked function??
// not updating properly 
function displayRadioValue() { 
  var ele = document.getElementsByName("sorter"); 
  var selected = null;
  for(i = 0; i < ele.length; i++) { 
    if(ele[i].checked) {
      selected = ele[i].value;
      document.getElementById("selectedSorter").innerHTML
        = "Result: "+ selected;
    }
  }
  return selected;
} 

var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/data/nodes.json";
d3.json(url).then(function(nodes) {

  // sortby
  // var sorter = "color"; // TODO: change this eventually to be an input
  // sorter = displayRadioValue();
  // var allSorters = nodes.map(d => d[sorter]);
  // var uniqueSorters = Array.from(new Set(allSorters));
  // var numSorters = uniqueSorters.length;
  // for (i = 0; i < nodes.length; i ++) {
  //   var node = nodes[i];
  //   var category = uniqueSorters.findIndex(x => (x === node[sorter]));
  //   node.sorter = category;
  // }


  var width = 1280, height = 720;

  // TODO: this needs to be better lol-- should adjust dynamically based on screen size
  var xCenter = [100, 300, 500, 700, 100, 300, 500, 700, 100, 300, 500, 700];
  var yCenter = [-200, -200, -200, -200, 0, 0, 0, 0, 200, 200, 200, 200];

  var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(5))
    .force('x', d3.forceX().x(function(d) { return xCenter[d.sorter]; }))
    .force('y', d3.forceY().y(function(d) { return yCenter[d.sorter]; }))
    // this magic number should be half of the height/width magic numbers that
    // are in the ticked function
    .force('collision', d3.forceCollide().radius(14))
    // still unsure... do i want to size nodes? or keep them constant
    // .force('collision', d3.forceCollide().radius(function(d) { return d.radius; }))
    .on('tick', ticked);


  function ticked() {

    // var sorter = "color"; // TODO: change this eventually to be an input
    var sorter = displayRadioValue();
    var allSorters = nodes.map(d => d[sorter]);
    var uniqueSorters = Array.from(new Set(allSorters));
    var numSorters = uniqueSorters.length;
    for (i = 0; i < nodes.length; i ++) {
      var node = nodes[i];
      var category = uniqueSorters.findIndex(x => (x === node[sorter]));
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
      .attr("width", 28)
      .attr("height", 28)
      // .attr("width", function(d) { return d.radius * 2; })
      // .attr("height", function(d) { return d.radius * 2; })
      .merge(u)
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });

    u.exit().remove();

  }

});
