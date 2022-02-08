import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { AreasComponent } from './components/areas/areas.component';
import { CropsComponent } from './components/crops/crops.component';
import { EncyclopediaComponent } from './components/encyclopedia/encyclopedia.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component:AuthComponent},
  {path: 'home', component:HomeComponent},
  {path: 'areas', component:AreasComponent},
  {path: 'crops', component:CropsComponent},
  {path: 'encyclopedia', component:EncyclopediaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
