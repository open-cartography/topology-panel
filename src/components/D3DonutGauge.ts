import * as d3 from 'd3';
import {colors} from "./colors";

export function createSVGDonutGaugeDataURL(service, nodeSize) {
    const successCount = service.weight;
    const errorCount = service.weight / 3;
    const total = successCount + errorCount;

    const size = nodeSize;
    const lineWidth = nodeSize * 0.12; // Adjust the multiplier to control the line width relative to the node size
    const radiusOffset = nodeSize * 0.01; // Adjust the multiplier to control the size reduction of the radius
    const radius = size / 2 - lineWidth / 2 - radiusOffset;

    // Calculate error ratio
    const errorRatio = errorCount / total;

    // Calculate angle
    const errorAngle = errorRatio * 2 * Math.PI;

    // Create an SVG element
    const svg = d3.create('svg')
        .attr('width', size)
        .attr('height', size);

    // Define an arc generator
    const arc = d3.arc()
        .innerRadius(radius - lineWidth)
        .outerRadius(radius)
        .cornerRadius(2); // Optional: Add rounded corners to the gauge

    // Draw error arc
    svg.append('path')
        .attr('d', arc({
            startAngle: 0,
            endAngle: errorAngle
        }))
        .attr('fill', colors["ERROR"])
        .attr('transform', `translate(${size / 2}, ${size / 2})`);

    // Serialize the SVG to a string
    const svgString = new XMLSerializer().serializeToString(svg.node());

    // Encode the SVG string as a data URL
    const dataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);

    return dataUrl;
}
