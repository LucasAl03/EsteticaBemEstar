import { Routes } from '@angular/router';

import { Menu } from './app/Component/menu/menu';
import { HomeComponent } from './app/Component/home-component/home-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
