import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-linkedin',
  templateUrl: './contact-linkedin.component.html',
  styleUrls: ['./contact-linkedin.component.css']
})
export class ContactLinkedinComponent implements OnInit {

  public showComponent: boolean = false;
  public boxShadow: string = "";
  private boxShadowStyle: string = `0 1px 2px rgba(0,0,0,0.07), 
                                    0 2px 4px rgba(0,0,0,0.07), 
                                    0 4px 8px rgba(0,0,0,0.07), 
                                    0 8px 16px rgba(0,0,0,0.07),
                                    0 16px 32px rgba(0,0,0,0.07), 
                                    0 32px 64px rgba(0,0,0,0.07)`;
  
  constructor() { }

  ngOnInit(): void {
    /* timer delay for content visibility - to prevent flickering before splash screen */
    setTimeout(() => this.showComponent = true, 2800);
    // setTimeout(() => this.boxShadow = "-1px 1px 30px #313241", 3050);
    setTimeout(() => this.boxShadow = this.boxShadowStyle, 3050);
  }

}
