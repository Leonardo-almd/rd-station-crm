import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PoButtonModule } from '@po-ui/ng-components';
import { AppComponent } from './app.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { PoPageModule } from '@po-ui/ng-components';
import { PoDynamicModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoImageModule } from '@po-ui/ng-components';
import { PoDividerModule } from '@po-ui/ng-components';
import { PoLoadingModule } from '@po-ui/ng-components';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { FormComponent } from './tasks/form/form.component';
import { PoDisclaimerGroupModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [
    AppComponent,
    OpportunityComponent,
    TasksComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    PoButtonModule,
    PoPageModule,
    PoDynamicModule,
    HttpClientModule,
    PoFieldModule,
    PoModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    PoImageModule,
    PoDividerModule,
    PoLoadingModule,
    ReactiveFormsModule,
    PoPageDynamicTableModule,
    PoDisclaimerGroupModule,
    PoNotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
