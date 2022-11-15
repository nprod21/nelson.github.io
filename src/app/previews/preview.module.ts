import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AboutComponent } from "./about/about.component";
import { ContactEmailComponent } from "./contact-email/contact-email.component";
import { ContactLinkedinComponent } from "./contact-linkedin/contact-linkedin.component";
import { SkillsComponent } from "./skills/skills.component";
import { ThisDemoComponent } from "./this-demo/this-demo.component";

@NgModule({
    declarations: [
        AboutComponent,
        ContactEmailComponent,
        ContactLinkedinComponent,
        SkillsComponent,
        ThisDemoComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        AboutComponent,
        ContactEmailComponent,
        ContactLinkedinComponent,
        SkillsComponent,
        ThisDemoComponent
    ]
})

export class PreviewModule{}