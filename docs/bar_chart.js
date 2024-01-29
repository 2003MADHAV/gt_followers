export function createBarChart(sortedObj, target_el) {
   // Select top 10 key-value pairs
   const top10Entries = Object.entries(sortedObj).slice(0, 20);

   // Set up SVG dimensions
   var svg = d3.select(target_el),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;


   // Create scales
   const xScale = d3.scaleBand()
      .domain(top10Entries.map(d => d[0]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

   const yScale = d3.scaleLinear()
      .domain([0, d3.max(top10Entries, d => d[1])])
      .range([height - margin.bottom, margin.top]);

   // Add bars
   svg.append("g")
      .selectAll("rect")
      .data(top10Entries)
      .join("rect")
      .attr("x", d => xScale(d[0]))
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(0) - yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("fill", "#94d2bd");

   // Add X axis with rotated labels
   svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .attr("font-family", "Roboto, sans-serif")
      .attr("font-size", "0.8rem")
      .style("text-anchor", "end");
   // Add Y axis
   svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
}
