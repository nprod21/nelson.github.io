import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLinkedinComponent } from './contact-linkedin.component';

describe('ContactLinkedinComponent', () => {
  let component: ContactLinkedinComponent;
  let fixture: ComponentFixture<ContactLinkedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactLinkedinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactLinkedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
