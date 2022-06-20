import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {

  public previewWidth: string = "";
  public previewHeight: string = "";

  constructor() { }

  ngOnInit(): void {
    this.setSize();
   }


  public setSize(): void {
    /* sets width + height properties (binded to style in template)
      using width and height of the preview section at the time of initialization */
    let previewElementWidth: any = document.getElementById('preview')?.offsetWidth;
    let previewElementHeight: any = document.getElementById('preview')?.offsetHeight;
    this.previewWidth = previewElementWidth.toString() + "px";
    this.previewHeight = previewElementHeight.toString() + "px";
  }

}
