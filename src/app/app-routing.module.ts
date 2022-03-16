import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

// Components
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { AreasComponent } from './components/areas/areas.component';
import { CropsComponent } from './components/crops/crops.component';
import { EncyclopediaComponent } from './components/encyclopedia/encyclopedia.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["auth"]);
const redirectToLogin = () => redirectLoggedInTo(["home"]);
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectToLogin },
    component:AuthComponent
  },
  {
    path: 'home',
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin },
    component:HomeComponent
  },
  {
    path: 'areas',
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin },
    component:AreasComponent
  },
  {
    path: 'crops',
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin },
    component:CropsComponent
  },
  {
    path: 'encyclopedia',
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin },
    component:EncyclopediaComponent
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
