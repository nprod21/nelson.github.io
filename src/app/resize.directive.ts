import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appResize]'
})

export class ResizeDirective {

  @Output() resizeStart = new EventEmitter<any>();

  @Output() resizeMove = new EventEmitter<any>();

  @Output() resizeEnd = new EventEmitter<any>();

  private mouseDown: boolean = false;

  /* currently, directive is only applied to the resize handle element in the UI component
      (div separator between tab text/content & preview sections)
    to mitigate duplicate listening with (currently) 'global' HostListener events, 
                                          active directly in other components */
  @HostListener('mousedown', ['$event']) onResizeStart(event: any) {
    if(event.target.id == "resizer-x") {
      this.resizeStart.emit(event);
      this.mouseDown = true;
    }
  }

  @HostListener('mousemove', ['$event']) onResizeMove(event: any) {
    if(this.mouseDown) {
      this.resizeMove.emit(event);
    }
    else return;
  }

  @HostListener('mouseup', ['$event']) onResizeEnd(event: any) {
    if(this.mouseDown) {
      this.resizeEnd.emit(event);
      this.mouseDown = false;
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: any) {
    if(this.mouseDown) {
      this.resizeEnd.emit(event);
      this.mouseDown = false;
    }
  }
  
  constructor() { }

}
