import { Component } from '@angular/core';
import {
  PoComboOption,
  PoDynamicFormField,
  PoDynamicFormFieldChanged,
  PoDynamicFormValidation,
  PoDynamicModule,
  PoNotificationService,
  PoSelectOption,
} from '@po-ui/ng-components';
import { OpportunityService } from './service/opportunity.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { interval } from 'rxjs';
import { environment } from '../environments/environments';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss'],
})
export class OpportunityComponent {
  form;
  defaultFormValue;
  contacts: PoSelectOption[] = [];
  funnel: PoSelectOption[] = [];
  funnelStep: PoSelectOption[] = [];
  sources: PoSelectOption[] = [];
  organizations: PoSelectOption[] = [];
  importLoading = false;
  disable = true;
  campaigns: PoSelectOption[] = [];

  constructor(
    private service: OpportunityService,
    private formBuilder: FormBuilder,
    private poNotification: PoNotificationService
  ) {
    this.form = this.formBuilder.group({
      deal: new FormControl(),
      funnel: new FormControl(),
      funnelStep: new FormControl(),
      campaign: new FormControl(),
      contacts: new FormControl(),
      deal_source: new FormControl(),
      organization: new FormControl(),
    });
    this.defaultFormValue = this.form.value
  }

  ngOnInit() {
    this.mapToSelectAll();
    const subscription = interval(1000).subscribe(() => {
      if (this.contacts.length>0 && this.organizations.length>0) {
        this.importLoading = true;
        subscription.unsubscribe();
      }
    });
    subscription
    this.form.valueChanges.subscribe((newValue) => {
      console.log(newValue);
      if (
        newValue.deal?.length > 0 &&
        newValue.funnel !== null &&
        newValue.funnelStep !== null &&
        newValue.campaign !== null &&
        newValue.deal_source !== null &&
        newValue.organization !== null
      ) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    });
  }

  public onButtonClick() {
    const payload = {
      ...this.form.value,
      campaign: {_id: this.form.value.campaign?._id},
      organization: {_id: this.form.value.organization?._id},
      deal_source: {_id: this.form.value.deal_source?._id},
      deal: {
        name: this.form.value.deal,
        user_id: environment.user_id,
        deal_stage_id: this.form.value.funnelStep?.id
      }
    }
    delete payload.funnel
    delete payload.funnelStep
    console.log(payload)
    try {
    // this.service.createOpportunity(payload)
    this.poNotification.success('Oportunidade criada com sucesso')
    this.form.reset(this.defaultFormValue)

    } catch (error: any) {
      this.poNotification.error(error)

    }
  }

  public mapToSelectAll(): void {
    this.service.getContacts().subscribe((data) => {
      const pages = data.length-1
      for (let i = 0; i <= pages; i++) {
        data[i].contacts.map((item: any) =>
        this.contacts.push({ label: item.name, value: item })
      );
      }

    });
    this.service.getFunnel().subscribe((data) => {
      data.map((item: any) =>
        this.funnel.push({ label: item.name, value: item })
      );
    });
    this.service.getSource().subscribe((data) => {
      data.deal_sources.map((item: any) =>
        this.sources.push({ label: item.name, value: item })
      );
    });
    this.service.getOrganizations().subscribe((data: any) => {
      const pages = data.length-1
      for (let i = 0; i <= pages; i++) {
        data[i].organizations.map((item: any) =>
          this.organizations.push({ label: item.name, value: item })
        );
      }
    });
    this.service.getCampaigns().subscribe((data) => {
      data.campaigns.map((item: any) =>
        this.campaigns.push({ label: item.name, value: item })
      );
    });
  }

  public addFunnelStep(funnel: any): void {
    funnel.deal_stages.map((f: any) => {
      this.funnelStep.push({ label: f.name, value: f });
    });
  }

}
