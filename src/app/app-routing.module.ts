import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'prefix'},
  {path:'login',loadChildren: './login/login.module#LoginModule'},
  {path:'list',loadChildren: './call-list/call-list.module#CallListModule',canActivate: [AuthGuard]},
  {path:'**',redirectTo:'login',pathMatch:'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
