import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { ProjectTrackerComponent } from "./containers/project-tracker.component";
import { AssigneesComponent } from "./components/assignees/assignees.component";
import { BarChartComponent } from "./components/bar-chart/bar-chart.component";
import { DonutChartComponent } from "./components/donut-chart/donut-chart.component";
import { TicketDetailsComponent } from "./components/ticket-details/ticket-details.component";
import { TicketFormComponent } from "./components/ticket-form/ticket-form.component";
import { TicketListComponent } from "./components/ticket-list/ticket-list.component";
import { SortPipe } from "./pipes/sort.pipe";


@NgModule({
    declarations: [
        ProjectTrackerComponent,
        AssigneesComponent,
        BarChartComponent,
        DonutChartComponent,
        TicketDetailsComponent,
        TicketFormComponent,
        TicketListComponent,
        SortPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ProjectTrackerComponent
    ]
})

export class ProjectTrackerModule{}