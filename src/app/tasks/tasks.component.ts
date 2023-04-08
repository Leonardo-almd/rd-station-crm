import { Component, ViewChild } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { FormComponent } from './form/form.component';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { PoDisclaimer, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @ViewChild(FormComponent, { static: true }) formModal:
    | FormComponent
    | undefined;

  items: any[] = [];
  form;
  disclaimer: PoDisclaimer[] = []
  loading = false

  readonly columns: Array<any> = [
    { property: 'name', label: 'Oportunidade' },
    { property: 'organization.name', label: 'Empresa' },
    { property: 'deal_stage.name', label: 'Status' },
    { property: 'user.name', label: 'Usuário' },
    { property: 'created_at' , label: 'Data' },
    {
      property: '',
      label: 'Ação',
      type: 'icon',
      sortable: false,
      icons: [
        {
          action: this.onEditRow.bind(this),
          icon: 'po-icon-export',
          tooltip: 'Criar tarefa para a oportunidade',
          // disabled: row => row.erpStatus !== 'ERROR'
        },
      ],
    },
  ];

  constructor(private service: TasksService, private formBuilder: FormBuilder, private poNotification: PoNotificationService) {
    this.form = this.formBuilder.group({
      search: new FormControl(),
    });
  }

  ngOnInit() {
    this.mapToSelectItems();
  }

  onEditRow(objectId: any) {
    if (this.formModal) {
      this.formModal.open(objectId);
    }
  }

  formatedDate(date: any) {
    const data = new Date(date);
const dia = String(data.getDate()).padStart(2, '0');
const mes = String(data.getMonth() + 1).padStart(2, '0');
const ano = data.getFullYear();
const dataFormatada = `${dia}/${mes}/${ano}`;
return dataFormatada

  }

  public mapToSelectItems(search: any = null): any {
    if (search?.length > 0) {
      this.items = [];
      this.disclaimer = []
this.loading = false
      this.service.getOpportunity().subscribe((data) => {
        data.deals.filter((item: any) => {
          item.created_at = this.formatedDate(item.created_at)
            if (item.name?.toLowerCase().includes(search.toLowerCase())) this.items.push(item);
            if (item.organization?.name?.toLowerCase().includes(search.toLowerCase())) this.items.push(item);
            if (item.deal_stage?.name?.toLowerCase().includes(search.toLowerCase())) this.items.push(item);
            if (item.user?.name?.toLowerCase().includes(search.toLowerCase())) this.items.push(item);
            if (item.created_at?.toLowerCase().includes(search.toLowerCase())) this.items.push(item);


        });
      });
      this.form.patchValue({
        search: ''
      });
      this.disclaimer = [{label: search, value: search}]
      setTimeout(()=>{
        this.loading = true
      }, 2000)

    } else  {
      this.items = []
      this.disclaimer = []
      this.loading = false
      this.service.getOpportunity().subscribe((data) => {

        data.deals.map((item: any) => {
          item.created_at = this.formatedDate(item.created_at)
          this.items.push(item)
        } );
      });
      setTimeout(()=>{
        this.loading = true
      }, 2000)
    }
  }
}