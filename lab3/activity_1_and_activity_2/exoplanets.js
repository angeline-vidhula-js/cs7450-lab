// **** Your JavaScript code goes here ****
let scaling = data => {
    // contains all the scaling details
    this.data = data;

    // Habitual Zone Distance scaling
    this.hzdExtent = d3.extent(this.data, function(d){
        return +d['habital_zone_distance'];
    });

    this.xScale = d3.scaleLinear()
        .domain(this.hzdExtent)
        .range([100,500]);

    this.xAxis1 = d3.axisBottom(this.xScale).ticks(11);
    
    this.xAxis2 = d3.axisTop(this.xScale).ticks(11);

    // Mass scaling
    this.massExtent = d3.extent(this.data, function(d){
        return +d['mass'];
    });

    this.yScale = d3.scaleLog()
        .domain(this.massExtent)
        .range([60,660]);

    this.yAxis1 = d3.axisLeft(this.yScale).ticks(10);
    
    this.yAxis2 = d3.axisRight(this.yScale).ticks(10);

    // Radius scaling
    this.radExtent = d3.extent(data, function(d){
        return +d['radius'];
    });

    this.radiusScale = d3.scaleSqrt()
        .domain(this.radExtent)
        .range([0,20]);

    // Color scaling
    this.colorScale = d3.scaleQuantize()
        .domain(this.hzdExtent)
        .range(['#d64d3f', '#96ac3d', '#208d8d']);

    return this;
}

let createAxes = data => {
    let svg = d3.select('svg');

    let scaledData = scaling(data);
    
    // Append the 2 X Axes
    svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,35)')
        .call(scaledData.xAxis1);
        

    svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,700)')
            .call(scaledData.xAxis2);
    
    // Append X Axes Labels
    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(245,23)')
        .text('Habitual Zone Distance');

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(245,723)')
        .text('Habitual Zone Distance');

    // Append the 2 Y Axes
    svg.append('g')
		.attr('class', 'y axis')
		.attr('transform', 'translate(60, 0)')
        .call(scaledData.yAxis1);
    
    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(540, 0)')
        .call(scaledData.yAxis2);

    // Append the 2 Y Axes Labels
    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(20,400) rotate(-90)')
        .text('Planet Mass (Relative to Earth)');

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(587,400) rotate(-90)')
        .text('Planet Mass (Relative to Earth)');

    createGraph(data, scaledData, svg);
}

let createGraph = (data, scaledData, svg) => {
    // Create the circles
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("r", function(d) {
                return scaledData.radiusScale(d.radius);
            })
            .attr("cx", function(d) {
                return scaledData.xScale(d.habital_zone_distance);
            })
            .attr("cy", function(d) {
                return scaledData.yScale(d.mass);
            })
            .attr("fill", function(d) {
                // 3 different color circles
                return scaledData.colorScale(d.habital_zone_distance);
            });

    // Append text for the 4 planets: Mercury, Venus, Earth, Mars
    svg.append('g')
        .selectAll("text")
        .data(data)
        .enter()
        .filter(function(d) { return d.name == "Mercury"|| d.name == "Earth" || d.name == "Venus" || d.name == "Mars"})
        .append("text")
        .attr("x", function(d) {
            return scaledData.xScale(d.habital_zone_distance) + 5;
        })
        .attr("y", function(d) {
            return scaledData.yScale(d.mass) + 5;
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