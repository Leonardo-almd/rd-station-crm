import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OpportunityComponent } from "./opportunity/opportunity.component";
import { TasksComponent } from "./tasks/tasks.component";
import { FormComponent } from "./tasks/form/form.component";

const routes: Routes = [
  { path: '', redirectTo: '/opportunity', pathMatch: 'full' },
  { path: 'opportunity', component: OpportunityComponent },
  { path: 'tasks', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
