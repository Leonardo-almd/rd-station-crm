import { Component } from '@angular/core';
import {
  PoComboOption,
  PoDynamicFormField,
  PoDynamicFormFieldChanged,
  PoDynamicFormValidation,
  PoDynamicModule,
  PoSelectOption,
} from '@po-ui/ng-components';
import { OpportunityService } from './service/opportunity.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss'],
})
export class OpportunityComponent {
  form = this.formBuilder.group({
    nameDeal: new FormControl(),
    funnel: new FormControl(),
    funnelStep: new FormControl(),
    campanha: new FormControl(),
    contact: new FormControl(),
    source: new FormControl(),
    organization: new FormControl(),
  });
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.mapToSelectAll();
    setTimeout(() => {
      this.importLoading = true;
    }, 2500);
    this.form.valueChanges.subscribe((newValue) => {
      console.log(newValue);
      if (
        newValue.nameDeal?.length > 0 &&
        newValue.funnel !== null &&
        newValue.funnelStep !== null &&
        newValue.campanha?.length > 0 &&
        newValue.source !== null &&
        newValue.organization !== null
      ) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    });
  }

  public onButtonClick() {
    console.log('po-ui');
    console.log(this.form.value);
  }

  public mapToSelectAll(): void {
    this.service.getContacts().subscribe((data) => {
      data.contacts.map((item: any) =>
        this.contacts.push({ label: item.name, value: item })
      );
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
    this.service.getOrganization().subscribe((data) => {
      console.log(data);
      data.organizations.map((item: any) =>
        this.organizations.push({ label: item.name, value: item })
      );
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

  onChangeFields(changedValue: PoDynamicFormFieldChanged): void {
    console.log('teste');
    console.log(changedValue);
  }

  onLoadFields(value: any) {
    console.log('teste');
    console.log(value);
  }
}
