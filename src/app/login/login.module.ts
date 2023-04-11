import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { LoginComponent } from './components/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    PoModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
