import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { LoginComponent } from './components/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    PoFieldModule,
    PoButtonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
