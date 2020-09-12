
// **** Your JavaScript code goes here ****

let createAxes = data => {
    var svg = d3.select('svg');

    var hzdExtent = d3.extent(data, function(d){
        return +d['habital_zone_distance'];
    });

    var xScale = d3.scaleLinear()
        .domain(hzdExtent)
        .range([100,500]);
        
    var xAxis1 = d3.axisBottom(xScale).ticks(11);

    svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,35)')
        .call(xAxis1);
        
    var xAxis2 = d3.axisTop(xScale).ticks(11);

    svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,700)')
            .call(xAxis2);
    
    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(245,23)')
        .text('Habitual Zone Distance');

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(245,723)')
        .text('Habitual Zone Distance');
    

    var massExtent = d3.extent(data, function(d){
        return +d['mass'];
    });

    var yScale = d3.scaleLog()
        .domain(massExtent)
        .range([60,660]);

    var yAxis1 = d3.axisLeft(yScale).ticks(10);

    svg.append('g')
		.attr('class', 'y axis')
		.attr('transform', 'translate(60, 0)')
        .call(yAxis1);
    
    var yAxis2 = d3.axisRight(yScale).ticks(10);
    
    svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(540, 0)')
            .call(yAxis2);

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(20,400) rotate(-90)')
        .text('Planet Mass (Relative to Earth)');

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(587,400) rotate(-90)')
        .text('Planet Mass (Relative to Earth)');

    createGraph(data, svg);
}

let createGraph = (data, svg) => {
    var hzdExtent = d3.extent(data, function(d){
        return +d['habital_zone_distance'];
    });
    var xScale = d3.scaleLinear()
        .domain(hzdExtent)
        .range([100,500]);
    var massExtent = d3.extent(data, function(d){
        return +d['mass'];
    });
    var yScale = d3.scaleLog()
        .domain(massExtent)
        .range([60,660]);
    var radExtent = d3.extent(data, function(d){
        return +d['radius'];
    });
    var radiusScale = d3.scaleSqrt()
        .domain(radExtent)
        .range([0,20]);
    var colorScale = d3.scaleQuantize()
        .domain(hzdExtent)
        .range(['#d64d3f', '#96ac3d', '#208d8d']);

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("r", function(d) {
                return radiusScale(d.radius);
            })
            .attr("cx", function(d) {
                return xScale(d.habital_zone_distance);
            })
            .attr("cy", function(d) {
                return yScale(d.mass);
            })
            .attr("fill", function(d) {
                return colorScale(d.habital_zone_distance);
            });


    svg.append('g')
        .selectAll("text")
        .data(data)
        .enter()
        .filter(function(d) { return d.name == "Mercury"|| d.name == "Earth" || d.name == "Venus" || d.name == "Mars"})
        .append("text")
        .attr("x", function(d) {
            return xScale(d.habital_zone_distance) + 5;
        })
        .attr("y", function(d) {
            return yScale(d.mass) + 5;
        })
        .text(function (d) {
            return d.name;
        });
}


let init = () => {
    d3.csv('exoplanets.csv').then(data => {
        createAxes(data);
    });
}

init();