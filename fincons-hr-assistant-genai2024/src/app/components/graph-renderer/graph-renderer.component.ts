import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
interface Graph {
  nodes: any[]
  links: any[]
}
@Component({
  selector: 'app-graph-renderer',
  templateUrl: './graph-renderer.component.html',
  styleUrls: ['./graph-renderer.component.css']
})
export class GraphRendererComponent implements OnChanges {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() data: Graph | undefined;
  links: any[] = [];
  nodes: any[] = [];
  svgHeight = 500;
  svgWidth = 900;

  ngOnChanges() {
    if (this.data) {
      this.renderGraph();
    }
  }

  renderGraph() {
    this.nodes = this.data!.nodes.map(p => ({
      label: p.label,
      id: p.id,
      size: this.getSizeByTypeAndDates(p),
      color: this.getColorByType(p.type)
    }));
    this.links = this.data!.links.map(p => ({ source: this.findNodeIndex(p.from), target: this.findNodeIndex(p.to) }));
    const svg = d3.select(this.container.nativeElement);

    const simulation = d3.forceSimulation(this.nodes)
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('link', d3.forceLink(this.links).id((d: any) => d.index))
      .force('center', d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2));

    const lines = svg.selectAll('line')
      .data(this.links)
      .enter()
      .append('line')
      .attr('stroke', 'black');

    const circles = svg.selectAll('circle')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('r', node => node.size)
      .attr('fill', node => node.color);

    const text = svg.selectAll('text')
      .data(this.nodes)
      .enter()
      .append('text')
      .text(node => node.label)
      .attr('stoke', 'black')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle');

    simulation.on('tick', () => {
      circles
        .attr('cx', (node: any) => node.x)
        .attr('cy', (node: any) => node.y);
      text.attr('x', (node: any) => node.x)
        .attr('y', (node: any) => node.y);
      lines
        .attr('x1', (link: any) => link.source.x)
        .attr('y1', (link: any) => link.source.y)
        .attr('x2', (link: any) => link.target.x)
        .attr('y2', (link: any) => link.target.y);
    });
  }

  getSizeByTypeAndDates(p: any) {
    let size = 10;
    switch (p.type) {
      case "person": size = 35; break;
      case "job":
      case "education": {
        size = 15;
        const diffInDays = this.dateDiffInDays(new Date(p.startDate), new Date(p.endDate));
        const years = diffInDays / 365;
        size += years
        break;
      }
    }
    return size;
  }
  getColorByType(pType: any) {
    let color = "red";
    switch (pType) {
      case "person": color = 'red'; break;
      case "job": color = 'blue'; break;
      case "skill": color = 'orange'; break;
      case "education": color = 'purple'; break;
    }
    return color;
  }

  findNodeIndex(nodeId: any): any {
    return this.nodes.findIndex(p => p.id == nodeId);
  }

  dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
