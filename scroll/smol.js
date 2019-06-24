var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/data/nodes.json";
d3.json(url).then(function(nodes) {


  var width = 1280, height = 720;
  // this needs to be better lol
  var xCenter = [50, 200, 350, 500, 50, 200, 350, 500, 50, 200, 350, 500];
  var yCenter = [-150, -150, -150, -150, 0, 0, 0, 0, 150, 150, 150, 150];

  console.log(nodes);

  var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(5))
    .force('x', d3.forceX().x(function(d) {
      return xCenter[d.sorter]; // this can be d.xCenter?
    }))
    .force('y', d3.forceY().y(function(d) {
      return yCenter[d.sorter]; // this can be d.xCenter?
    }))
    .force('collision', d3.forceCollide().radius(function(d) {
      return d.radius;
    }))
    .on('tick', ticked);

  console.log(nodes);

  function ticked() {
    var u = d3.select('svg g')
      .selectAll('circle')
      .data(nodes);

    u.enter()
      .append('circle')
      .attr('r', function(d) {
        return d.radius;
      })
      .style('fill', function(d) {
        return d.color; // this can be d.color?
      })
      .merge(u)
      .attr('cx', function(d) {
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      })

    u.exit().remove();

  }




});
