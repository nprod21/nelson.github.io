import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectCalculatorComponent } from "./containers/project-calculator.component";
import { CalcBackgroundComponent } from "./components/calc-background.component";
import { ScreenComponent } from './components/screen/screen.component';
import { MainButtonComponent } from './components/main-button/main-button.component';
import { ArrowButtonComponent } from './components/arrow-button/arrow-button.component';
import { FunctionButtonComponent } from './components/function-button/function-button.component';
import { BasicButtonComponent } from './components/basic-button/basic-button.component';

@NgModule({
    declarations: [
        ProjectCalculatorComponent,
        CalcBackgroundComponent,
        ScreenComponent,
        MainButtonComponent,
        ArrowButtonComponent,
        FunctionButtonComponent,
        BasicButtonComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ProjectCalculatorComponent
    ]
})
export class ProjectCalculatorModule {}