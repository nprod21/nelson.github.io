import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ChartService } from '../chart.service';
import { ChartElement } from '../chart-element';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() category: string = "priority";
  @Output() elementSelect = new EventEmitter();

  public chartElements: ChartElement[] = [];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    /* Assigns chart elements returned by chart service to component property
    && if input category provided is priority and all priority values are present,
        calls method to order chart elements by predefined priority order (High-->Low) */
    this.chartElements = this.chartService.getChartElements(this.category);
    if(this.category == "priority" 
      && this.chartElements.length == 4) this.orderPriorityChartElements();
  }

  /* PRIVATE METHODS (for component) */

  private orderPriorityChartElements(): void {
    /* Reorders chart elements by predefined priority order (High-->Low) */
    let orderedChartElements: ChartElement[] = [];
    let lowIndex: number = this.chartElements.findIndex(element => element.name === "Low");
    let mediumIndex: number = this.chartElements.findIndex(element => element.name === "Medium");
    let highIndex: number = this.chartElements.findIndex(element => element.name === "High");

    orderedChartElements.push(this.chartElements[lowIndex]);
    orderedChartElements.push(this.chartElements[mediumIndex]);
    orderedChartElements.push(this.chartElements[highIndex]);

    this.chartElements = orderedChartElements;
  }

  /* PUBLIC METHODS (for template) */

  public getPercentage(count: number): number {
    /* Returns percentage, of provided count, as a number (using total) */
    return this.chartService.getPercentage(count);
  }

  public getClassName(elementName: string): string {
    /* Returns formatted className for provided elementName
    (removes dot/period from project names) */
    return this.chartService.getClassName(elementName);
  }

  public setFilteredTickets(value: string): void {
    /* Sets filtered tickets using input category and value arg provided
    && emits elementSelect event output */
    this.chartService.setFilteredTickets(this.category, value, false, true);
    this.elementSelect.emit();
  }

}
