
// read in dates
// read in a graph
var url = "../data/days.csv";
// d3.csv(url, function(error, days) {

// });

d3.csv(url).then(function(data) {
  console.log(data[0]);
});