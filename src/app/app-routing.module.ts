import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserInterfaceComponent } from './user-interface/user-interface.component';

const routes: Routes = [

  { path: ':first', 
      children: [
        { path: ':second', component: UserInterfaceComponent },
        { path: ':second/:third', component: UserInterfaceComponent }
      ]
  },
  // { path: '**', redirectTo: '' },
  { path: '', redirectTo: '/about', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
