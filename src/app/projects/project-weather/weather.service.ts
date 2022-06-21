import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WeatherService {

  private apiKey: string = "109fb3e60ab3e9cbe366958aeeb9831d";
  private cityId: number = 2643743; // London (no longer in use - kept for future reference)
  private lat: string = "51.50853"; // London latitude
  private lon: string = "-0.12574"; // London longitude
  private forecastEndpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&units=metric&exclude=minutely,alerts&appid=${this.apiKey}`;

  private responseSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public  responseObservable: Observable<boolean> = this.responseSubject.asObservable();

  private weather: any = {
    main : {},
    isDayTime: true
  };

  private city: string = "London";
  private backgroundImg: string = "assets/img/weather-bgs/day-clouds.gif";
  private todayFeelsLike: number = 0;
  private nextSunsetTime: Date = new Date();
  private nextSunriseTime: Date = new Date();
  private isDayTime: boolean = true;
  private hourTime: Date[] = [];
  private hourTemp: number[] = [];
  private hourIcon: string[] = ["04d", "04d", "04d", "04d", "04d"];
  private dailyDate: Date[] = [];
  private dailyTemp: number[] = [];
  private dailyMain: string[] = [];
  private dailyDescription: string[] = [];
  private dailyIcon: string[] = ["04d", "04d", "04d", "04d", "04d", "04d", "04d"];

  private weatherOptions: string[] = ["Clear", "Clouds", "Fog", "Thunderstorm", "Rain", "Snow"];

  constructor(private httpClient: HttpClient) { }

  

  private setWeather(data: any): void {
    /* assigns response data received from API call to relevant properties
    && calls further setters to continue separate date/time + background image assignments */
    this.weather = data;
    this.dailyMain[0] = this.weather.current.weather[0].main;
    this.dailyTemp[0] = this.weather.current.temp.toFixed(0);
    this.dailyDescription[0] = this.weather.current.weather[0].description;
    this.dailyDate[0] = new Date(this.weather.daily[0].dt * 1000);
    this.todayFeelsLike = this.weather.current.feels_like.toFixed(0);
    this.nextSunsetTime = new Date(this.weather.current.sunset * 1000);
    this.nextSunriseTime = new Date(this.weather.current.sunrise * 1000);
    this.hourTime[0] = new Date();
    this.hourTemp[0] = this.weather.hourly[0].temp.toFixed();
    this.setDayTime();
    this.setHourlyWeather(this.weather);
    this.setDailyWeather(this.weather);
    this.setBackgroundImg(this.dailyMain[0], this.isDayTime);
    return;
  }

  private setHourlyWeather(data: any): void {
    /* assigns formatted date/time data to hour arrays of the next 5 hours */
    for(let i: number = 1; i < 6; i++){
      this.hourTemp[i] = data.hourly[i].temp.toFixed(0);
      this.hourTime[i] = new Date(data.hourly[i].dt * 1000);
      this.hourIcon[i] = data.hourly[i].weather[0].icon;
    }
    return;
  }

  private setDailyWeather(data: any): void {
    /* assigns formatted date/time data to daily arrays of the next 7 days */
    for(let i: number = 1; i < 8; i++){
      this.dailyDate[i] = new Date(this.weather.daily[i].dt * 1000);
      this.dailyTemp[i] = data.daily[i].temp.day.toFixed(0);
      this.dailyMain[i] = data.daily[i].weather[0].main;
      this.dailyIcon[i] = data.daily[i].weather[0].icon;
    }
    return;
  }

  private setBackgroundImg(today: string, dayTime: boolean): void {
    /* assigns relevant gif filepath to background image property,
        depending on provided description/time of day */
    if(dayTime){
      if(today === "Clear") { this.backgroundImg = "assets/img/weather-bgs/day-clear.gif"; return;}
      if(today === "Clouds") {this.backgroundImg = "assets/img/weather-bgs/day-clouds.gif"; return}
      if(today === ("Rain" || "Drizzle")) {this.backgroundImg = "assets/img/weather-bgs/day-rain.gif"; return}
      if( this.isUnclear(today) || today == "Fog") {
          this.backgroundImg = "assets/img/weather-bgs/day-fog.gif";
          return;
    }
    }
    else if (!dayTime){
      if(today === "Clear") {this.backgroundImg = "assets/img/weather-bgs/night-clear.gif"; return}
      if(today === "Clouds") {this.backgroundImg = "assets/img/weather-bgs/night-clouds.gif"; return}
      if(today === ("Rain" || "Drizzle")) {this.backgroundImg = "assets/img/weather-bgs/night-rain.gif"; return}
      if(this.isUnclear(today) ||today == "Fog") {
            this.backgroundImg = "assets/img/weather-bgs/night-fog.gif";
            return;
        }
    }
    if(today === "Thunderstorm") {this.backgroundImg = "assets/img/weather-bgs/lightning.gif"; return}
    if(today === "Snow") {this.backgroundImg = "assets/img/weather-bgs/snow.gif"; return}
    return;
  }

  private isUnclear(description: string): boolean {
    /* checks if description matches any of below values, deemed unclear */
    let isUnclear: boolean = false;
    if(
      description === "Mist" 
      || description ===  "Smoke" 
      || description ===  "Haze" 
      || description ===  "Dust" 
      || description === "Fog" 
      || description === "Sand" 
      || description === "Dust" 
      || description === "Ash" 
      || description === "Squall" 
      || description === "Tornado"
      ) {
        isUnclear = true;
    }
    return isUnclear;
  }

  private setDayTime(): void {
    /* determines time of day:
      - by checking if current time is between sunrise and sunset */
    this.isDayTime = (
      (this.hourTime[0].getTime() < this.nextSunsetTime.getTime()) 
      &&
      (this.hourTime[0].getTime() > this.nextSunriseTime.getTime())
    );
    return;
  }

  public getWeather(): void {
    /* makes API call to get weather using endpoint property,
    && calls weather setter with response as argument
    && sends confirmation of response received via behaviour subject/observable */
    this.httpClient.get(this.forecastEndpoint).subscribe(response => {
      this.setWeather(response);
      if(response) this.responseSubject.next(true);
    });
    return;
  }

  public getCity(): string {
    /* returns city value */
    return this.city;
  }

  public getDailyDescription(): string[] {
    /* returns array of daily descriptions */
    return this.dailyDescription;
  }

  public getDailyDate(): Date[] {
    /* returns array of dates */
    return this.dailyDate;
  }
  
  public getDailyTemp(): number[] {
    /* returns  array of daily temperatures */
    return this.dailyTemp;
  }

  public getDailyIcon(): string[] {
    /* returns array of daily icons */
    return this.dailyIcon;
  }

  public getHourTime(): Date[] {
    /* returns array of upcoming hours */
    return this.hourTime;
  }
  
  public getHourTemp(): number[] {
    /* returns array of hourly temperatures */
    return this.hourTemp;
  }

  public getHourIcon(): string[] {
    /* returns array of hourly icons */
    return this.hourIcon;
  }

  public getTodayFeelsLike(): number {
    /* returns todayFeelsLike */
    return this.todayFeelsLike;
  }

  public getNextSunTime(rise: boolean): Date {
    /* returns either next sunrise or sunset time */
    if(rise) return this.nextSunriseTime;
    else return this.nextSunsetTime;
  }

  public getIsDayTime(): boolean {
    /* returns isDayTime status */
    return this.isDayTime;
  }

  public getBackgroundImage(): string {
    /* returns filepath of background image */
    return this.backgroundImg;
  }

  public getWeatherOptions(): string[] {
    /* returns array of weather conditions, for simulation options */
    return this.weatherOptions;
  }

  public simulateDayTime(status: string): void {
    /* manually changes current time of day status */
    if(status == "day") {
      this.isDayTime = true;
    }
    if(status == "night") {
      this.isDayTime = false;
    }
    if(status == "default") this.setDayTime();
    this.setBackgroundImg(this.dailyMain[0], this.isDayTime);
    return;
  }

  public simulateWeather(condition: string): void {
    /* manually changes current weather description */
    if(condition == "default") { 
      this.dailyMain[0] = this.weather.current.weather[0].main;
      this.dailyDescription[0] = this.weather.current.weather[0].description;
    }
    else if(condition != "default") { 
      this.dailyMain[0] = condition;
      this.dailyDescription[0] = condition + " (simulated)";
     }
    this.setBackgroundImg(this.dailyMain[0], this.isDayTime);
    return;
  }

}