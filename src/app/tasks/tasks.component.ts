import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  items:any[]=[]

  readonly columns: Array<any> = [
    { property: 'name', label: 'Oportunidade' },
    { property: 'organization.name', label: 'Empresa'},
    {  property: 'deal_stage.name', label: 'Status'},
    {  property: 'user.name', label: 'Usuário'},
    {
      property: '',
      label: 'Ação',
      type: 'icon',
      sortable: false,
      icons: [
        {
          action: this.test.bind(this),
          // disabled: this.canGoToDocumentation.bind(this),
          icon: 'po-icon-export',
          tooltip: 'Criar tarefa para a oportunidade',
        }
      ]
    }
  ];

  constructor(private service: TasksService) {}

  ngOnInit() {
    this.mapToSelectItems()

  }

  private test(ev:any):void {
    console.log(ev)
    alert('teste')
  }

  private mapToSelectItems(): void {
    this.service.getOpportunity().subscribe((data) => {
      data.deals.map((item: any) =>
        this.items.push(item)
      );
    });
  }

}
