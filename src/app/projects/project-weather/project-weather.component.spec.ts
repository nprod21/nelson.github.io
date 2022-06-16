import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWeatherComponent } from './project-weather.component';

describe('ProjectWeatherComponent', () => {
  let component: ProjectWeatherComponent;
  let fixture: ComponentFixture<ProjectWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
