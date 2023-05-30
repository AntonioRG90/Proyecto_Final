import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { SettingsCompetitionsComponent } from './components/settings-competitions/settings-competitions.component';
import { userGuard } from './guards/user/user.guard';
import { loginOkGuard } from './guards/loginOk/login-ok.guard';
import { adminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [loginOkGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [userGuard], children: [
    {path: 'users', component: UsersComponent, canActivate: [adminGuard]},
    {path: 'competitions', component: SettingsCompetitionsComponent, canActivate: [userGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
