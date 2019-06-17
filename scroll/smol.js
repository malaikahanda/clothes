// read in a graph
var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/data/graph.json";
d3.json(url).then(function(data) {
  console.log(data);
});

/*.then(function(data) {
  console.log(data);
});*/


// d3.json(url, function(error, graph) {

//     // console.log(graph);

//     var width = 640;
//     var height = 720;
//     console.log("finished");

// });

    /*console.log(width);

    // segment the json
    var nodes = graph.nodes;
    console.log("nodes");
    console.log(nodes);
    var links = graph.links;
    console.log(links);
    var root = nodes[0];

    root.radius = 0;
    root.fixed = true;

    // create a force layout objects using our graph
    var force = d3.layout.force()
        //.gravity(0.05)
        //.charge(function(d, i) { return i ? 0 : -2000; })
        .nodes(nodes)
        .links(links)
        .size([width, height]);

    force.start()

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .append("image")
        .attr("xlink:href",  function(d) { return d.img; })
        .attr("x", function(d) { return -25; })
        .attr("y", function(d) { return -25; })
        .attr("height", 40)
        .attr("width", 40);
        // .attr("height", function(d) { return d.radius * 2; })
        // .attr("width", function(d) { return d.radius * 2; });

    // do this every millisecond (or arbitrary time length)
    force.on("tick", function(e) {

        var q = d3.geom.quadtree(nodes);
        var i = 0;
        var n = nodes.length;

        while (++i < n) q.visit(collide(nodes[i]));

        svg.selectAll("image")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });
    });


    // svg.on("mousemove", function() {
    //     var p1 = d3.mouse(this);
    //     root.px = p1[0];
    //     root.py = p1[1];
    //     force.resume();
    // });


    function collide(node) {

        // var r = node.radius + 16;
        var r = 40 + 16;
        var nx1 = node.x - r;
        var nx2 = node.x + r;
        var ny1 = node.y - r;
        var ny2 = node.y + r;

        return function(quad, x1, y1, x2, y2) {

            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x;
                var y = node.y - quad.point.y;
                var l = Math.sqrt(x * x + y * y);
                // var r = node.radius + quad.point.radius;
                var r = 40 + quad.point.radius;

                if (l < r) {
                    l = (l - r) / l * .5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }

            }

        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };

    }

});*/