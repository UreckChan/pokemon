import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { HomeComponent } from './pages/home/home.component';
import { TipoComponent } from './pages/tipo/tipo.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: 'pokemon',
    component: PokemonComponent
  },
  {
    path: 'tipo',
    component: TipoComponent
  },  
  {
    path: 'home',
    component: HomeComponent
  },  
  {
    path: 'about',
    component: AboutComponent
  },  
  {
    path: '**',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
