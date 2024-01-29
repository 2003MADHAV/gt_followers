// Custom Color Scales
var colorScale = d3.scaleOrdinal(d3.schemeCategory10); // Predefined color scale
var pastelColorScale = d3.scaleOrdinal().range([
"#001219ff",
"#005f73ff",
"#0a9396ff",
"#94d2bdff",
"#e9d8a6ff",
"#ee9b00ff",
"#ca6702ff",
"#bb3e03ff",
"#ae2012ff",
"#9b2226ff"
]);

export function drawWordCloud(wordCloudData) {
    var width = 600;
    var height = 600;
    var layout = d3.layout.cloud()
        .size([width, height])
        .words(wordCloudData.map(function(d) {
            return {text: d.word, size: d.size * 10};
        }))
        .padding(5)
        .rotate(0)
        .fontSize(d => d.size)
        .on("end", draw);

    layout.start();

    function draw(words) {
        d3.select("#word-cloud").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", d => d.size + "px")
            .style("fill", function(d) { return pastelColorScale(d.size); }) // Apply color
            .attr("text-anchor", "middle")
            .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
            .text(d => d.text);
    }
}

