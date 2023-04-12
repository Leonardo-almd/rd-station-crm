import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, ViewChild } from '@angular/core';
import {
  PoDialogService,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoSelectOption,
} from '@po-ui/ng-components';
import { TasksService } from '../../../core/services/tasks.service';
import {
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @ViewChild('modal', { static: true }) poModal?: PoModalComponent;

  types: PoSelectOption[] = [
    { label: 'Ligação', value: 'call' },
    { label: 'E-mail', value: 'email' },
    { label: 'Reunião', value: 'meeting' },
    { label: 'Tarefa', value: 'task' },
    { label: 'Almoço', value: 'lunch' },
    { label: 'Visita', value: 'visit' },
    { label: 'WhatsApp', value: 'whatsapp' },
  ];

  form;
  defaultFormValue;
  users: PoSelectOption[] = [];

  constructor(
    private poDialog: PoDialogService,
    private service: TasksService,
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
    private poNotification: PoNotificationService
  ) {
    this.service.getUsers().subscribe((data) => {
      data.users.map((item: any) =>
        this.users.push({ label: item.name, value: item._id })
      );
    });
    this.form = this.formBuilder.group({
      deal_id: new FormControl(),
      type: new FormControl(),
      subject: new FormControl(),
      date: new FormControl(),
      notes: new FormControl(),
      user: new FormControl(),
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
    this.form.valueChanges.subscribe((newValue) => {
      console.log(newValue);
      if (
        (newValue.date !== null ? newValue.date.length > 0 : false) &&
        (newValue.type !== null ? newValue.type.length > 0 : false) &&
        (newValue.subject !== null ? newValue.subject.length > 0 : false) &&
        // newValue.deal_id!== null &&
        (newValue.user !== null ? newValue.user.length > 0 : false)
      ) {
        this.onPrimaryAction.disabled = false;
      } else {
        this.onPrimaryAction.disabled = true;
      }
    });
  }

  title = 'Criar Tarefa';

  open(opportunity: any) {
    // this.form?.reset(this.defaultFormValue);
    this.form.patchValue({
      deal_id: opportunity.id,
      date: null,
      type: null,
      user: null,
      subject: null,
      notes: null,
    });
    if ((this.form.value.deal_id = opportunity.id)) {
      this.poModal?.open();
    }
  }

  // PoModalAction
  readonly onPrimaryAction: PoModalAction = {
    action: () => {
      const payload = {
        ...this.form.value,
        user_ids: this.form.value.user,
      };
      delete payload.user;
      console.log(payload);
      this.service.createTask(payload).subscribe({
        next: (res) => {
          console.log(res)
          this.poNotification.success('Tarefa cadastrada com sucesso');
          this.poModal?.close();
        },
        error: (err) => {
          this.poNotification.error('Erro ao cadastrar tarefa');
          console.log(err);
          this.poModal?.close();
        },
      });
    },
    label: 'Criar',
    disabled: true,
  };

  //  PoModalAction
  readonly onSecondaryAction: any = {
    action: () => {
      this.poModal?.close();
    },
    label: 'Cancelar',
  };
}
