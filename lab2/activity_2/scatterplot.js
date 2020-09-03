// **** Your JavaScript code goes here ****


// **** Functions to call for scaled values ****


var yearScale = d3.scaleLinear()
    .domain([1870,2017])
    .range([60,700]);
var hrScale = d3.scaleLinear()
    .domain([0,75])
    .range([340,20]);

function scaleYear(year) {
    return yearScale(year);
}

function scaleHomeruns(homeruns) {
    
    return hrScale(homeruns);
}

let createAxes = (data) => {
    // **** Code for creating scales, axes and labels ****

    var svg = d3.select('svg');

    svg.append('g').attr('class', 'x axis')
        .attr('transform', 'translate(0,345)')
        .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}));

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(360,390)')
        .text('MLB Season');

    svg.append('g').attr('class', 'y axis')
        .attr('transform', 'translate(55,0)')
        .call(d3.axisLeft(hrScale));

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(15,200) rotate(90)')
        .text('Home Runs (HR)');

    svg.append('text')
        .attr('class', 'title')
        .attr('transform','translate(360,30)')
        .text('Top 10 HR Leaders per MLB Season');

    drawData(data, svg);
}



let drawData = (data, svg) => {
    
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("r", 2)
            .attr("id", function (d, i) {
                return "circle-" + i;
            })
            .classed("top", function (d, i) {
                if(1 <= d.rank && d.rank <= 3) {
                    return true;
                }
                return false;
            })
            .attr("cx", function(d) {
                return scaleYear(d.year);
            })
            .attr("cy", 345)
            .on("mouseover", function () {
                let id = d3.select(this)
                    .attr("id").split("-")[1];
                d3.select(".show").classed("show", false);
                d3.select(`#text-${id}`).classed("show", true);
            })
            .on("mouseout", function () {
                d3.select(".show").classed("show", false);
            });
    d3.selectAll("circle").transition()
        .delay(function(d,i){return(i/10)})
        .duration(800)
        .attr("cy", function(d, i) {
            return scaleHomeruns(d.homeruns);
        });
                   
    svg.append('g')
        .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("dx", function(d) {
                return scaleYear(d.year);
            })
            .attr("dy", function(d, i) {
                return scaleHomeruns(d.homeruns);
            })
            .text( function (d) { return d.name; })
            .attr("class", "dotlabel")
            .attr("id", function (d, i) {
                return "text-" + i;
            })
            .on("mouseover", function () {
                d3.select(this).classed("show", true);
            })
            .on("mouseout", function () {
                d3.select(this).classed("show", false);
            });
    // let circleAttributes = circles
        
}

let init = () => {
    d3.csv('baseball_hr_leaders.csv').then(data => {
        //   sorting data based on name
        data = data.sort((a, b) => {
            return d3.ascending(a.name, b.name);
        });
        createAxes(data);
    });
}

init();