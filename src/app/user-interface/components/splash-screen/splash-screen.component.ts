import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {

  @Input() previewWidth: number = 0; // binded to template's container [style.width]
  @Input() previewHeight: number = 0; // binded to template's container [style.height]

  public showSplash: boolean = false;

  constructor() { }

  ngOnInit(): void { 
    /* timer delay for content visibility - to prevent flickering before splash screen */
    setTimeout(() => this.showSplash = true, 50);
   }

}
