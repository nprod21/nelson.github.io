import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabHeadersComponent } from './tab-headers.component';

describe('TabHeadersComponent', () => {
  let component: TabHeadersComponent;
  let fixture: ComponentFixture<TabHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabHeadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
