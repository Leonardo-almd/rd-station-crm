import { Component, ViewChild } from '@angular/core';
import { PoDialogService, PoModalAction, PoModalComponent, PoSelectOption } from '@po-ui/ng-components';
import { TasksComponent } from '../tasks.component';
import { TasksService } from '../services/tasks.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @ViewChild('modal', { static: true }) poModal?: PoModalComponent;

  types: PoSelectOption[] = [
    {label: 'Ligação', value: 'call'},
    {label: 'E-mail', value: 'email'},
    {label: 'Reunião', value: 'meeting'},
    {label: 'Tarefa', value: 'task'},
    {label: 'Almoço', value: 'lunch'},
    {label: 'Visita', value: 'visit'},
    {label: 'WhatsApp', value: 'whatsapp'},
  ];

  form;


  constructor(private poDialog: PoDialogService, private service: TasksService, private formBuilder: FormBuilder) {
    // this.poModal = poDialog.modal
    this.form = this.formBuilder.group({
      deal_id: new FormControl(),
      type: new FormControl(),
      subject: new FormControl(),
      date: new FormControl(),
      notes: new FormControl()
    });
  }

  ngOnInit () {
    this.form.valueChanges.subscribe((newValue) => {
      console.log(newValue)
      if(newValue.date.length>0 && newValue.type.length>0
         && newValue.subject.length>0 && newValue.deal_id.length>0) {
          this.onPrimaryAction.disabled = false
         } else {
          this.onPrimaryAction.disabled = true
         }
    });
  }

  title = 'Criar Tarefa'
  open(opportunity:any) {
    this.form.patchValue({
      deal_id: opportunity.id,
      date: '',
      type: '',
      subject: '',
      notes: ''
    });
    if(this.form.value.deal_id = opportunity.id) {
      this.poModal?.open();
    }


  }


    // PoModalAction
  readonly onPrimaryAction: PoModalAction = {

    action: () => {
      const payload = {
        ...this.form.value,
        user_ids: ['626a92080b9dd9000c709b95']
      }
      console.log(payload)

      // this.service.createTask(payload)
      this.poModal?.close();
    },
    label: 'Criar',
    disabled: true

  };

//  PoModalAction
  readonly onSecondaryAction: any = {
    action: () => {
      this.poModal?.close();

    },
    label: 'Cancelar'
  };
}