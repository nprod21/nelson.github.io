import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {

  @Input() previewWidth: number = 0; // binded to template's container [style.width]
  @Input() previewHeight: number = 0; // binded to template's container [style.height]

  constructor() { }

  ngOnInit(): void {  }

}
