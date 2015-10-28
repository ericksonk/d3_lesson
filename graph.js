svg = d3.select("svg");
g = svg.append("g");
g.attr("transform", "translate(100,50)");

x = d3.scale.linear()
    .domain([2000, 2012])  // Fill in the domain values for the x axis
    .range([0, 800]);
y = d3.scale.linear()
    .domain([1, 70])  // Fill in the domain values for the y axis
    .range([400, 0]);

x_axis = d3.svg.axis().scale(x).orient("bottom").ticks(5).tickFormat(d3.format("d"));
y_axis = d3.svg.axis().scale(y).orient("left").ticks(4);

g.call(y_axis);

gx = g.append("g");
gx.call(x_axis);
gx.attr("transform", "translate(0,400)");

d3.csv("old_discoveries.csv", function(csv_data) {
  g.selectAll("circle") // selects all circles
    .data(csv_data) //data join, pass data set
    .enter().append("circle") // for each data point, append circle
      .attr("cx", function(point) {return x(point.year);}) // for what ever point your looking at, make cx equal to that
      .attr("cy", function(point) {return y(point.important_discoveries);})
      .attr("r", 5);
});

function updateDiscoveries() {
  d3.select('#update_data').on('click', function () {
    d3.csv("new_discoveries.csv", function(csv_data) {
      var join = g.selectAll("circle") // selects all circles
        .data(csv_data); //data join, pass data set

        join.attr("cx", function(point) {return x(point.year);}) // for what ever point your looking at, make cx equal to that
          .attr("cy", function(point) {return y(point.important_discoveries);});

        join.enter().append("circle") // for each data point, append circle
          .attr("cx", function(point) {return x(point.year);}) // for what ever point your looking at, make cx equal to that
          .attr("cy", function(point) {return y(point.important_discoveries);});

        join.exit().remove();
  });
});
}










//   data.forEach(function(point) {
//     g.append("circle")
//       .attr("cx", x(point.year)) // year
//       .attr("cy", y(point.important_discoveries)) // important discoveries
//       .attr("r", 5);
//   });
// });


// Okay, now all of your axes are set up.  Add code to draw points here.


// g.append("circle").attr("cx", x(2000)).attr("cy", y(45)).attr("r", 5); //Fill in the parens and add stuff after the last dot, then make more of these lines.
// g.append("circle").attr("cx", x(2001)).attr("cy", y(45)).attr("r", 5);
// g.append("circle").attr("cx", x(2002)).attr("cy", y(45)).attr("r", 5);
