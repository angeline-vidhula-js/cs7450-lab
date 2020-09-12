// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
    updateChart(category);
}

// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        letter: row.letter,
        frequency: +row.frequency
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 60, r: 40, b: 30, l: 40};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Compute the spacing for bar bands based on all 26 letters
var barBand = chartHeight / 26;
var barHeight = barBand * 0.7;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// A map with arrays for each category of letter sets
var lettersMap = {
    'all-letters': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    'only-consonants': 'BCDFGHJKLMNPQRSTVWXZ'.split(''),
    'only-vowels': 'AEIOU'.split('')
};

var letters;

d3.csv('letter_freq.csv', dataPreprocessor).then(function(dataset) {
    // Create global variables here and intialize the chart
    

    // **** Your JavaScript code goes here ****
    letters = dataset;

    // Append the 2 X Axes
    let scale = scaling(letters);
    svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(40,570)')
        .call(scale.xAxis1);
        

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(40,50)')
        .call(scale.xAxis2);

    // Append X Axes Label
    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(102,20)')
        .text('Letter Frequency (%)');

    // Update the chart for all letters to initialize
    updateChart('all-letters');
});


function updateChart(filterKey) {
    // Create a filtered array of letters based on the filterKey
    var filteredLetters = letters.filter(function(d){
        return lettersMap[filterKey].indexOf(d.letter) >= 0;
    });


    //console.log(filteredLetters)
    // **** Draw and Update your chart here ****

    let scale = scaling(filteredLetters);


    let bars = chartG.selectAll('.bar')
        .data(filteredLetters, function(d){
            return d.letter;
        });

    let barsEnter = bars.enter()
        .append('g')
        .attr('class', 'bar');
    
    bars.merge(barsEnter)
        .attr('transform', function(d,i){
            return 'translate('+[0, i * barBand + 4]+')';
        });

    barsEnter.append('rect')
        .attr('height', barHeight)
        .attr('width', function(d){
            return xScale(d.frequency);
        });

    barsEnter.append('text')
        .attr('x', -20)
        .attr('dy', '0.9em')
        .text(function(d){
            console.log(d.letter)
            return d.letter;
        }); 

    bars.exit().remove();
}

let scaling = data => {
    this.data = data;

    // Frequency scaling
    this.freqExtent = d3.extent(this.data, function(d){
        return +d['frequency'];
    });

    this.xScale = d3.scaleLinear()
        .domain(this.freqExtent)
        .range([0,chartWidth]);

    this.xAxis1 = d3.axisBottom(this.xScale).ticks(6)
        .tickFormat(function(d){
            return (d * 100) + '%';
        });

    this.xAxis2 = d3.axisTop(this.xScale).ticks(6)
        .tickFormat(function(d){
            return (d * 100) + '%';
        });

    
    return this;
}

// Remember code outside of the data callback function will run before the data loads