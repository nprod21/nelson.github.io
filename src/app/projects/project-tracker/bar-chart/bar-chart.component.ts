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
    /* Assigns chart elements returned by chart service to new variable
    && if input category provided is priority and all priority values are present,
        calls method to order chart elements by predefined priority order (High-->Low)
          && assigns the returned ordered chart elements value to component property
      otherwise, if above conditions do not apply, assigns temp variable to component property  */
    let chartElements: ChartElement[] = this.chartService.getChartElements(this.category);
    if(this.category == "priority" && this.chartElements.length == 4) {
      this.chartElements = this.orderPriorityChartElements(chartElements);
    }
    else this.chartElements = chartElements;
  }

  /* PRIVATE METHODS (for component) */

  private orderPriorityChartElements(chartElements: ChartElement[]): ChartElement[] {
    /* Reorders chart elements by predefined priority order (High-->Low) */
    let orderedChartElements: ChartElement[] = [];
    let lowIndex: number = this.chartElements.findIndex(element => element.name === "Low");
    let mediumIndex: number = this.chartElements.findIndex(element => element.name === "Medium");
    let highIndex: number = this.chartElements.findIndex(element => element.name === "High");

    orderedChartElements.push(this.chartElements[lowIndex]);
    orderedChartElements.push(this.chartElements[mediumIndex]);
    orderedChartElements.push(this.chartElements[highIndex]);

    return orderedChartElements;
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
