import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private poNotification: PoNotificationService) { }

  async login(username: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(username, password)
    } catch (err: any) {
      console.log(err)
      this.poNotification.error(err)
      return

    }
  }
}
