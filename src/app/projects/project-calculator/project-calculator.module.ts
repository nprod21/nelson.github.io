import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectCalculatorComponent } from "./project-calculator.component";

@NgModule({
    declarations: [
        ProjectCalculatorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ProjectCalculatorComponent
    ]
})
export class ProjectCalculatorModule {}