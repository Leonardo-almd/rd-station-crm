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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss'],
})
export class OpportunityComponent {
  form = this.formBuilder.group({
    nameDeal: ['', [Validators.required]],
    funnel: ['', [Validators.required]],
    funnelStep: ['', [Validators.required]],
    campanha: ['', [Validators.required]],
    contact: ['']
  });
  contacts: PoSelectOption[] = [];
  funnel: PoSelectOption[] = [];
  funnelStep: PoSelectOption[] = [];
  sources: PoSelectOption[] = [];
  organizations: PoSelectOption[] = [];
  importLoading = false;

  constructor(private service: OpportunityService, private formBuilder: FormBuilder) {
  }



  ngOnInit() {
    this.mapToSelectContact();
    this.mapToSelectFunnel();
    this.mapToSelectSource();
    this.mapToSelectOrganization();
    // if(this.form.value.funnel){
    //   console.log('funil')
    //   this.mapToSelectFunnelStep(this.form.value.funnel)
    // }
    setTimeout(() => {
      this.importLoading = true;
    }, 2500);
  }

  public onButtonClick() {
    console.log('po-ui');
    console.log(this.form.value)

  }

  public mapToSelectContact(): void {
    this.service.getContacts().subscribe((data) => {
      data.contacts.map((item: any) =>
        this.contacts.push({ label: item.name, value: item })
      );
    });
  }

  private mapToSelectFunnel(): void {
    this.service.getFunnel().subscribe((data) => {
      data.map((item: any) =>
        this.funnel.push({ label: item.name, value: item })
      );
    });
  }

  private mapToSelectSource(): void {
    this.service.getSource().subscribe((data) => {
      data.deal_sources.map((item: any) =>
        this.sources.push({ label: item.name, value: item })
      );
    });
  }

  private mapToSelectOrganization(): void {
    this.service.getOrganization().subscribe((data) => {
      console.log(data)
      data.organizations.map((item: any) =>
        this.organizations.push({ label: item.name, value: item })
      );
    });
  }

  public addFunnelStep(funnel: any): void {
    console.log(funnel)
    funnel.deal_stages.map((f:any) => {
      this.funnelStep.push({ label: f.name, value: f})
    })
  }

  onChangeFields(changedValue: PoDynamicFormFieldChanged): void {
    console.log('teste')
    console.log(changedValue)
  }

  onLoadFields(value: any) {
    console.log('teste')
    console.log(value)
  }
}
