import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
