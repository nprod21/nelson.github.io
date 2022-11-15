import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ChartService } from '../../services/chart.service';
import { ChartElement } from '../../models/chart-element.interface';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() set category(value: string) {
    this.chartCategory = value;
    this.chartElements = this.chartService.getChartElements(this.chartCategory);
  }

  @Output() elementSelect = new EventEmitter();

  public chartCategory: string = "";
  public chartElements: ChartElement[] = [];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {  }

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
    this.chartService.setFilteredTickets(this.chartCategory, value, false, true);
    this.elementSelect.emit();
  }

}
