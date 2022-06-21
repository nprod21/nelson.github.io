import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contact-email',
  templateUrl: './contact-email.component.html',
  styleUrls: ['./contact-email.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactEmailComponent implements OnInit {

  public showComponent: boolean = false;

  public emailSent: boolean = false;
  public boxShadow: string = "";
  public formName: string = "";
  public formEmail: string = "";
  public formSubject: string = "";
  public formMessage: string = "";
  public showSentIcon: boolean = false;
  public showThanksMsg: boolean = false;
  public showResponseMsg: boolean = false;

  @HostListener('document:click', ['$event'])
  onClickEvent(event: any) {
    /* click event listener used to detect form submission, without preventing form submission as (click) would
      triggers display of thank you message element */
    let id = event.target.id;
    if(id === "submitBtn") { 
      setTimeout(() => {
        if(this.formValid()) {
          this.emailSent = true;
          this.showSentCues();
        }
      }, 100);
    }
  }

  constructor() { }

  ngOnInit(): void {
    /* timer delay for content visibility - to prevent flickering before splash screen */
    setTimeout(() => this.showComponent = true, 2800);
    setTimeout(() => this.boxShadow = "-1px 1px 30px #313241", 3050);
  }

  private validateFormName(): boolean {
    /* checks if ngModel form name field provided
    returns outcome */
    if(this.formName != "") return true;
    else return false;
  }
  
  private validateFormEmail(): boolean {
    /* checks if ngModel form email address field provided && contains @ symbol
    returns outcome */
    let isEmailValid: boolean = false;
    for(let i: number = 0; i < this.formEmail.length; i++) {
      if(this.formEmail[i] == "@") {
        isEmailValid = true;
        break;
      }
    }
    return isEmailValid;
  }
  
  private validateFormSubject(): boolean {
    /* checks if ngModel form subject field provided
    returns outcome */
    if(this.formSubject != "") return true;
    else return false;
  }
  
  private validateFormMessage(): boolean {
    /* checks if ngModel form message field provided
    returns outcome */
    if(this.formMessage != "") return true;
    else return false;
  }

  private formValid(): boolean {
    /* checks if all ngModel form fields provided
    returns outcome */
    let formValid: boolean = false;
    let nameValid: boolean = this.validateFormName();
    let emailValid: boolean = this.validateFormEmail();
    let subjectValid: boolean = this.validateFormSubject();
    let messageValid: boolean = this.validateFormMessage();
    if(nameValid && emailValid && subjectValid && messageValid) formValid = true;
    return formValid;
  }

  private showSentCues(): void {
    /* delays 'showing' sent tick + each consecutive confirmation message
    - all bools used by ngClasses to toggle 'transparent' class off, for opacity transitions */
    setTimeout(() => this.showSentIcon = true, 250);
    setTimeout(() => this.showThanksMsg = true, 750);
    setTimeout(() => this.showResponseMsg = true, 1000);
  }

}
