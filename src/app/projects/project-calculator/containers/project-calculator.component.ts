import { Component, OnInit, HostListener } from '@angular/core';

import { PressedKey } from '../models/pressed-key.interface';
import { CalcButton } from '../models/calc-button.interface';

import { SciCalculatorService } from '../services/sci-calculator.service';

@Component({
  selector: 'app-project-calculator',
  templateUrl: './project-calculator.component.html',
  styleUrls: ['./project-calculator.component.css']
})
export class ProjectCalculatorComponent implements OnInit {

  /* PUBLIC PROPERTIES, USED BY TEMPLATE */
  public showProject: boolean = false;
  public arrowDisplayUp: string = 'block';
  public arrowDisplayLeft: string = 'none';
  public arrowDisplayRight: string = 'none';
  public arrowDisplayDown: string = 'none';
  public keyPresses: PressedKey[] = [
    {
      keyCode: "ArrowUp",
      isKeyPressed: false,
    },
    {
      keyCode: "ArrowLeft",
      isKeyPressed: false,
    },
    {
      keyCode: "ArrowRight",
      isKeyPressed: false,
    },
    {
      keyCode: "ArrowDown",
      isKeyPressed: false,
    },
    {
      keyCode: "Backspace",
      isKeyPressed: false,
    },
    {
      keyCode: "Delete",
      isKeyPressed: false,
    },
    {
      keyCode: "Clear",
      isKeyPressed: false,
    },
    {
      keyCode: "=",
      isKeyPressed: false,
    },
    {
      keyCode: "/",
      isKeyPressed: false,
    },
    {
      keyCode: "*",
      isKeyPressed: false,
    },
    {
      keyCode: "-",
      isKeyPressed: false,
    },
    {
      keyCode: "+",
      isKeyPressed: false,
    },
    {
      keyCode: ".",
      isKeyPressed: false,
    },
    {
      keyCode: "9",
      isKeyPressed: false,
    },
    {
      keyCode: "8",
      isKeyPressed: false,
    },
    {
      keyCode: "7",
      isKeyPressed: false,
    },
    {
      keyCode: "6",
      isKeyPressed: false,
    },
    {
      keyCode: "5",
      isKeyPressed: false,
    },
    {
      keyCode: "4",
      isKeyPressed: false,
    },
    {
      keyCode: "3",
      isKeyPressed: false,
    },
    {
      keyCode: "2",
      isKeyPressed: false,
    },
    {
      keyCode: "1",
      isKeyPressed: false,
    },
    {
      keyCode: "0",
      isKeyPressed: false,
    },
  ]
  // DATA FROM SERVICE
  public functionButtons: CalcButton[] =  this.sciCalcService.functionButtons;
  public basicButtons: CalcButton[] = this.sciCalcService.basicButtons;
  public cursorOnChar: boolean = this.sciCalcService.cursorOnChar;
  public isError: boolean = this.sciCalcService.isError;
  public syntaxError: boolean = this.sciCalcService.syntaxError;
  public mathError: boolean = this.sciCalcService.mathError;
  public hypEnabled: boolean = this.sciCalcService.hypEnabled;
  public memoryEnabled: boolean = this.sciCalcService.memoryEnabled;
  public memoryRecall: boolean = this.sciCalcService.memoryRecall;
  public isOverTenDigits: boolean = this.sciCalcService.isOverTenDigits;
  public x10PowerOf: number = this.sciCalcService.x10PowerOf;
  public charsToLeft: boolean = this.sciCalcService.charsToLeft; // if expression entered has over 11 chars
  public charsToRight: boolean = this.sciCalcService.charsToRight; // if expression entered has over 11 chars
  public commas: boolean[] = this.sciCalcService.commas;
  public decimals: boolean[] = this.sciCalcService.decimals;
  public displayCharsInViewAsStringArray: string[] = this.sciCalcService.displayCharsInViewAsStringArray;
  public calculatedResult: string = this.sciCalcService.calculatedResult;

  /* PRIVATE PROPERTIES, USED FOR HOST LISTENER EVENT HANDLING */
  private keyDown: string = "";
  private keyUp: string = "";

  constructor(
    private sciCalcService: SciCalculatorService
  ) { }

  ngOnInit(): void {
    /* timer delay for content visibility - to prevent flickering before splash screen */
    setTimeout(() => this.showProject = true, 3500);
    this.setSciCalcValues();
  }

  /* EVENT LISTENERS && ASSOCIATED METHODS, USED FOR KEY PRESS HANDLING */
  @HostListener("window:keydown", ["$event"]) keyDownEvent(event: any) {
    /* firstly, prevents default 
    (in case an arrow key pressed to prevent scrolling element in pressed arrow key's direction,
      or in case of Enter key, seemingly repeating last key's action)
    assigns pressed key value to keyDown property
      replaces value of keyDown, if Enter key pressed to equals sign
      if key pressed is an arrow key:
        - && sets Arrow button display layer in direction of arrow key pressed
      then calls method to handle key down event, providing the keyDown value */
    this.keyDown = event.key;
    if(this.keyDown == "Enter") {
      this.keyDown = "=";
      event.preventDefault();
    }
    if(this.keyDown == "ArrowUp"
      || this.keyDown == "ArrowDown"
      || this.keyDown == "ArrowLeft"
      || this.keyDown == "ArrowRight") {
        event.preventDefault();
        this.setArrowDisplayLayer(this.keyDown);
    }
    this.handleKeyDown(this.keyDown);
  }

  @HostListener("window:keyup", ["$event"]) keyUpEvent(event: any) {
    /* assigns released key value to keyUp property
      replaces value of keyDown, if Enter key pressed to equals sign
      then calls method to handle key up event, providing the keyUp value*/
    this.keyUp = event.key;
    if(this.keyUp == "Enter") this.keyUp = "=";
    this.handleKeyUp(this.keyUp);
  }

  private handleKeyDown(keyCode: string): void {
    /* loops through array of keyPress objects
      - to determine if key provided matches a defined key
        - if match found:
          - performs intended action, if that key is not currently being pressed (so this only executed once per press, not infinitely)
        - then sets the matching keyPress object's pressed status to true (to bypass aforemention action from executing repeatedly) */
    for(let i: number = 0; i < this.keyPresses.length; i++) {
      if(keyCode === this.keyPresses[i].keyCode) {
        if(!this.keyPresses[i].isKeyPressed) {
          if(keyCode == "Delete" || keyCode == "Backspace") this.deleteEntry();
          else if(keyCode == "=" || keyCode == "Enter") this.calculateResult();
          else if(keyCode == "Clear") this.clear();
          else if(keyCode == "ArrowUp") this.moveCursor("start");
          else if(keyCode == "ArrowLeft") this.moveCursor("left");
          else if(keyCode == "ArrowRight") this.moveCursor("right");
          else if(keyCode == "ArrowDown") this.moveCursor("end");
          else this.addToEquation(keyCode);
        }
        this.keyPresses[i].isKeyPressed = true;
      }
    }
  }

  private handleKeyUp(keyCode: string): void {
    /* loops through array of keyPress objects
    && resets the matching keyPress object's pressed status to false (to enable subsequent key presses to re-register)*/
    for(let i: number = 0; i < this.keyPresses.length; i++) {
      if(keyCode === this.keyPresses[i].keyCode) {
        this.keyPresses[i].isKeyPressed = false;
      }
    }
  }

  private setArrowDisplayLayer(keyCode: string): void {
    /* calls methods sets the display properties for each 'overlayed' arrow button element */
    if(keyCode === "ArrowUp") { this.upBtnHovered(); return }
    if(keyCode === "ArrowLeft") { this.leftBtnHovered(); return }
    if(keyCode === "ArrowRight") { this.rightBtnHovered(); return }
    if(keyCode === "ArrowDown") { this.downBtnHovered(); return; }
  }
 
  /* PUBLIC EVENT HANDLERS && METHODS, USED BY TEMPLATE */

  public handleArrowButtonHover(event: string) {
    event = event.toLocaleLowerCase();
    if(event == "left") this.leftBtnHovered();
    if(event == "right") this.rightBtnHovered();
    if(event == "up") this.upBtnHovered();
    if(event == "down") this.downBtnHovered();
  }

  public handleMainButtonClick(event: string) {
    if(event.toLocaleLowerCase() == "on") this.clear();
  }

  public moveCursor(to: string): void {

    this.sciCalcService.moveCursor(to);
    this.setSciCalcValues();
  }

  public handleFunctionButtonClick(event: string) {
    event = event.toLocaleLowerCase();
    let isEntry: boolean = true;
    if(event == "hyp") {
      this.enableHyp();
      isEntry = false;
    }
    if(event == "rcl") {
      this.setMemoryRecall();
      isEntry = false;
    }
    if(event == "caret") event = "^";
    if(event == "open-br") event = "\(";
    if(event == "close-br") event = "\)";
    if(event == "mplus") {
      this.activateMemory();
      isEntry = false;
    }
    if(isEntry) this.addToEquation(event);
  }

  public handleBasicButtonClick(event: string) {
    // event = event.toLocaleLowerCase();
    // let isEntry: boolean = true;
    if(event == "delete") {
      this.deleteEntry();
      return;
    }
    if(event == "ac") {
      this.clear();
      return;
    }
    if(event == "equals") {
      this.calculateResult();
      return;
    }
    if(event == "decimal") event = ".";
    if(event == "multiply") event = "*";
    if(event == "divide") event = "/";
    if(event == "add") event = "+";
    if(event == "subtract") event = "-";
    if(event == "exp") event = "E";
    this.addToEquation(event);
  }

  /* PRIVATE METHODS */

  private setSciCalcValues(): void {
    /* Sets scientific calculator properties' values to corresponding service properties */
    setTimeout(() =>{
      this.isError = this.sciCalcService.isError;
      this.syntaxError = this.sciCalcService.syntaxError;
      this.mathError = this.sciCalcService.mathError;
      this.hypEnabled = this.sciCalcService.hypEnabled;
      this.memoryEnabled = this.sciCalcService.memoryEnabled;
      this.memoryRecall = this.sciCalcService.memoryRecall;
      this.charsToLeft = this.sciCalcService.charsToLeft;
      this.charsToRight = this.sciCalcService.charsToRight;
      this.displayCharsInViewAsStringArray = this.sciCalcService.displayCharsInViewAsStringArray;
      this.cursorOnChar = this.sciCalcService.cursorOnChar;
      this.calculatedResult = this.sciCalcService.calculatedResult;
      this.commas = this.sciCalcService.commas;
      this.decimals = this.sciCalcService.decimals;
      this.isOverTenDigits = this.sciCalcService.isOverTenDigits;
      this.x10PowerOf = this.sciCalcService.x10PowerOf;
    }, 1);
  }

  private upBtnHovered(): void {
    /* sets the display values for each unintended button layer to 'none' to hide 
    then sets the intended 'up' arrow display layer to 'block' to show (done lastly to avoid overlap) */
    this.arrowDisplayLeft = 'none';
    this.arrowDisplayRight = 'none';
    this.arrowDisplayDown = 'none';
    this.arrowDisplayUp = 'block';
  }

  private leftBtnHovered(): void {
    /* sets the display values for each unintended button layer to 'none' to hide 
    then sets the intended 'left' arrow  display layer to 'block' to show (done lastly to avoid overlap) */
    this.arrowDisplayRight = 'none';
    this.arrowDisplayDown = 'none';
    this.arrowDisplayUp = 'none';
    this.arrowDisplayLeft = 'block';
  }

  private rightBtnHovered(): void {
    /* sets the display values for each unintended button layer to 'none' to hide 
    then sets the intended 'right' arrow  display layer to 'block' to show (done lastly to avoid overlap) */
    this.arrowDisplayLeft = 'none';
    this.arrowDisplayDown = 'none';
    this.arrowDisplayUp = 'none';
    this.arrowDisplayRight = 'block';
  }

  private downBtnHovered(): void {
    /* sets the display values for each unintended button layer to 'none' to hide 
    then sets the intended 'down' arrow  display layer to 'block' to show (done lastly to avoid overlap) */
    this.arrowDisplayLeft = 'none';
    this.arrowDisplayRight = 'none';
    this.arrowDisplayUp = 'none';
    this.arrowDisplayDown = 'block';
  }

  private addToEquation(entry: string): void {
    /* Calls corresponding service method 
    && resets component properties using data from service */
    this.sciCalcService.addToEquation(entry);
    this.setSciCalcValues();
  }

  private deleteEntry(): void {
    /* Calls corresponding service method 
    && resets component properties using data from service */
    this.sciCalcService.deleteEntry();
    this.setSciCalcValues();
  }

  private clear(): void {
    /* Calls corresponding service method 
    && resets component properties using data from service */
    this.sciCalcService.clear();
    this.setSciCalcValues();
  }

  private enableHyp(): void {
    /* Calls corresponding service method 
    && resets component properties using data from service */
    this.sciCalcService.enableHyp();
    this.setSciCalcValues();
  }

  private activateMemory(): void {
    /* Calls corresponding service method 
    && resets component properties using data from service */
    this.sciCalcService.activateMemory();
    this.setSciCalcValues();
  }

  private setMemoryRecall(): void {
    /* Calls corresponding service method 
    && resets component properties using data from service */
    this.sciCalcService.setMemoryRecall();
    this.setSciCalcValues();
  }

  private calculateResult(): void {
    /* Calls corresponding service method 
    && resets component properties using data from service */
    this.sciCalcService.calculateResult();
    this.setSciCalcValues();
  }

}