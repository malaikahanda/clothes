
// in the body of our html file, add a svg container
// (ie, a section of <svg>...</svg>)
// and fill in the dimension attributes
var width = 640; 
var height = 480;
var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

// read in a graph
var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/data/graph.json";
d3.json(url, function(error, graph) {

    // initial json
    console.log(graph);

    // segment the json
    var nodes = graph.nodes;
    console.log(nodes);
    var links = graph.links;
    console.log(links);

    // create a force layout objects using our graph
    var force = d3.layout.force()
        .size([width, height])
        .nodes(nodes)
        .links(links);

    // add a line corresponding to each link
    var link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link");

    // add a circle corresponding to each node
    var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "node");

    // instruct force what to do when it's done with the calculations
    force.on("end", function() {

        console.log(node);

        // put the nodes in place
        node.attr("r", 5)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("fill", function(d) { return d.color; });

        // put the links in place
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

    });

    // start the calculations!
    force.start();

});