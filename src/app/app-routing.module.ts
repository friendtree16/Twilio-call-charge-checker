import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallListComponent } from './call-list/call-list.component';

const routes: Routes = [
  {path:'',redirectTo:'list',pathMatch:'prefix'},
  {path:'list',component:CallListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
