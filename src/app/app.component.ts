import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {

  }
  loading:boolean = true

  readonly menus: Array<PoMenuItem> = [
    { label: 'Oportunidades', action: () => this.router.navigate(['opportunity']) },
    { label: 'Tarefas', action: () => this.router.navigate(['tasks']) }
  ];



  public onClick() {
    alert('Clicked in menu item')
  }

}