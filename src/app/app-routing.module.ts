import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OpportunityComponent } from "./opportunity/components/opportunity.component";
import { FormComponent } from "./tasks/components/form/form.component";
import { LoginComponent } from "./login/components/login.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: '/login', pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
