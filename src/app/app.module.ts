import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { BackgroundComponent } from './background/background.component';
import { TabHeadersComponent } from './tab-headers/tab-headers.component';
import { TabBodyComponent } from './tab-body/tab-body.component';
import { TabLinecountComponent } from './tab-linecount/tab-linecount.component';
import { TabPreviewComponent } from './tab-preview/tab-preview.component';
import { ContactEmailComponent } from './contact-email/contact-email.component';
import { ThisDemoComponent } from './projects/demos/this-demo/this-demo.component';
import { ContactLinkedinComponent } from './contact-linkedin/contact-linkedin.component';
import { AboutComponent } from './about/about.component';
import { ProjectWeatherComponent } from './projects/project-weather/project-weather.component';
import { ProjectCalculatorComponent } from './projects/project-calculator/project-calculator.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { PanelComponent } from './panel/panel.component';
import { SkillsComponent } from './skills/skills.component';
import { ResizeDirective } from './resize.directive';
import { ProjectTrackerComponent } from './projects/project-tracker/project-tracker.component';
import { TicketFormComponent } from './projects/project-tracker/ticket-form/ticket-form.component';
import { TicketDetailsComponent } from './projects/project-tracker/ticket-details/ticket-details.component';
import { BarChartComponent } from './projects/project-tracker/bar-chart/bar-chart.component';
import { DonutChartComponent } from './projects/project-tracker/donut-chart/donut-chart.component';
import { SortPipe } from './projects/project-tracker/sort.pipe';
import { AssigneesComponent } from './projects/project-tracker/assignees/assignees.component';
import { TicketListComponent } from './projects/project-tracker/ticket-list/ticket-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    BackgroundComponent,
    TabHeadersComponent,
    TabBodyComponent,
    TabLinecountComponent,
    TabPreviewComponent,
    ContactEmailComponent,
    ThisDemoComponent,
    ContactLinkedinComponent,
    AboutComponent,
    ProjectWeatherComponent,
    ProjectCalculatorComponent,
    SplashScreenComponent,
    UserInterfaceComponent,
    PanelComponent,
    SkillsComponent,
    ResizeDirective,
    ProjectTrackerComponent,
    TicketFormComponent,
    TicketDetailsComponent,
    BarChartComponent,
    DonutChartComponent,
    SortPipe,
    AssigneesComponent,
    TicketListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
