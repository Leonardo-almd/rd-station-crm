import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { OpportunityComponent } from 'src/app/opportunity/components/opportunity.component';
import { TasksComponent } from 'src/app/tasks/components/list/tasks.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private poNotification: PoNotificationService,
    private router: Router,
    private auth: AngularFireAuth
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.router.config.unshift({
          path: 'opportunity',
          loadChildren: () => import('../../opportunity/opportunity.module').then((m) => m.OpportunityModule)
        },
        {
          path: 'tasks',
          loadChildren: () => import('../../tasks/tasks.module').then((m) => m.TasksModule)
        });
        this.router.navigate(['opportunity']);
      } else {
        const indexOpportunity = this.router.config.findIndex((route) => route.path === 'opportunity');
        const indexTask = this.router.config.findIndex((route) => route.path === 'tasks');

        this.router.config.splice(indexOpportunity, 1);
        this.router.config.splice(indexTask, 1);
      }
    });
  }

  login() {
    console.log(this.form.value);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.form.value.username, this.form.value.password)
      .then((userCredential) => {
        this.poNotification.success('Login feito com sucesso')
        this.router.navigate(['opportunity'])
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.poNotification.error(errorMessage)
      });
  }
}
