import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLinecountComponent } from './tab-linecount.component';

describe('TabLinecountComponent', () => {
  let component: TabLinecountComponent;
  let fixture: ComponentFixture<TabLinecountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabLinecountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLinecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
