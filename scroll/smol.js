
// dimensions of the viz
var width = 640; 
var height = 480;

// read in a graph
// var url = "/smol.json";
// d3.json(url).then(function(data) {
//     console.log(data.nodes)
// });

var url = "https://raw.githubusercontent.com/malaikahanda/clothes/master/scroll/emplyees.json";
d3.json(url, function(error, data) {
    console.log(data[0]);
});