import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-linkedin',
  templateUrl: './contact-linkedin.component.html',
  styleUrls: ['./contact-linkedin.component.css']
})
export class ContactLinkedinComponent implements OnInit {

  public showComponent: boolean = false;
  public boxShadow: string = "";
  
  constructor() { }

  ngOnInit(): void {
    /* timer delay for content visibility - to prevent flickering before splash screen */
    setTimeout(() => this.showComponent = true, 2800);
    setTimeout(() => this.boxShadow = "-1px 1px 30px #313241", 3050);
  }

}
