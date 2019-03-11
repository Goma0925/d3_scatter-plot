var dataP = d3.json("gradeData.json");


var drawGraph = function(data){
  var screen = {
    width:500,
    height:400
  }

  var margins = {
    top:10,
    bottom:30,
    left:30,
    right:120
  }

  var graphWidth = screen.width - margins.left - margins.right;
  var graphHeight = screen.height - margins.top - margins.bottom;

  console.log('script runnig')
  var xScale = d3.scaleLinear()
                .domain([0, 20])
                .range([0, graphWidth]);

  var yScale = d3.scaleLinear()
                .domain([0, 100])
                .range([graphHeight, 0])

  var xAxis = d3.axisBottom()
                   .scale(xScale);

  var yAxis = d3.axisBottom()
   .scale(yScale);

//Dot radius
  var radius = 5;

  var svg = d3.select("svg")
            .attr("width",screen.width)
            .attr("height",screen.height);
  //console.log(screen.width);
  var colors = d3.scaleOrdinal(d3.schemeAccent)


  var plotLand = svg.append("g")
                    .classed('plot', true)
                    .attr('transform', "translate(" + margins.left + "," + margins.top +")");

  var students = plotLand.selectAll('g')
                          .data(data)
                          .enter()
                          .append('g');

  students.selectAll('g')
        .data(function(d, i){return d.grades})
        .enter()
        .append('circle')
        .attr("cx", function(d, i){return xScale(i)})
        .attr('cy', function(d, i){return yScale(d)})
        .attr('r', radius);

        //.attr("fill", function(d, i){console.log("d.name", d);return colors(d)})

    svg.append("g")
            .call(xAxis)
            .attr("transform", function(){
              return "translate(" + margins.left + "," + (margins.top + graphHeight + radius) + ")";
              });

  var legend = svg.append('g')
                  .classed('legend', true)
                  .attr('transform', "translate(" + graphWidth +"," + margins.top+")")

  var legendLines = legend.selectAll('g')
                    .data(data, function(d, i){return [d, i]})
                    .enter()
                    .append('g')
                    .classed('legendLine', true)
                    .attr('transform', function(d, i){
                                        var x = 10;
                                        var y = (i * 25);
                                        return "translate(" + x + "," + y +")"});

  legendLines.append('rect')
             .attr('x', 0)
             .attr('y', 0)
             .attr('width', 10)
             .attr('height', 10)
             .attr('fill', function(d){return colors(d.name);})

  legendLines.append('text')
             .attr('x', 20)
             .attr('y', 10)
             .text(function(d) {return d.name})



}


dataP.then(function(data) {
  console.log("data", data)
  drawGraph(data);
});
