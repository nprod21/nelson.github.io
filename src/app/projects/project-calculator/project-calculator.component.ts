import { Component, OnInit, HostListener } from '@angular/core';

import { PressedKey } from './pressed-key';

@Component({
  selector: 'app-project-calculator',
  templateUrl: './project-calculator.component.html',
  styleUrls: ['./project-calculator.component.css']
})
export class ProjectCalculatorComponent implements OnInit {

  /* PRIVATE PROPERTIES, USED FOR BUSINESS LOGIC */
  private blinkingCursor: string = "_";
  private keyDown: string = "";
  private keyUp: string = "";
  private memoryAdded: boolean = false;
  private memoryValue: string = "";
  private enteredEquation: string[] = [];
  private formattedEquationString: string = "";
  private formattedEquation: string[] = [];
  private displayEquation: string[] = [" ", this.blinkingCursor];
  private displayEquationString: string = "";
  private displayCharStartIndex: number = 0;
  private displayCharEndIndex: number = this.displayEquationString.length;
  private displayCharsInVew: String = this.displayEquation.join('');
  private latestMathFunctionIndex: number = -1;
  private rawResult: any;
  private ans: string = "";
  private keyPresses: PressedKey[] = [
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

  /* PUBLIC PROPERTIES, USED BY TEMPLATE */
  public showProject: boolean = false;
  public arrowDisplayUp: string = 'block';
  public arrowDisplayLeft: string = 'none';
  public arrowDisplayRight: string = 'none';
  public arrowDisplayDown: string = 'none';
  public cursorOnChar: boolean = false;
  public isError: boolean = false;
  public syntaxError: boolean = false;
  public mathError: boolean = false;
  public hypEnabled: boolean = false;
  public memoryEnabled: boolean = false;
  public memoryRecall: boolean = false;
  public isOverTenDigits: boolean = false;
  public x10PowerOf: number = 88;
  public charsToLeft: boolean = false; // if expression entered has over 11 chars
  public charsToRight: boolean = false; // if expression entered has over 11 chars
  public commas: boolean[] = [false, false, false, false, false, false, false, false, false];
  public decimals: boolean[] = [false, false, false, false, false, false, false, false, false];
  public displayCharsInViewAsStringArray: string[] = this.displayEquation;
  public calculatedResult: string = "0";

  constructor() { }

  ngOnInit(): void {
    /* timer delay for content visibility - to prevent flickering before splash screen */
    setTimeout(() => this.showProject = true, 3050);
  }


  /* EVENT LISTENERS + ASSOCIATED METHODS, USED FOR KEY PRESS HANDLING */
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

  public isKeyPressed(keyCode: string): boolean {
    /* loops through array of keyPress objects
      - if key provided matches a defined key, returns whether that is key is currently being pressed
      (used to set ngClass of button element to appear 'active') */
    for(let i: number = 0; i < this.keyPresses.length; i++) {
      if(keyCode === this.keyPresses[i].keyCode) {
        return this.keyPresses[i].isKeyPressed;
      }
    }
    return false;
  }


  /* PRIVATE METHODS USED FOR BUSINESS LOGIC */
  private setCharsToLeft(): void {
    /* if (once displayed characters have been set), there are preceding display characters not shown to the user
        - sets the charsToLeft status to true (used for display screen's long arrow left), to indicate hidden former entries
    otherwise, the charsToLeft status is set to false, to indicate start of entries are visible */
    if(this.displayCharStartIndex > 0) this.charsToLeft = true;
    else this.charsToLeft = false;
  }

  private setCharsToRight(): void {
    /* if (once displayed characters have been set), there are successive display characters not shown to the user
        - sets the charsToRight status to true (used for display screen's long arrow right), to indicate hidden latter entries
    otherwise, the charsToRight status is set to false, to indicate end of entries are visible */
    if(this.displayCharEndIndex < this.displayEquationString.length - 1) {
      this.charsToRight = true;
    }      
    else this.charsToRight = false;
  }

  private setCharsToSides(): void {
    /* calls methods to determine whether there are any entry character display overflows
    - long arrow left and/or right boolean properties set, to trigger ngClasses used for display screen arrow indicators */
    this.setCharsToLeft();
    this.setCharsToRight();
  }

  private setMemoryValue(): void {
    /* calls method to calculate result of entered equation
    && either adds result to existing memory value
        or assigns result to memory value, if no memory value exists */
    this.calculateResult();
    if(this.memoryValue != "") {
      let memoryFigure: number = parseInt(this.memoryValue) + this.rawResult;
      this.memoryValue = memoryFigure.toString();
    }
    else this.memoryValue = this.rawResult.toString();
  }

  private displayMemory(): void {
    /* displays a formatted memory result, if one exists
    or resets memory recall to false */
    if(!isNaN(parseInt(this.memoryValue))) {
      this.rawResult = parseInt(this.memoryValue);
      this.setX10();
      this.calculatedResult = this.rawResult.toLocaleString(); 
    }
    else this.memoryRecall = false;
    
  }

  private getCursorIndex(): number {
    /* returns the index of the cursor within the full array of display equation entries */
    let cursorIndex = -1;
    for(let i: number = cursorIndex; i < this.displayEquation.length; i++) {
      if(this.displayEquation[i] === this.blinkingCursor) {
        cursorIndex = i;
        break;
      }
    }
    return cursorIndex;
  }

  private getCursorCharIndex(): number {
    /* returns the index of the cursor within the full string of display equation entriy characters */
    let cursorCharIndex = 0;
    for(let i: number = 0; i < this.displayEquationString.length; i++) {
      if(this.displayEquationString[i] === this.blinkingCursor) {
        cursorCharIndex = i;
        break;
      }
    }
    return cursorCharIndex;
  }

  private setCursorDisplayPlacement(): void {
    /* if cursor is at end of displayEquation array, 
        - toggles condition to add ngClass to HTML element to displace a character-space to left 
          (to visually overlay cursor on final 'empty' entry) */
    if(this.getCursorIndex() == 0 || this.displayEquation[0] == " ") {
      this.cursorOnChar = false;
    }
    else this.cursorOnChar = true;
  }

  private insertDisplayEntry(input: string): void {
    /* splice inserts the provided input entry into display equation array, relative to cursor's index position in the equation */
    let cursorIndex = this.getCursorIndex();
    if(cursorIndex == this.displayEquation.length - 1) {
      this.displayEquation.splice(cursorIndex - 1, 0, input);
    }
    else {
      this.displayEquation.splice(cursorIndex, 0, input);
    }
    this.setCursorDisplayPlacement();
  }

  private insertEquationEntry(input: string): void {
    /* splice inserts the provided input entry into entered equation array, relative to cursor's index position in the equation */
    this.enteredEquation.splice(this.getCursorIndex(), 0, input);
  }

  private setX10PowerOf(): void {
    /* repeatedly divides initial result by 10, if over ten digits, until less than 10 digits
    && increments the multiplied by 10 to the power of value by 1 (starting from zero) each division  */
    this.x10PowerOf = 0;
    // while(this.rawResult >= 9999999999) {
    while(this.rawResult > 9999999999) {
      this.rawResult = this.rawResult / 10;
      this.x10PowerOf++;
    }
  }

  private setX10(): void {
    /* if initial result is over ten digits,
        sets associated boolean to true
        && calls method to divide result until less than ten digits && calculate a multiple by 10 'to the power of' value
        if the resulting 'to the power of' value exceeds 99: math error is produced
          (as the screen cannot display over two digits for this value) */
    if(this.rawResult > 9999999999) {
      this.isOverTenDigits = true;
      this.setX10PowerOf();
      if(this.x10PowerOf > 99) this.throwError("math");
    }
  }

  private setDisplayCharsInView(start: number, end: number): void {
    /* sets displayed characters visible copying from/to indexes provided in full display equation array */
    this.displayCharsInVew = "";
    for(let i: number = start; i < end; i++) {
      this.displayCharsInVew += this.displayEquationString[i];
    }
  }

  private setDisplayCharsIndexes(deleteEntry?: boolean): void {
    /* sets from/to indexes of full display equation array to be displayed characters visible in display screen element */
    let displayStringLength = this.displayEquationString.length;
    let cursorCharIndex = this.getCursorCharIndex();
    if(displayStringLength < 14) {
      this.displayCharStartIndex = 0;
      this.displayCharEndIndex = displayStringLength;
      return;
    }
    else {
      if(cursorCharIndex < this.displayCharEndIndex && cursorCharIndex - 1 > this.displayCharStartIndex) {
        if(deleteEntry) {
          if(this.displayCharStartIndex > 0) {
            this.displayCharStartIndex--;
            this.displayCharEndIndex--;
          }
        }
        return;
      }
      else {
        if(cursorCharIndex - 1 < this.displayCharStartIndex && cursorCharIndex > 0) {
          this.displayCharStartIndex = cursorCharIndex - 1;
          this.displayCharEndIndex = cursorCharIndex + 12;
          return;
        }
        if(cursorCharIndex <= 0) {
          this.displayCharStartIndex = displayStringLength - 13;
          this.displayCharEndIndex = displayStringLength - 1;
          return;
        }
        if(cursorCharIndex >= this.displayCharEndIndex) {
          this.displayCharStartIndex = cursorCharIndex - 12;
          this.displayCharEndIndex = cursorCharIndex + 1;
          return;
        }
      }
    }
  }

  private updateDisplayCharsInView(deleteEntry?: boolean): void {
    /* calls methods to:
      - set from/to indexes of full display equation array to be displayed characters visible in display screen element
      - set displayed characters visible copying from/to indexes provided in full display equation array */
    this.displayEquationString = this.displayEquation.join('');
    if(deleteEntry) this.setDisplayCharsIndexes(true);
    else this.setDisplayCharsIndexes();
    this.setDisplayCharsInView(this.displayCharStartIndex, this.displayCharEndIndex);
    this.pushCharsToDisplayCharsInViewAsStringArray();
    this.setCharsToSides();
  }

  private pushCharsToDisplayCharsInViewAsStringArray(): void {
    /* loops through string of displayed characters visible && adds each character as a string array (of individual chars)
    (used by ngFor in template, as strings are not iterable in templates)
   (TODO refactor to eliminate this and used wrapped String object for displayCharsInView's type instead!) */
    this.displayCharsInViewAsStringArray = [];
    for(let i: number = 0; i < this.displayCharsInVew.length; i++) {
      this.displayCharsInViewAsStringArray.push(this.displayCharsInVew[i]);
    }
  }

  private isOperator(entry: string): boolean {
    /* returns true is provided arg is a defined operator */
    let isOperator: boolean = false;
    if(entry == "+" || entry == "-" || entry == "*" || entry == "/") isOperator = true;
    return isOperator;
  }

  private setFormattedEquation(): void {
    /* assigns shallow [1D] copy of entered equation array to formatted equation array,
    using spread operator, to prevent future changes affecting original values */
    this.formattedEquation = [...this.enteredEquation];
  }

  private setFormattedEquationString(): void {
    /* assigns the conjoined array of formatted equation to the matching property as a string */
    this.formattedEquationString = this.formattedEquation.join('');
  }

  private replaceSquaredFunctionEntries(): void {
    /* replaces squared function entries from their initial conjoined function+second-arg entry, to separate entries */
    for(let i: number = 0; i < this.formattedEquation.length; i++) {
      if(this.formattedEquation[i] == "POWER(,2") {
        let base: string = "(" + this.formattedEquation[i - 1];
        // TODO SquaredIndex/BaseGetter/Setter
        this.formattedEquation.splice(i, 1, "POWER(");
        this.formattedEquation.splice(i + 1, 0, "2");
      }
    }
  }

  private replaceReciprocalFunctionEntries(): void {
    /* replaces reciprocal function entries from their initial conjoined function+second-arg entry, to separate entries */
    for(let i: number = 0; i < this.formattedEquation.length; i++) {
      if(this.formattedEquation[i] == "POWER(,-1") {
        this.formattedEquation.splice(i, 1, "POWER(");
        this.formattedEquation.splice(i + 1, 0, "-1");
      }
    }
  }

  private getBaseData(index: number, array: string[]): string[] {
    /* loops backwards through array from index to retrieve base argument data (entered before the function)
    && returns base argument data as an array,
        - where the first index is the index the argument was stopped at, accounting for nested function entries
        && the second index is the conjoined base argument as a single string */
    console.warn("getBaseData received array == " + array);
    let baseData: string[] = [];
    let base: string [] = [];
    let bracketCount: number = 0;
    index--;
    while(index >= 0) {
      if(array[index] == "(") bracketCount--;
      if(array[index] == ")") bracketCount++;
      if(this.isOperator(array[index]) && bracketCount == 0) break;
      base.unshift(array[index]);
      baseData[0] = index.toString();
      index--;
    }
    baseData[1] = base.join('');
    return baseData;
  }

  private getPostFunctionArgLastIndex(index: number, equation: string[]): string {
    /* returns the ending index of a function argument entered after the function, until any further nested power of function entries */
    let expLastIndex: string = "";
    index++;
    for(index; index < equation.length; index++) {
      if(!this.isOperator(equation[index]) && equation[index] != "POWER(") {
        expLastIndex = index.toString();
      }
      if(this.isOperator(equation[index]) || equation[index] == "POWER(") break;
    }
    return expLastIndex;
  }

  private getPostFunctionArgValues(index: number, equation: string[]): string [] {
    /* extracts the function argument values entered after a (power of)function, until any further nested power of function entries
    && returns the values with a concluding closing bracket added to the values */
    let expValues: string[] = [];
    index++;
    for(index; index < equation.length; index++) {
      if(!this.isOperator(equation[index]) && equation[index] != "POWER(") {
        if(expValues[0] == null) expValues[0] = equation[index];
        else expValues.push(equation[index]);
      }
      if(this.isOperator(equation[index]) || equation[index] == "POWER(") break;
    }
    expValues.push(")");
    return expValues;
  }

  private getPostFunctionArgData(index: number, array: string[]): string[] {
    /* extracts the function argument values entered after a (trigonometry)function, until any operator entries
    && returns argument data as an array,
        - where the first index is the index the argument was stopped at, (operator entry or end of equation)
        && the second index is the conjoined argument data as a single string */
    let postFunctionArgData: string[] = [];
    index++;
    for(index; index < array.length; index++) {
      //if element at index of array is not an operator!
      if(!this.isOperator(array[index])) {
        postFunctionArgData[0] = index.toString();
        if(postFunctionArgData[1] == null) postFunctionArgData[1] = array[index];
        else postFunctionArgData[1] += array[index];
      }
      else break;
    }
    if(postFunctionArgData == []) {
      this.isError = true;
      this.syntaxError = true;
    }
    return postFunctionArgData;
  }

  private getFunctionIndex(functionName: string, equation: string[]): number {
    /* returns the first index of the provided function name, within the provided equation array */
    let index: number = -1;
    for(let i: number = 0; i < equation.length; i++) {
      if(equation[i] === functionName) {
        index = i;
        break;
      }
    }
    return index;
  }

  private getMathFunctionIndex(functionName: string): number {
    /* returns the last index of the provided function name, within the formatted equation array */
    let index: number = -1;
    for(let i: number = this.formattedEquation.length; i >= 0; i--) {
      if(this.formattedEquation[i] === functionName && i < this.latestMathFunctionIndex) {
        index = i;
        this.latestMathFunctionIndex = i;
        break;
      }
    }
    return index;
  }

  private formatPowerFunctions(): void {
    /* formats all power function entries in the formatted equation,
        each replaced with executable Math.pow() functions, with intended base + exponent arguments */
    let powerIndex: number = this.getFunctionIndex("POWER(",this.formattedEquation);
    while(powerIndex >= 0) {
      let baseData: string [] = this.getBaseData(powerIndex, this.formattedEquation);
      console.warn("baseData[1] == " + baseData[1]);
      let expLastIndex: string = this.getPostFunctionArgLastIndex(powerIndex, this.formattedEquation);
      let expValues: string = this.getPostFunctionArgValues(powerIndex, this.formattedEquation).join('');
      console.warn("expValues == " + expValues);
      let spliceIndex: number = parseInt(baseData[0]);
      let spliceCount: number = parseInt(expLastIndex) + 1 - spliceIndex;
      let functionArray: string[] = ["Math.pow(", baseData[1], ",", expValues];
      let functionString: string = functionArray.join('');
      this.formattedEquation.splice(spliceIndex, spliceCount, functionString);
      powerIndex = this.getFunctionIndex("POWER(",this.formattedEquation);
    }
  }

  private formatSingleArgMathFunction(functionName: string): void {
    /* formats provided (non power-of or trigonometry) math functions in the formatted equation,
        each instance replaced executable Math.function(), with intended argument */
    this.latestMathFunctionIndex = this.formattedEquation.length;
    let functionIndex: number = this.getMathFunctionIndex(functionName);
    while(functionIndex >= 0) {
      let argLastIndex: string = this.getPostFunctionArgLastIndex(functionIndex, this.formattedEquation);
      let argValues: string [] = this.getPostFunctionArgValues(functionIndex, this.formattedEquation);
      let argValuesString: string = argValues.join('');
      console.warn("argValues == " + argValues);
      console.warn("argValuesString == " + argValuesString);
      let spliceCount: number = parseInt(argLastIndex) + 1 - functionIndex;
      this.formattedEquation.splice(functionIndex, spliceCount, functionName);
      let spliceIndex: number = functionIndex + 1;
      /* REFACTORED below from looping through + splice inserting each array value,
      to splice inserting conjoined string of array values - code kept temporarily for quick reference during further testing */
      // for(let i: number = 0; i < argValues.length; i++) {
      //   this.formattedEquation.splice((spliceIndex + i), 0, argValues[i]);
      // }
      this.formattedEquation.splice(spliceIndex, 0, argValuesString);
      functionIndex = this.getMathFunctionIndex(functionName);
    }
  }

  private formatTrigonometryFunction(functionName: string): void {
    /* formats provided trigonometry math functions in the formatted equation,
        each instance replaced executable Math.sin[h]/cos[h]/tan[h]() function, with intended argument */
    let functionIndex: number = this.getMathFunctionIndex(functionName);
    while(functionIndex >= 0) {
      let argData: string [] = this.getPostFunctionArgData(functionIndex, this.formattedEquation);
      let spliceCount: number = parseInt(argData[0]) + 1 - functionIndex;
      /* Formally, a calculator is actually using the function sin/cos/tan(πx/180)
      when set to accept x measured in degrees, so it's doing the conversion to radiant auto. */
      let convertedArgArray: string [] = ["Math.PI", "*", argData[1], "/", "180"];
      if(functionName == "Math.sinh("
        || functionName == "Math.cosh("
        || functionName == "Math.tanh(") {
          convertedArgArray = [argData[1]];
      }
      let convertedArgString: string = convertedArgArray.join('');
      let functionArray: string [] = [functionName, convertedArgString, ")"];
      let functionString: string = functionArray.join('');
      this.formattedEquation.splice(functionIndex, spliceCount, functionString);
      functionIndex = this.getMathFunctionIndex(functionName);
    }
  }

  private removeMemoryEntries(): void {
    /* remove M+ entries from the formatted equation (as these should not be evaluated) */
    for(let i: number = 0; i < this.formattedEquation.length; i++) {
      if(this.formattedEquation[i] == "M+") {
        this.formattedEquation.splice(i, 1);
      }
    }
  }

  private formatEquation(): void {
    /* calls all formatting methods to cleanse the equation, prior to evaluation */
    this.setFormattedEquation();
    this.removeMemoryEntries();
    this.replaceSquaredFunctionEntries();
    this.replaceReciprocalFunctionEntries()
    this.formatSingleArgMathFunction("Math.pow(10,");
    this.formatSingleArgMathFunction("Math.sqrt(");
    this.formatSingleArgMathFunction("Math.log10(");
    this.formatSingleArgMathFunction("Math.log(");
    this.formatTrigonometryFunction("Math.sin(");
    this.formatTrigonometryFunction("Math.sinh(");
    this.formatTrigonometryFunction("Math.cos(");
    this.formatTrigonometryFunction("Math.cosh(");
    this.formatTrigonometryFunction("Math.tan(");
    this.formatTrigonometryFunction("Math.tanh(");
    this.formatPowerFunctions();
    this.setFormattedEquationString();
  }

  private getDecimalPosition(): number {
    /* loops through initial result to find a decimal
    && returns its index, if present, otherwise returns negative number */
    let decimalPosition: number = -1;
    let result: string = this.rawResult.toString();
    for(let i: number = 0; i < result.length; i++) {
      if(result[i] == ".") {
        decimalPosition = i;
        break;
      }
    }
    return decimalPosition;
  }

  private removeDecimalFromResult(decimalPosition: number): void {
    /* copies all numeric characters from string copy of result,
    exluding the decimal, to a new result without decimal string
    && assigns this new string to the calculated result property */
    if(decimalPosition == -1) return;
    let resultString: string = this.rawResult.toString();
    let resultWithoutDecimal: string = "";
    for(let i: number = 0; i < resultString.length; i++) {
      if(resultString[i] == ".") continue;
      resultWithoutDecimal += resultString[i];
    }
    this.calculatedResult = resultWithoutDecimal;
  }

  private formatResult(): void {
    /* rounds result to calculated decimal point,
    then sets punctuation accordingly, removes decimal from initial result, if present
    && assigns now formatted initial result to calculated result property */
      let decimalPosition: number = this.getDecimalPosition();
      if(decimalPosition != -1) {
        let decimalPoint: number = 10 - decimalPosition;
        /* using toFixed incidentally resolve limited float issue/if result is an inexact number
          - i.e. certain trigonometry equation using pi e.g. 'sin 180' returns 1.2246467991473532e-16 */
        let roundedResult: string = this.rawResult.toFixed(decimalPoint);
        this.rawResult = parseFloat(roundedResult);
      }
      this.setPunctuation();
      if(decimalPosition != -1) this.removeDecimalFromResult(decimalPosition);
      else this.calculatedResult = this.rawResult;   
  }

  private resetPunctuation(): void {
    /* resets all comma + decimal position array values to false
        (used for display screen punctuation) */
    this.commas = [false, false, false, false, false, false, false, false, false];
    this.decimals = [false, false, false, false, false, false, false, false, false];
  }

  private punctuationCount(): number {
    /* returns amount of specified punctuation characters in initial result */
    let result: string = this.rawResult.toLocaleString(); //toLocaleString() used to apply punctuation
    let count: number = 0;
    for(let i: number = 0; i < result.length; i++) {
      if(result[i] == "," || result[i] == ".") count++;
    }
    return count;
  }

  private setPunctuation(): void {
    /* sets punctuation bool values in commas + decimal arrays
    (used as webfont is monospace,
      therefore, punctuation is overlayed with an offset translation to appear in between digit chars of result) */
    this.resetPunctuation();
    let decimalPosition: number = this.getDecimalPosition();
    let decimalPlaces = (this.rawResult.toString().length - 1) - decimalPosition;
    if(decimalPosition == -1) decimalPlaces = 0;
    let result: string = this.rawResult.toLocaleString(undefined, {minimumFractionDigits: decimalPlaces});
    let punctuationCount = this.punctuationCount()
    let shift: number = (10 - result.length) + punctuationCount;
    for(let i: number = result.length - 1; i >= 0; i--) {
      if(result[i] == "," || result[i] == ".") {
        if(result[i] == ",") this.commas[i - punctuationCount + shift] = true;
        if(result[i] == ".") this.decimals[i - punctuationCount + shift] = true;
        punctuationCount--;
      }
    }
  }

  private throwError(errorType: string): void {
    /* sets error and provided error type property status' to true */
    this.isError = true;
    if(errorType == "syntax") this.syntaxError = true;
    if(errorType == "math") this.mathError = true;
  }

  
  /* PUBLIC METHODS, USED BY TEMPLATE */
  public upBtnHovered(): void {
    /* sets the display values for each unintended button layer to 'none' to hide 
    then sets the intended 'up' arrow display layer to 'block' to show (done lastly to avoid overlap) */
    this.arrowDisplayLeft = 'none';
    this.arrowDisplayRight = 'none';
    this.arrowDisplayDown = 'none';
    this.arrowDisplayUp = 'block';
  }

  public leftBtnHovered(): void {
    /* sets the display values for each unintended button layer to 'none' to hide 
    then sets the intended 'left' arrow  display layer to 'block' to show (done lastly to avoid overlap) */
    this.arrowDisplayRight = 'none';
    this.arrowDisplayDown = 'none';
    this.arrowDisplayUp = 'none';
    this.arrowDisplayLeft = 'block';
  }

  public rightBtnHovered(): void {
    /* sets the display values for each unintended button layer to 'none' to hide 
    then sets the intended 'right' arrow  display layer to 'block' to show (done lastly to avoid overlap) */
    this.arrowDisplayLeft = 'none';
    this.arrowDisplayDown = 'none';
    this.arrowDisplayUp = 'none';
    this.arrowDisplayRight = 'block';
  }

  public downBtnHovered(): void {
    /* sets the display values for each unintended button layer to 'none' to hide 
    then sets the intended 'down' arrow  display layer to 'block' to show (done lastly to avoid overlap) */
    this.arrowDisplayLeft = 'none';
    this.arrowDisplayRight = 'none';
    this.arrowDisplayUp = 'none';
    this.arrowDisplayDown = 'block';
  }

  public addToEquation(entry: string): void {
    /* handles adding intended button entry/key press values to both the:
        - 'entered' equation (used for the final calculation)
        - 'display' equation (used for the displayed equation, shown to the user on the screen element) 
      if the entry is not a 'value'entry (such as a 'hyp' or 'M+'), necessary action is taken
    && then calls method to update which characters of the full display equation are shown to the user on the screen element */
    // TODO REFACTOR
    if(this.memoryAdded && entry != "M+") this.clear();
    if(this.getCursorIndex() == -1) {
      if(this.isOperator(entry) || entry == "x1" || entry == "x2" || entry == "^") {
        this.clear();
        this.insertEquationEntry(this.ans);
        this.insertDisplayEntry("Ans");
      }
      else if(entry != "M+" && this.isError == false) {
        this.clear();
      }; 
    }
    if(entry === "0" || entry === "1" || entry === "2" 
      || entry === "3" || entry === "4" || entry === "5" 
      || entry === "6" || entry === "7" || entry === "8" 
      || entry === "9" || entry === "+" || entry === "(" 
      || entry === ")" || entry === "-" || entry === "."
    ) {
        this.insertEquationEntry(entry);
        this.insertDisplayEntry(entry);
    }
    if(entry === "/") {
      this.insertEquationEntry(entry);
      this.insertDisplayEntry("÷");
    }
    if(entry === "*") {
      this.insertEquationEntry("*");
      this.insertDisplayEntry("×");
    }
    if (entry === "x1") {
      this.insertEquationEntry("POWER(,-1");
      this.insertDisplayEntry("x");
    }
    if(entry === "sqrt") {
      this.insertEquationEntry("Math.sqrt(");
      this.insertDisplayEntry("√");
    }
    if(entry === "x2") {
      this.insertEquationEntry("POWER(,2");
      this.insertDisplayEntry("y")
    }
    if(entry === "^") {
      this.insertEquationEntry("POWER(");
      this.insertDisplayEntry("^");
    }
    if(entry === "log") {
      this.insertEquationEntry("Math.log10(");
      this.insertDisplayEntry("log  ");
    }
    if(entry === "ln") {
      this.insertEquationEntry("Math.log(");
      this.insertDisplayEntry("ln  ");
    }
    if(entry === "negative") {
      this.insertEquationEntry("(-");
      this.insertDisplayEntry("z");
    }
    if(entry === "sin") {
      if(this.hypEnabled) {
        this.insertEquationEntry("Math.sinh(");
        this.insertDisplayEntry("sinh  ");
      }
      else {
        this.insertEquationEntry("Math.sin(");
        this.insertDisplayEntry("sin  ");
      }
    }
    if(entry === "cos") {
      if(this.hypEnabled) {
        this.insertEquationEntry("Math.cosh(");
        this.insertDisplayEntry("cosh  ");
      }
      else {
        this.insertEquationEntry("Math.cos(");
        this.insertDisplayEntry("cos  ");
      }
    }
    if(entry === "tan") {
      if(this.hypEnabled) {
        this.insertEquationEntry("Math.tanh(");
        this.insertDisplayEntry("tanh  ");
      }
      else {
        this.insertEquationEntry("Math.tan(");
        this.insertDisplayEntry("tan  ");
      }
    }
    if(entry === "E") {
      this.insertEquationEntry("Math.pow(10,");
      this.insertDisplayEntry("E");
    }
    if(entry === "Ans") {
      if(this.ans === "") return;
      else {
        this.insertEquationEntry(this.ans);
        this.insertDisplayEntry("Ans");
      }
    }
    if(entry === "M+") {
      let length: number = this.displayEquation.length;
      if(this.displayEquation[length - 2] != "M+" && this.displayEquation[length - 3] != "M+") {
        if(this.getCursorIndex() == length - 1) {
          this.displayEquation.splice(length - 2, 0, "M+"); 
        }
        else { 
          this.displayEquation.splice(length - 1, 0, "M+");
        }
      }
    }
    if(this.hypEnabled) this.hypEnabled = false;
    if(this.memoryRecall) this.memoryRecall = false;
    this.memoryAdded = false;
    this.updateDisplayCharsInView();
    this.setCharsToSides();
  }

  public deleteEntry(): void {
    /* splice removes entry from both entered + displayed equation arrays, relative to the position index of the cursor
    then repositions cursor, if necessary
    && calls methods to:
        - set placement of display chars visible, relative to the position index of the cursor
        - update which displayed characters are visible, using indexes calculated by preceding method */
    let deleteIndex: number = this.getCursorIndex() - 1;
    if(deleteIndex == -2) return;
    if(this.displayEquation[deleteIndex] == " " && this.displayEquation.length > 2) {
      this.displayEquation.splice(deleteIndex - 1, 1);
      this.enteredEquation.splice(deleteIndex - 1, 1);
    }
    else if(this.displayEquation[deleteIndex] != " ") { 
      this.displayEquation.splice(deleteIndex, 1);
      this.enteredEquation.splice(deleteIndex, 1);
      if(this.getCursorIndex() == 0) {
        this.moveCursor("start");
      }   
    }
    this.setCursorDisplayPlacement();
    this.updateDisplayCharsInView(true);
  }

  public clear(): void {
    /* resets practically all property values (directly && via methods),
    except for historical answer && in-memory values */
    this.calculatedResult = "0";
    this.rawResult = 0;
    this.isOverTenDigits = false;
    this.x10PowerOf = 88;
    // this.hasDecimal = false;
    this.isError = false;
    this.syntaxError = false;
    this.mathError = false;
    this.hypEnabled = false;
    this.memoryRecall = false;
    this.enteredEquation = [];
    this.displayEquation = [" ", this.blinkingCursor];
    this.setCursorDisplayPlacement();
    this.updateDisplayCharsInView();
    this.setCharsToSides();
    this.resetPunctuation();
    this.displayEquationString = "";
    this.displayCharStartIndex = 0;
    this.displayCharEndIndex = this.displayEquationString.length;
    this.displayCharsInVew = this.displayEquation.join('');
    this.displayCharsInViewAsStringArray = this.displayEquation;
  }

  public moveCursor(to: string): void {
    /* moves the cursor in the display equation array:
      - either +/-1 to the right/left, if the provided string is 'right' or 'left',
        or to the start/end, if the provided string is 'start' or 'end'
    then calls methods to:
      - set the cursor's displayed placement
      - update which display characters are 'in-view' (on the display screen element)
      - set the character overflow indicator properties, if applicable */
    let fromIndex: number = this.getCursorIndex();
    if(fromIndex == -1) {
      if(to == "left") this.displayEquation.splice(this.displayEquation.length - 2, 0, this.blinkingCursor);
      if(to == "right" || to == "end") this.displayEquation.push(this.blinkingCursor);
      if(to == "start") this.displayEquation.splice(1, 0 , this.blinkingCursor);
    }
    else {
      this.displayEquation.splice(fromIndex, 1);
      let toIndex: number = 0;
      if(to === "left") {
        if(fromIndex > 2) {
          toIndex = fromIndex - 1;
        }
        else toIndex = 1;
      }
      if(to === "right") {
        if(fromIndex < this.displayEquation.length) {
          toIndex = fromIndex + 1;
        }
        else toIndex = fromIndex;
      }
      if(to === "start") toIndex = 1;
      if(to === "end") toIndex = this.displayEquation.length;
      this.displayEquation.splice(toIndex, 0, this.blinkingCursor);
    }
    this.setCursorDisplayPlacement();
    this.updateDisplayCharsInView();
    this.setCharsToSides();
  }

  public enableHyp(): void {
    /* sets hyp bool to true 
    (used for display screen gnClass indicator && to alternate subsequent trigononmetry entry to it's hyperbolic function) */
    this.hypEnabled = true;
  }

  public activateMemory(): void {
    /* enables memory function
    && either calls method to display memory value, if recall status is true,
    or if last entry is not M+:
      - adds M+ to display equation,
      - sets memory added status to true
      - calls method to calculate result of current equations && add it */
    this.memoryEnabled = true;
    if(this.memoryRecall) {
      this.displayMemory();
      this.memoryRecall = false;
    }
    else {
      let length: number = this.displayEquation.length;
      if(this.displayEquation[length - 2] != "M+" && this.displayEquation[length - 3] != "M+") {
        this.addToEquation("M+");
        this.memoryAdded = true;
        this.setMemoryValue();  
      } 
    }
  }

  public setMemoryRecall(): void {
    /* sets status of memory recall to true
    (used for display screen ngClass indicator && to display memory value on subsequent M+ entry) */
    this.memoryRecall = true;
  }

  public calculateResult(): void {
    /* if an equation has been entered,
    calls method to format the equation into executable code,
    then tries to evaluate the expression && assign the value to initial result property
      && throws a 'syntax error' if any error produced, or if the evaluated value is not a number
    if try is successful:
     - initial result is added to the history answer property (enclosed in brackets),
     - calls method to set multiplied by ten, to the power of value (if result exceeds ten digits)
     - calls method to format result to be displayed
    then removes cursor from displayed equation && updates displayed equation characters in view */
    if(this.getCursorIndex() == -1 || this.enteredEquation.length < 1 || this.isError) return;
    this.formatEquation();
    try {
      this.rawResult = eval(this.formattedEquationString);
      // this.rawResult = Number(this.formattedEquationString);
    }
    catch(err) {
      this.throwError("syntax");
    }
    console.warn("this.rawResult == " + this.rawResult);
    console.warn("isNaN(this.rawResult) == " + isNaN(this.rawResult));

    if(this.rawResult === Infinity) {
      this.throwError("math");
      return;
    }

    setTimeout(() => {
      if(isNaN(this.rawResult)) {
        this.throwError("syntax");
      }
      else {
        this.ans = "(";
        this.ans += this.rawResult.toString();
        this.ans += ")";
        this.setX10();
        this.formatResult();
      }
      this.displayEquation.splice(this.getCursorIndex(), 1);
      this.updateDisplayCharsInView();  
    }, 1);
    
  }
}
