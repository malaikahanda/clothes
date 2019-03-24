var nodes1 = [{
    "name": "Selena Gomez"
    , "x": 400
    , "y": 400
    , "fixed": true
    , "color": "purple"
}, {
    "name": "Rihana"
    , "x": 350
    , "y": 350
    , "fixed": true
    , "color": "red"
}, {
    "name": "Avril Lavigne"
    , "x": 250
    , "y": 350
    , "fixed": true
    , "color": "green"
}];

var edges1 = [{
    "source": 1
    , "target": 0
}, {
    "source": 1
    , "target": 2
}];

nodes1.forEach((d, i) => d.generatedId = 'id' + i);

var nodes2 = [{
    "name": "Mariah Carey"
    , "x": 700
    , "y": 400
    , "fixed": true
    , "color": "purple"
}, {
    "name": "Beyonce"
    , "x": 750
    , "y": 450
    , "fixed": true
    , "color": "red"
}];

var edges2 = [{
    "source": 1
    , "target": 0
}];

nodes2.forEach((d, i) => d.generatedId = 'id' + i);

var linkDistance = 150;
//Width and height
var svgWidth = 1000;
var svgHeight = 600;
var circleRadius = 10;
var changeX = 100;
var changeY;

//Create SVG element
var svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//call the build twice (and node names are wrong) either order of calls has errors.
build(nodes1, edges1);
build(nodes2, edges2);

function build(nodes, edges) {

    // var simulation = d3.forceSimulation()
    //     .force("link", d3.forceLink()
    //         .id(function (d, i) {
    //             return i;
    //         })
    //         .distance(linkDistance))
    //     .force("charge", d3.forceManyBody()
    //         .strength(0))

    var force = d3.layout.force()
        .size([svgWidth, svgHeight])
        .nodes(nodes)
        .links(edges);

    console.log(nodes);
    console.log(force);

    var edge = svg.selectAll('.link')
        .data(edges)
        .enter()
        .append('line')
        .attr('class', 'link');

    // var edge = svg.append('g')
    //     .attr('class', 'links')
    //     .selectAll("line")
    //     .data(edges)
    //     .enter()
    //     .append("line");

    // var node = svg.selectAll(".node")
    //     .data(nodes)
    //     .enter()
    //     .append("g")
    //     .attr("class", "node");

    //Create nodes as circles
    var node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", circleRadius)
        .attr('fill', function (d) { return d.color; });
        // .call(d3.drag()
        //     .on("start", dragstarted)
        //     .on("drag", dragged)
        //     .on("end", dragended));
            
    // //Every time the simulation "ticks", this will be called
    // force.nodes(nodes)
    //     .on("tick", ticked);
    // // force.force("link")
    // //     .links(edges);

    force.on("end", function() {

        edge.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

        node.attr('r', circleRadius)
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });

        // node.append("image")
            // .attr("xlink:href", function(d) { return d.img; })
            // .attr("x", function(d) { return d.x; })
            // .attr("y", function(d) { return d.y; })
            // .attr("width", 40)
            // .attr("height", 40);
    });

    force.start();

}