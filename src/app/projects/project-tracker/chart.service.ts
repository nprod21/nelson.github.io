import { Injectable } from '@angular/core';

import { Ticket } from './ticket';
import { TrackerService } from './tracker.service';
import { ChartElement } from './chart-element';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private trackerService: TrackerService) { }

  /* PRIVATE METHODS */

  private incrementChartElement(value: string, chartElements: ChartElement[]): boolean {
    /* Attempts to increment the count of the provided chartElement name
    && Returns true if successful (if false, caller method creates new chartElement for value) */
    if(chartElements.length == 0) return false;
    for(let i: number = 0; i < chartElements.length; i++) {
      if(chartElements[i].name == value) {
        chartElements[i].count++;
        chartElements[i].percentage = this.getPercentage(chartElements[i].count);
        return true;
      }
    }
    return false;
  }

  private getChartElementsWithRotateValues(chartElements: ChartElement[]): ChartElement[] {
    /* Returns provided array of chartElements with each elements rotate property populated */
    for(let i: number = 0; i < chartElements.length; i++) {
      chartElements[i].rotate = this.getRotateValue(i, chartElements);
    }
    return chartElements
  }

  private getRotateValue(index: number, chartElements: ChartElement[]): string {
    /* Calculates and returns rotate value as a string
    (used for setting donut chart segment angle positioning) */
    let rotate: string = "rotate(-";
    let degree: number = 90;
    if(index == 0) {
      rotate += degree.toString() + ")";
      return rotate;
    }
    degree += (this.getFreePercentage(index, chartElements) * 3.6);
    rotate += degree.toString() + ")";
    return rotate;
  }

  private getFreePercentage(index: number, chartElements: ChartElement[]): number {
    /* Returns calculated spare percentage of total for index of provided chartElements array,
    factoring in all prior chartElements aggregate percentage used 
    (used for setting donut chart segment angle positioning) */
    let aggregatePercentage: number = 0;
    index--;
    while(index >= 0) {
      aggregatePercentage += chartElements[index].percentage;
      index--;
    }
    return 100 - aggregatePercentage;
  }

  private getChartElementsWithStrokeValues(chartElements: ChartElement[]): ChartElement[] {
    /* Returns provided array of chartElements with each elements stroke properties populated */
    for(let i: number = 0; i < chartElements.length; i++) {
      chartElements[i].strokeDashArray = this.getStrokeDashArrayValue(chartElements[i]);
      chartElements[i].strokeDashOffset += this.getStrokeDashOffsetValue(i, chartElements);
    }
    return chartElements
  }

  private getStrokeDashArrayValue(chartElement: ChartElement): string {
    /* Returns provided array of chartElements with each elements stroke properties populated */
    let remainingPercentage: number = 100 - chartElement.percentage;
    let value: string = (chartElement.percentage - 0.5) + " " + (remainingPercentage + 0.5);
    return value;
  }

  private getStrokeDashOffsetValue(index: number, chartElements: ChartElement[]): number {
    if(index != 0) return this.getFreePercentage(index, chartElements);
    else return 0;
  }

  /* PUBLIC METHODS */
  
  public getChartElements(property: string): ChartElement[] {
    /* Returns array of Chart Elements representing ticket counts of provided ticket property */
    let tickets: Ticket[] = this.trackerService.getActiveTickets();
    let chartElements: ChartElement[] = [];
    type ObjectKey = keyof typeof tickets[0];
    const category = property as ObjectKey;
    console.warn("!! chartService for each ticket !!");
    tickets.forEach(ticket => {
      console.warn("ticket.status == " + ticket.status);
      let value = ticket[category]?.toString();
      if(value !== undefined) {
        if(!this.incrementChartElement(value, chartElements)) {
          let chartElement: ChartElement = {
            name: value,
            count: 1,
            percentage: this.getPercentage(1),
            rotate: "",
            strokeDashArray: "",
            strokeDashOffset: 20
            };
          chartElements.push(chartElement);
        }  
      }
    });
    chartElements = this.getChartElementsWithRotateValues(chartElements);
    chartElements = this.getChartElementsWithStrokeValues(chartElements);
    return chartElements;
  }

  public getPercentage(count: number): number {
    /* calculates percentage and returns as a string with prefix
    - toFixed() used to produce no decimal places, as value is printed in template */
    let tickets: Ticket[] = this.trackerService.getActiveTickets();
    let percentage: number = ((count / tickets.length) * 100);
    return percentage;
  }

  public getClassName(elementName: string): string {
    /* Returns formatted className for provided elementName
    (removes dot/period from project names) */
    let nameWithoutDot: string = "";
    for(let i: number = 0; i < elementName.length; i++) {
      if(elementName[i] != ".") nameWithoutDot += elementName[i];
    }
    return nameWithoutDot;
  }

  public  getTopElement(chartElements: ChartElement[]): ChartElement {
    /* Returns latest chartElement with highest value count */
    let topElement: ChartElement = chartElements[0];
    let max: number = chartElements[0].count;
    chartElements.forEach(element => {
      if(element.count > max) {
        max = element.count;
        topElement = element;
      }
    });
    return topElement;
  }

  public setFilteredTickets(property: string, value: string, anyStatus: boolean, activeStatus?: boolean): void {
    /* Calls trackerService methods to set the filteredTickets array, using provided filter settings */
    if(anyStatus) this.trackerService.setFilteredTickets(property, value, anyStatus);
    else if(activeStatus) this.trackerService.setFilteredTickets(property, value, anyStatus, activeStatus);
  }

}
