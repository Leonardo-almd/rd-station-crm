import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule} from '@angular/fire/compat'
import { environment } from './environments/environments';
import { PoToolbarModule } from '@po-ui/ng-components';
import { PoMenuModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PoMenuModule,
    PoToolbarModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
