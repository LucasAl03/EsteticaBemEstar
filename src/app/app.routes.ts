import { Routes } from '@angular/router';

import { HomeComponent } from './app/Component/home-component/home-component';
import { Cadastro } from './app/Component/cadastro/cadastro';
import { CadastroFuncionario } from './app/Component/cadastro-funcionario/cadastro-funcionario';
import { EntradaProduto } from './app/Component/entrada-produto/entrada-produto';
import { Servicos } from './app/Component/Servico/servicos/servicos';

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
    },
    {
        path: 'cadastro-funcionario',
        component: CadastroFuncionario
    },
    {
        path: 'entrada',
        component: EntradaProduto
    },
    {
        path: 'servicos',
        component: Servicos
    }
];
