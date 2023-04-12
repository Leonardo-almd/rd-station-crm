import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './components/list/tasks.component';
import { FormComponent } from './components/form/form.component';
import { PoModalModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoPageModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoDisclaimerGroupModule } from '@po-ui/ng-components';
import { PoTableModule } from '@po-ui/ng-components';
import { PoLoadingModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [TasksComponent, FormComponent],
  imports: [
    TasksRoutingModule,
    PoModalModule,
    PoFieldModule,
    ReactiveFormsModule,
    PoPageModule,
    PoButtonModule,
    PoDisclaimerGroupModule,
    PoTableModule,
    PoLoadingModule,
    PoModule
  ]
})
export class TasksModule { }
