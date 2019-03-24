
// dimensions of the viz
var width = 640; 
var height = 480;

// in the body of our html file,
// add a svg container
// (ie, a section of <svg>...</svg>)
// and fill in the dimension attributes
var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);
//console.log(document.body.svg.childNodes);

// read in a graph
var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/data/graph.json";
build(0);
console.log(document.body.childNodes[4]);
build(1);
console.log(document.body.childNodes[4]);

function build(index) {
    d3.json(url, function(error, nodes) {

        // i should figure out a better format for this json
        // jesus fuckin christ
        var nodes = nodes[index];

        // let's see what we've read in
        //console.log(nodes);
        
        // no edges in our graph!
        var links = [];

        // create a force layout object, 
        // and set its properties
        var force = d3.layout.force()
            .size([width, height])
            .nodes(nodes)
            .links(links);  

        // the nodes and link information exists in memory
        // but we cant see it yet
        // we need to map all that information to images

        // map the links to lines
        var link = svg.selectAll('.link')
            .data(links)
            .enter().
            append('line')
            .attr('class', 'link');

        // map the nodes to circles
        var node_selection = svg.selectAll(".node").data(nodes);
        //console.log(node_selection);
        var node = node_selection.enter().append("g")
            .attr("class", "node");

        // when force is done with its calculations
        // (ie, its 'end'-ed)
        // there will be a bunch of info stored in the object
        // it'll call this function to see what the layout should like like
        // we can use information from the calculations
        // in order to position our display
        force.on('end', function() {

            // where should the nodes be?
            node.append("image")
                .attr("xlink:href", function(d) { return d.img; })
                .attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; })
                .attr("width", 30)
                .attr("height", 30);
                // .attr("width", function(d) { return Math.round(20 + ((d.n_worn / 24) * 50)); })
                // .attr("height", function(d) { return Math.round(20 + ((d.n_worn / 24) * 50)); });

            // where should the links be?
            link
                .attr('x1', function(d) { return d.source.x; })
                .attr('y1', function(d) { return d.source.y; })
                .attr('x2', function(d) { return d.target.x; })
                .attr('y2', function(d) { return d.target.y; });

        });

        // tell force to start the calculations
        force.start();
        //console.log(svg);

    });
}