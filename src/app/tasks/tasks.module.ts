import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './components/list/tasks.component';
import { FormComponent } from './components/form/form.component';



@NgModule({
  declarations: [TasksComponent, FormComponent],
  imports: [
    TasksRoutingModule,
    PoModule,
    ReactiveFormsModule,
  ]
})
export class TasksModule { }
