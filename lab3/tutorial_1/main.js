var coffeeData = [
    { month: "May", sales: 6900 },
    { month: "June", sales: 14240 },
    { month: "July", sales: 37500 },
    { month: "August", sales: 17500 }
];

var yScale = d3.scaleBand()
    .domain(['May', 'June', 'July', 'August'])
    .rangeRound([40,260])
    .padding(0.5);

var wScale = d3.scaleLinear()
    .domain([0, 37500])
    .range([0,300]);

var svg = d3.select('svg');

svg.selectAll('rect')
    .data(coffeeData)
    .enter()
    .append('rect')
    .attr('y', function(d){
        return yScale(d.month) - 10;
    })
    .attr('x', 80)
    .attr('height', yScale.bandwidth())
    .attr('width', function(d){
        return wScale(d.sales);
    })
    .style('fill', '#5f3e36');

var wAxis = d3.axisBottom(wScale).ticks(6);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(80,250)')
    .call(wAxis);

var yAxis = d3.axisLeft(yScale).ticks(6);

svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(60, -10)')
    .call(yAxis);

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(14,180) rotate(-90)')
    .text('Months');

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(147,288)')
    .text('Coffee Shop Sales ($)');

