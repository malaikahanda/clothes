
// dimensions of the viz
var width = 640; 
var height = 480;

// read in a graph
// var url = "/smol.json";
// d3.json(url).then(function(data) {
//     console.log(data.nodes)
// });

var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/scroll/smol_nodes.json";
d3.json(url, function(error, nodes) {
    
    // no edges in our graph!
    var links = [];

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
        .nodes(nodes)
        .links(links);

    // the nodes and link information exists in memory
    // but we cant see it yet
    // we need to map all that information to images

    // we map each node to a circle
    var node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node');

    // and we map the links to lines
    var link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link');

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
        node
            .attr('r', width / 25)
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });

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