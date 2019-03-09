// dimensions
var width = 1000;
var height = 1000;

// create an svg to draw in
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(0.05)
    .distance(100)
    .charge(-100)
    .size([width, height]);

d3.json("https://raw.githubusercontent.com/malaikahanda/clothes/master/data/graph.json", function(error, json) {
    if (error) throw error;

    force
        .nodes(json.nodes)
        .links(json.links)
        .start();

    var link = svg.selectAll(".link")
        .data(json.links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr('stroke', function(d) { return "#ddd"; })
        .attr('stroke-width', function(d) { return d.value; });

    var node = svg.selectAll(".node")
        .data(json.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("image")
        .attr("xlink:href", function(d) { return d.img; })
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", 50)
        .attr("height", 50);

    node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });

    // build a dictionary of nodes that are linked
    var linkedByIndex = {};
    links.forEach(function(d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    // check the dictionary to see if nodes are linked
    function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }

    // fade nodes on hover
    function mouseOver(opacity) {
        return function(d) {
            // check all other nodes to see if they're connected
            // to this one. if so, keep the opacity at 1, otherwise
            // fade
            node.style("stroke-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                return thisOpacity;
            });
            node.style("fill-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                return thisOpacity;
            });
            // also style link accordingly
            link.style("stroke-opacity", function(o) {
                return o.source === d || o.target === d ? 1 : opacity;
            });
            link.style("stroke", function(o) {
                return o.source === d || o.target === d ? o.source.colour : "#ddd";
            });
        };
    }

    function mouseOut() {
        node.style("stroke-opacity", 1);
        node.style("fill-opacity", 1);
        link.style("stroke-opacity", 1);
        link.style("stroke", "#ddd");
    }

});