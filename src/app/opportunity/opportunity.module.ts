import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { OpportunityComponent } from './components/opportunity.component';
import { OpportunityRoutingModule } from './opportunity-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [OpportunityComponent],
  imports: [
    OpportunityRoutingModule,
    PoModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class OpportunityModule { }
