import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private auth: AngularFireAuth) {

  }
  loading:boolean = true
  menus:any[]=[]

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.menus = [
          { label: 'Criar oportunidades', action: () => this.router.navigate(['opportunity']) },
          { label: 'Criar tarefas', action: () => this.router.navigate(['tasks']) }
        ];
      } else {
        this.menus=[]
      }
    });
  }

}
