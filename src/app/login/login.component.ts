import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username?: string;
  password?: string;

  login() {
    if (this.username === 'usuario' && this.password === 'senha') {
      alert('Login realizado com sucesso!');
    } else {
      alert('Usuário ou senha incorretos!');
    }
  }
}
