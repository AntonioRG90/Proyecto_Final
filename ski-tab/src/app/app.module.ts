import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { IsActivePipe } from './pipes/isActive/is-active.pipe';
import { RolePipe } from './pipes/role/role.pipe';
import { AsideNavbarComponent } from './components/aside-navbar/aside-navbar.component';
import { CreateCompetitionComponent } from './components/create-competition/create-competition.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, DateAdapter, MatNativeDateModule  } from '@angular/material/core';
import { CustomDateAdapter } from './others/custom-date-adapter';
import { FormatDatePipe } from './pipes/format-date/format-date.pipe';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SettingsComponent,
    UsersComponent,
    SettingsCompetitionsComponent,
    CustomSnackbarComponent,
    IsActivePipe,
    RolePipe,
    AsideNavbarComponent,
    CreateCompetitionComponent,
    FormatDatePipe,
    CreateCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [
    CookieService,
    JwtHelperService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: JWT_OPTIONS, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }