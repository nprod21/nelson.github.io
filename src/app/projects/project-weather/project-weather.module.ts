import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectWeatherComponent } from "./project-weather.component";

@NgModule({
    declarations: [
        ProjectWeatherComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ProjectWeatherComponent
    ]
})

export class ProjectWeatherModule {}