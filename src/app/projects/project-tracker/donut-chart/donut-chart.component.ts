import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ChartService } from '../chart.service';
import { ChartElement } from '../chart-element';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

  @Input() category: string = "projects";
  @Output() elementSelect = new EventEmitter();

  chartElements: ChartElement[] = [];
  centerText: string = "...";
  labelText: string = "";

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartElements = this.chartService.getChartElements(this.category);
    if(this.chartElements.length) this.setChartText();
  }

  getClassName(elementName: string): string {
    /* Returns formatted className for provided elementName
    (removes dot/period from project names) */
    return this.chartService.getClassName(elementName);
  }

  setCenterText(elementName: string): void {
    /* Assigns value of provided element name to centerText property */
    this.centerText = elementName;
  }

  resetCenterText(): void {
    /* Resets centerText property value to an elipsis */
    this.centerText = "...";
  }

  getTopElement(chartElements: ChartElement[]): ChartElement {
    /* Returns latest chartElement with highest value count */
    return this.chartService.getTopElement(chartElements);
  }

  setChartText(): void {
    /* Assigns values of the top/highest chartElement to the centerText && labelText properties */
    let topElement = this.getTopElement(this.chartElements);
    this.centerText = topElement.count.toString();
    this.labelText = topElement.name;
  }

  tempSetChartText(chartElement: ChartElement): void {
    /* Temporarily sets the provided chartElements value to the centerText && labelText properties
    (used when SVG chart segments are hovered w/mouseover) */
    this.centerText = chartElement.count.toString();
    this.labelText = chartElement.name;
  }

  setFilteredTickets(value: string): void {
    /* Sets filtered tickets using input category and value arg provided
    && emits elementSelect event output */
    this.chartService.setFilteredTickets(this.category, value, false, true);
    this.elementSelect.emit();
  }

}
