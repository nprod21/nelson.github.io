import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisDemoComponent } from './this-demo.component';

describe('ThisDemoComponent', () => {
  let component: ThisDemoComponent;
  let fixture: ComponentFixture<ThisDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThisDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
