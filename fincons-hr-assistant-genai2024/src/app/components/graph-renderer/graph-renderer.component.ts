import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph-renderer',
  templateUrl: './graph-renderer.component.html',
  styleUrls: ['./graph-renderer.component.css']
})
export class GraphRendererComponent implements OnChanges {
  @Input() data: any;
  link: d3.Selection<SVGLineElement, any, d3.BaseType, unknown> | undefined;
  node: d3.Selection<SVGCircleElement,any, d3.BaseType, unknown> | undefined;

  ngOnChanges() {
    if (this.data) {
      this.renderGraph();
    }
  }

  renderGraph() {

    d3.select('svg').selectAll('*').remove();
    const width = 600;
    const height = 400;
    const svg = d3.select('svg').attr('width', width).attr('height', height);
    const nodes = this.data.nodi || [];
    const links = this.data.archi || [];

    // Render nodes and links using D3
    this.link = svg.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'black');

    this.node = svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('fill', 'blue');
    this.node.append("text")
      .attr("x", 8)
      .attr("y", "0.31em")
      .text(d => (<any>d).tipo)
      .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3);

    var simulation = d3.forceSimulation(nodes)                 // Force algorithm is applied to data.nodes
      .force("link", d3.forceLink(links)                               // This force provides links between nodes
        .id(function (d) { return (<any>d).id; })                     // This provide  the id of a node
        .links(links)                                    // and this the list of links
      )
      .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
      .on("end", this.ticked);
  }

  ticked() {
    this.link
      ?.attr("x1", function (d) { return (<any>d).da.x; })
      .attr("y1", function (d) { return (<any>d).da.y; })
      .attr("x2", function (d) { return (<any>d).a.x; })
      .attr("y2", function (d) { return (<any>d).a.y; });

    this.node
      ?.attr("cx", function (d) { return (<any>d).x + 6; })
      .attr("cy", function (d) { return (<any>d).y - 6; });
  }
}
