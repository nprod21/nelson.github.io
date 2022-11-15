import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";

import { UserInterfaceComponent } from "./containers/user-interface.component";
import { SideNavbarComponent } from "./components/side-navbar/side-navbar.component";
import { BackgroundComponent } from "./components/background/background.component";
import { TabHeadersComponent } from "./components/tab-headers/tab-headers.component";
import { TabBodyComponent } from "./components/tab-body/tab-body.component";
import { TabLinecountComponent } from "./components/tab-linecount/tab-linecount.component";
import { TabPreviewComponent } from "./components/tab-preview/tab-preview.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { PanelComponent } from "./components/panel/panel.component";

import { ResizeDirective } from "./directives/resize.directive";

import { PreviewModule } from "../previews/preview.module";
import { ProjectWeatherModule } from "../projects/project-weather/project-weather.module";
import { ProjectCalculatorModule } from "../projects/project-calculator/project-calculator.module";
import { ProjectTrackerModule } from "../projects/project-tracker/project-tracker.module";


@NgModule({
    declarations: [
        UserInterfaceComponent,
        SideNavbarComponent,
        BackgroundComponent,
        TabHeadersComponent,
        TabBodyComponent,
        TabLinecountComponent,
        TabPreviewComponent,
        SplashScreenComponent,
        PanelComponent,
        ResizeDirective
    ],
    imports: [
        CommonModule,
        PreviewModule,
        AppRoutingModule,
        ProjectWeatherModule,
        ProjectCalculatorModule,
        ProjectTrackerModule
    ],
    exports: [
        UserInterfaceComponent
    ]
})
export class UserInterfaceModule {}