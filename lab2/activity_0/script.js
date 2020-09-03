d3.csv('baseball_hr_leaders_2017.csv').then(function(dataset) {
	console.log("Line 1: inside the callback function");
});
console.log("Line 2: outside the callback function");


var states = ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont"];

var p = d3.select("body").selectAll("p")
	.data(states)
	.enter()
	.append("p")
    .text(function(d, i) { return d; })
    .style('color', '#777')
	.style('font-size', '10px')
	.style('font-weight', function(d) {
		return d == 'Massachusetts' ? 'bold' : 'normal';
    });
    

var numericData = [1, 2, 4, 8, 16];

var svg = d3.select('#bars');

// Add rectangles
svg.selectAll('rect')
    .data(numericData)
    .enter()
    .append('rect')
    .attr('fill', '#f77e46')
    .attr('width', 30)
    .attr('height', function(d){
        return 160 * d / 16;
    })
    .attr('y', 20)
    .attr('x', function(d, i) {
        return (i * 40) + 100;
    });