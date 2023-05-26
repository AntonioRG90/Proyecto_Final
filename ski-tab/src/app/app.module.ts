import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth/';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { CookieService } from 'ngx-cookie-service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { SettingsCompetitionsComponent } from './components/settings-competitions/settings-competitions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SettingsComponent,
    UsersComponent,
    SettingsCompetitionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
