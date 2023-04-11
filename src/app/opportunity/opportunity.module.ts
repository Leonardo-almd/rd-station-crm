import { NgModule } from '@angular/core';
import { OpportunityComponent } from './components/opportunity.component';
import { OpportunityRoutingModule } from './opportunity-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PoPageModule } from '@po-ui/ng-components';
import { PoLoadingModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoDividerModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [OpportunityComponent],
  imports: [
    OpportunityRoutingModule,
    PoPageModule,
    PoLoadingModule,
    PoFieldModule,
    PoButtonModule,
    PoDividerModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class OpportunityModule { }
