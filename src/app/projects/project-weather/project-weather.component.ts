import { Component, OnInit, OnDestroy } from '@angular/core';

import { WeatherService } from './weather.service';
import { TabService } from 'src/app/tab.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-weather',
  templateUrl: './project-weather.component.html',
  styleUrls: ['./project-weather.component.css']
})
export class ProjectWeatherComponent implements OnInit, OnDestroy {

  private weatherResponseSub!: Subscription;

  public showProject: boolean = false;

  public city: string = this.weatherService.getCity();
  public backgroundImg: string = this.weatherService.getBackgroundImage();
  public todayFeelsLike: number = this.weatherService.getTodayFeelsLike();
  public nextSunsetTime: Date = this.weatherService.getNextSunTime(false);
  public nextSunriseTime: Date = this.weatherService.getNextSunTime(true);
  public isDayTime: boolean = this.weatherService.getIsDayTime();;
  public hourTime: Date[] = this.weatherService.getHourTime();
  public hourTemp: number[] = this.weatherService.getHourTemp();
  public hourIcon: string[] = this.weatherService.getHourIcon();
  public dailyDate: Date[] = this.weatherService.getDailyDate();
  public dailyTemp: number[] = this.weatherService.getDailyTemp();
  public dailyDescription: string[] = this.weatherService.getDailyDescription();
  public dailyIcon: string[] = this.weatherService.getDailyIcon();

  public weatherOptions: string[] = this.weatherService.getWeatherOptions();


  constructor(
    private weatherService: WeatherService,
    private tabService: TabService
  ) { }

  ngOnInit(): void {
    /* calls service method to make API call to fetch data vi HTTP Client */
    this.weatherService.getWeather();

    this.weatherResponseSub = this.weatherService.responseObservable.subscribe(response => {
      /* on receipt of weather API response:
      - calls method to assign API data from service to relevant properties
      && calls tab service method to publish API response confirmation */
      if(response) {
        this.setWeatherFromServiceData();
        this.tabService.updateWeatherFetchedSubject();
      }
    })

    /* timer delay for content visibility - to prevent flickering before splash screen */
    setTimeout(() => this.showProject = true, 1000);
  }

  ngOnDestroy(): void {
    /* manually unsubscribes from observable subscription on component destruction */
    this.weatherResponseSub.unsubscribe();
  }



  private setWeatherFromServiceData(): void {
    /* assigns weather data required for template to relevant properties
    && calls setter methods to assig */
    // this.dailyTemp[0] = this.weatherService.dailyTemp[0];
    this.backgroundImg = this.weatherService.getBackgroundImage();
    this.dailyDescription = this.weatherService.getDailyDescription();
    this.dailyTemp = this.weatherService.getDailyTemp();
    this.todayFeelsLike = this.weatherService.getTodayFeelsLike();
    this.nextSunsetTime = this.weatherService.getNextSunTime(false);
    this.nextSunriseTime = this.weatherService.getNextSunTime(true);
    this.isDayTime = this.weatherService.getIsDayTime();
    this.hourTime = this.weatherService.getHourTime();
    this.hourTemp = this.weatherService.getHourTemp();
    this.hourIcon = this.weatherService.getHourIcon();
    this.dailyDate = this.weatherService.getDailyDate();
    this.dailyIcon = this.weatherService.getDailyIcon();
  }
  
  public simulateDayTime(status: string): void {
    /* calls service method to manually change current time of day status
    && reassign status + background image values to each property */
    this.weatherService.simulateDayTime(status);
    this.isDayTime = this.weatherService.getIsDayTime();
    this.backgroundImg = this.weatherService.getBackgroundImage();
  }

  public simulateWeather(condition: string): void {
    /* calls service method to manually change current weather description
    && reassign background image + today's description value to each property */
    this.weatherService.simulateWeather(condition);
    this.backgroundImg = this.weatherService.getBackgroundImage();
    this.dailyDescription = this.weatherService.getDailyDescription();
  }

}
