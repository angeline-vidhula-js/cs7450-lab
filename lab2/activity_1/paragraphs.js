// **** Your JavaScript code goes here ****
let createTable = (data, columns) => {
	let tbody = d3.select('#homerun-table').select('tbody');
	let tr = tbody.selectAll('tr')
		.data(data)
		.enter()
		.append('tr')
		.on("mouseover", function(d, i) {
        	d3.select(d3.select("#main svg").selectAll('rect').nodes()[i]).attr("fill", "#c04000");
		})
		.on("mouseout", function(d, i) {
        	d3.select(d3.select("#main svg").selectAll('rect').nodes()[i]).attr("fill", "#055b70");
    	});
	let td = tr.selectAll('td')
		.data(function(row, i) {
			if (i === 0) {
				d3.select(this).attr("class", "highrank")
			}
			return columns.map((column) => {
				return {
					value: row[column]
				}
			})
		})
		.enter().append('td').text((d) => {
			return d.value
		});
}
let createVis = data => {
	var margin = {
			top: 30,
			right: 30,
			bottom: 70,
			left: 60
		},
		width = 750 - margin.left - margin.right,
		height = 280 - margin.top - margin.bottom;

	data.forEach(d => {
		let name = d.name.split(" ");
		d.name = name[name.length - 1];
	});

	var x = d3.scaleBand().domain(data.map(function(d) {
			return d.name
		}))
		.range([0, width]);

	var y = d3.scaleLinear()
		.domain([0, 60])
		.range([height, 0]);

	var svg = d3.select("#main")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('fill', '#055b70')
		.attr('width', 30)
		.attr("height", function(d) {
			return height - y(d.homeruns);
		})
		.attr("y", function(d) {
			return y(d.homeruns);
		})
		.attr("x", function(d, i) {
			return x(d.name);
		})
		.on("mouseover", function(a, i) {
			d3.select(d3.select("#main table tbody").selectAll('tr').nodes()[i]).classed("hover",true);
			d3.select(this)
				.attr("fill", "#c04000");
		})
		.on("mouseout", function(d, i) {
			d3.select(d3.select("#main table tbody").selectAll('tr').nodes()[i]).classed("hover",false);
			d3.select(this)
				.attr("fill", "#055b70");
		});

	svg.append("g")
		.attr("transform", "translate(" + 0 + "," + 0 + ")")
		.call(d3.axisLeft(y));

	svg.append("g")
		.attr("transform", "translate(" + -14 + "," + (height) + ")")
		.call(d3.axisBottom(x));
}

d3.csv('baseball_hr_leaders_2017.csv').then(data => {
	//   sorting data based on homeruns
	data = data.sort((a, b) => {
		return d3.descending(a.homeruns, b.homeruns);
	});
	var columns = ['rank', 'name', 'homeruns']
	createTable(data, columns);
	createVis(data)
});