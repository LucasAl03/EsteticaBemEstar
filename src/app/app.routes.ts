import { Routes } from '@angular/router';

import { HomeComponent } from './app/Component/home-component/home-component';
import { Cadastro } from './app/Component/cadastro/cadastro';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'cadastro',
        component: Cadastro
    }
];
