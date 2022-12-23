import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { WeatherService } from './weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-weather',
  templateUrl: './project-weather.component.html',
  styleUrls: ['./project-weather.component.css']
})
export class ProjectWeatherComponent implements OnInit, OnDestroy {

  @Output() weatherResponse: EventEmitter<boolean> = new EventEmitter(); //Used to output API response status

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


  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    /* calls service method to make API call to fetch data via HTTP Client */
    this.getWeatherFromServiceAPI();
  }

  ngOnDestroy(): void {
    /* manually unsubscribes from observable subscription on component destruction */
    if(this.weatherResponseSub) this.weatherResponseSub.unsubscribe();
  }

  private getWeatherFromServiceAPI(): void {
    /* Subscribes to service data API GET request and processes returned observable */
    this.weatherResponseSub = this.weatherService.getWeather()
    .subscribe({
      /* Calls weather method to set relevant data values to service properties, if valid
        - If response is invalid, status is logged */
      next: (response) => {
        if(response.ok && response.status == 200) {
          this.weatherService.setWeather(response.body)
        }
        else {
          console.log("GET Weather request response.status: " + response.status + " - " + response.statusText)
        }
      },
      // Error handling
      error: (error) => {
        console.warn("GET Weather request error: " + error.message)
      },
      // Completion steps
      complete: () => {
        this.setWeatherFromServiceData();
        this.weatherResponse.emit(true);
        this.weatherResponseSub.unsubscribe();
        setTimeout(() => this.showProject = true, 3100);
      }
    })
  }



  private setWeatherFromServiceData(): void {
    /* assigns weather data required for template to relevant properties
    && calls setter methods to assign */
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
