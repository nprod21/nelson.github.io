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

  public chartElements: ChartElement[] = [];
  public centerText: string = "...";
  public labelText: string = "";

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartElements = this.chartService.getChartElements(this.category);
    if(this.chartElements.length) this.setChartText();
  }

  /* PRIVATE METHODS (for component) */

  private getTopElement(chartElements: ChartElement[]): ChartElement {
    /* Returns latest chartElement with highest value count */
    return this.chartService.getTopElement(chartElements);
  }


  /* PUBLIC METHODS (for template) */

  public getClassName(elementName: string): string {
    /* Returns formatted className for provided elementName
    (removes dot/period from project names) */
    return this.chartService.getClassName(elementName);
  } 

  public setChartText(): void {
    /* Assigns values of the top/highest chartElement to the centerText && labelText properties */
    let topElement = this.getTopElement(this.chartElements);
    this.centerText = topElement.count.toString();
    this.labelText = topElement.name;
  }

  public tempSetChartText(chartElement: ChartElement): void {
    /* Temporarily sets the provided chartElements value to the centerText && labelText properties
    (used when SVG chart segments are hovered w/mouseover) */
    this.centerText = chartElement.count.toString();
    this.labelText = chartElement.name;
  }

  public setFilteredTickets(value: string): void {
    /* Sets filtered tickets using input category and value arg provided
    && emits elementSelect event output */
    this.chartService.setFilteredTickets(this.category, value, false, true);
    this.elementSelect.emit();
  }

}
