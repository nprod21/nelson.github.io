import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public showComponent: boolean = false;

  public showSpeechBubble: boolean = false;
  public showSpeech: boolean = false;
  public scaled: boolean = true;
  public showCV: boolean = false;
  public showInstruction: boolean = false;
  public showDoc: boolean = false;
  public showPdf: boolean = false;

  constructor() { }

  ngOnInit(): void {
    /* timer delays for element visibility / animations */
    setTimeout(() => this.showComponent = true, 1000);
    setTimeout(() => this.showSpeechBubble = true, 4050);
    setTimeout(() => this.showSpeech = true, 5050);
    setTimeout(() => this.scaled = false, 5050);
    setTimeout(() => this.showCV = true, 7000);
  }

  public showAll(): void {
    /* delays visibility of CV download instructions + format option links */
    setTimeout(() => this.showInstruction = true, 333);
    setTimeout(() => this.showDoc = true, 999);
    setTimeout(() => this.showPdf = true, 1332);
  }

}