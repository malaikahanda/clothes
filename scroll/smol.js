
// dimensions of the viz
var width = 640; 
var height = 480;

// for each of the sortbys, we want a list of nodes, and an empty list of links
// create a function that will plot a list of graphs
// create a function that will take a node list and group it by element
// eg...

// def sort_by(nodes, field):
//   graphs = {}
//   for node in nodes:
//     this_field = node[field]
//     if (field) in graphs:
//       graphs[field].append(node)
//     else:
//       graphs[field] = [node]
//   return list(graphs.values()) ??? do i need a label idk

//


// read in a graph
var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/scroll/nodes.json";
d3.json(url, function(error, nodes) {

    // i should figure out a better format for this json
    // jesus fuckin christ
    var nodes1 = nodes[0];
    var nodes2 = nodes[1];
    
    // no edges in our graph!
    var links1 = [];
    var links2 = [];

    // in the body of our html file,
    // add a svg container
    // (ie, a section of <svg>...</svg>)
    // and fill in the dimension attributes
    var svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);

    // create a force layout object, 
    // and set its properties
    var force = d3.layout.force()
        .size([width, height])
        .nodes(nodes1)
        .links(links1);

    // the nodes and link information exists in memory
    // but we cant see it yet
    // we need to map all that information to images

    // map the links to lines
    var link = svg.selectAll('.link')
        .data(links1)
        .enter().append('line')
        .attr('class', 'link');

    // map the nodes to circles
    var node = svg.selectAll(".node")
        .data(nodes1)
        .enter()
        .append("g")
        .attr("class", "node");

    // and map the nodes to images

    // when force is done with its calculations
    // (ie, its 'end'-ed)
    // there will be a bunch of info stored in the object
    // it'll call this function to see what the layout should like like
    // we can use information from the calculations
    // in order to position our display
    force.on('end', function() {

        // let's see what we've calculated
        console.log(node);

        // where should the nodes be?
        node.append("image")
            .attr("xlink:href", function(d) { return d.img; })
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            // .attr("width", function(d) { return d.n_worn * 3; })
            // .attr("height", function(d) { return d.n_worn * 3; });
            .attr("width", 30)
            .attr("height", 30);

        // where should the links be?
        link
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

    });

    // tell force to start the calculations
    force.start();

});

// //making 2 datasets seems to make same problem as my for-loop in my original code does.
// var nodes0 = [{
//     "name": "Selena Gomez"
//     , "x": 400
//     , "y": 400
//     , "fixed": true
//     , "color": "purple"
// }, {
//     "name": "Rihana"
//     , "x": 350
//     , "y": 350
//     , "fixed": true
//     , "color": "red"
// }, {
//     "name": "Avril Lavigne"
//     , "x": 250
//     , "y": 350
//     , "fixed": true
//     , "color": "green"
// }];
// var edges0 = [{
//     "source": 1
//     , "target": 0
// }, {
//     "source": 1
//     , "target": 2
// }];
// nodes0.forEach((d, i) => d.generatedId = 'id' + i);
// var nodes1 = [{
//     "name": "Mariah Carey"
//     , "x": 700
//     , "y": 400
//     , "fixed": true
//     , "color": "purple"
// }, {
//     "name": "Beyonce"
//     , "x": 750
//     , "y": 450
//     , "fixed": true
//     , "color": "red"
// }];
// var edges1 = [{
//     "source": 1
//     , "target": 0
// }];
// nodes1.forEach((d, i) => d.generatedId = 'id' + i);
// var linkDistance = 150;
// //Width and height
// var svgWidth = 1000;
// var svgHeight = 600;
// var circleRadius = 10;
// var changeX = 100;
// var changeY;
// //Create SVG element
// var svg = d3.select("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);
// //call the build twice (and node names are wrong) either order of calls has errors.
// build(nodes1, edges1);
// build(nodes0, edges0);

// function build(nodes, edges) {
//     var simulation = d3.forceSimulation()
//         .force("link", d3.forceLink()
//             .id(function (d, i) {
//                 return i;
//             })
//             .distance(linkDistance))
//         .force("charge", d3.forceManyBody()
//             .strength(0))
//     var colors = d3.scaleOrdinal(d3.schemeCategory10);
//     var edge = svg.append('g')
//         .attr('class', 'links')
//         .selectAll("line")
//         .data(edges)
//         .enter()
//         .append("line");
//     //Create nodes as circles
//     var node = svg.append('g')
//         .attr('class', 'nodes')
//         .selectAll('circle')
//         .data(nodes)
//         .enter()
//         .append("circle")
//         .attr("r", circleRadius)
//         .attr('fill', function (d) {
//             return d.color;
//         })
//         .call(d3.drag()
//             .on("start", dragstarted)
//             .on("drag", dragged)
//             .on("end", dragended));
            
//     var nodes_text = svg.append('g')
//         .attr("class", "labels")
//         .selectAll(".nodetext")
//         .data(nodes)
//         .enter()
//         .append("text")
//         .attr("class", "nodetext slds-text-heading--label")
//         .attr("text-anchor", "middle")
//         .attr("dx", -20)
//         .attr("dy", 20)
//         .text(d => d.name)
//         .attr('opacity', 1)
//     //Every time the simulation "ticks", this will be called
//     simulation.nodes(nodes)
//         .on("tick", ticked);
//     simulation.force("link")
//         .links(edges);

//     function ticked() {
//         edge.attr("x1", function (d) {
//                 var xPos = d.source.x;
//                 if (xPos < 0) return 0;
//                 if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
//                 return xPos;
//             })
//             .attr("y1", function (d) {
//                 var yPos = d.source.y;
//                 if (yPos < 0) return 0;
//                 if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
//                 return yPos;
//             })
//             .attr("x2", function (d) {
//                 var xPos = d.target.x;
//                 if (xPos < 0) return 0;
//                 if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
//                 return xPos;
//             })
//             .attr("y2", function (d) {
//                 var yPos = d.target.y;
//                 if (yPos < 0) return 0;
//                 if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
//                 return yPos;
//             });
//         node.attr("cx", function (d) {
//                 var xPos = d.x;
//                 if (xPos < 0) return 0;
//                 if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
//                 return xPos;
//             })
//             .attr("cy", function (d) {
//                 var yPos = d.y;
//                 if (yPos < 0) return 0;
//                 if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
//                 return yPos;
//             });
//         nodes_text.attr("x", function (d) {
//                 var xPos = d.x;
//                 if (xPos < 0) return 0;
//                 if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
//                 return xPos;
//             })
//             .attr("y", function (d) {
//                 var yPos = d.y;
//                 if (yPos < 0) return 0;
//                 if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
//                 return yPos;
//             });
//     }

//     function dragstarted(d) {
//         if (!d3.event.active) simulation.alphaTarget(0.3)
//             .restart();
//         d.fx = d.x;
//         d.fy = d.y;
//     }

//     function dragged(d) {
//         d.fx = d3.event.x;
//         d.fy = d3.event.y;
//     }

//     function dragended(d) {
//         if (!d3.event.active) simulation.alphaTarget(0);
//         d.fx = null;
//         d.fy = null;
//     }
// }