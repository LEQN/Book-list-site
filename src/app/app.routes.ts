import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
    {path: 'home', component:HomeComponent, title:'Home'},
    {path: 'search', component:SearchComponent, title:'Search'},
    {path: 'list', component:ListComponent, title:'My List'},
    {path: '', redirectTo:'/home', pathMatch:'full'}
];
