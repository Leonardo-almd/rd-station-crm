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
import { OpportunityService } from '../../core/services/opportunity.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { interval } from 'rxjs';
import { environment } from '../../environments/environments';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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
  users: PoSelectOption[] = []
  importLoading = false;
  disable = true;
  campaigns: PoSelectOption[] = [];

  constructor(
    private service: OpportunityService,
    private formBuilder: FormBuilder,
    private poNotification: PoNotificationService,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      deal: new FormControl(),
      funnel: new FormControl(),
      funnelStep: new FormControl(),
      campaign: new FormControl(),
      contacts: new FormControl(),
      deal_source: new FormControl(),
      organization: new FormControl(),
      user: new FormControl()
    });
    this.defaultFormValue = this.form.value;
  }

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
      } else {
        this.router.navigate(['login']);
      }
    });
    this.mapToSelectAll();
    const subscription = interval(1000).subscribe(() => {
      if (this.contacts.length > 0 && this.organizations.length > 0) {
        this.importLoading = true;
        subscription.unsubscribe();
      }
    });
    subscription;
    this.form.valueChanges.subscribe((newValue) => {
      console.log(newValue);
      if (
        newValue.deal?.length > 0 &&
        newValue.funnel !== null &&
        newValue.funnelStep !== null &&
        newValue.campaign !== null &&
        newValue.deal_source !== null &&
        newValue.organization !== null &&
        newValue.user !== null
      ) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    });
  }

  public onButtonClick() {
    console.log(this.form.value)
    const payload = {
      ...this.form.value,
      campaign: { _id: this.form.value.campaign?._id },
      organization: { _id: this.form.value.organization?._id },
      deal_source: { _id: this.form.value.deal_source?._id },
      deal: {
        deal_custom_fields: [],
        rating: 1,
        name: this.form.value.deal,
        user_id: this.form.value.user._id,
        deal_stage_id: this.form.value.funnelStep?.id,
      },
      deal_products: []
    };
    delete payload.funnel;
    delete payload.funnelStep;
    delete payload.user;
    console.log(payload);
    try {
      this.service.createOpportunity(payload).subscribe({
        next: res => {
          this.poNotification.success('Oportunidade cadastrada com sucesso')
        },
        error: err => {
          this.poNotification.error('Erro ao cadastrar oportunidade')
          console.log(err)
        }
      }
      )
      this.form.reset(this.defaultFormValue);
    } catch (error: any) {
      this.poNotification.error(error);
    }
  }

  public mapToSelectAll(): void {
    this.service.getContacts().subscribe((data) => {
      const pages = data.length - 1;
      for (let i = 0; i <= pages; i++) {
        data[i].contacts.map((item: any) => {
          const result: any = {
          birthday: item.birthday,
          emails: item.emails.map((email: any) => {email.email}),
          facebook: item.facebook,
          legal_bases: item.legal_bases,
          linkedin: item.linkedin,
          name: item.name,
          phones: item.phones.map((phone: any) => {
            return {
            phone: phone.phone,
            type: phone.type
          }
          }) ,
          skipe: item.skipe,
          title: item.title
        }
          this.contacts.push({ label: result.name, value: result })
        }

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
      const pages = data.length - 1;
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
    this.service.getUsers().subscribe((data) => {
      data.users.map((item: any) =>
      this.users.push({label: item.name, value: item})
      )
    })
  }

  public addFunnelStep(funnel: any): void {
    funnel.deal_stages.map((f: any) => {
      this.funnelStep.push({ label: f.name, value: f });
    });
  }
}
