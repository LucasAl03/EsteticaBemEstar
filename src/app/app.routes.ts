import { Routes } from '@angular/router';

import { HomeComponent } from './app/Component/home-component/home-component';
import { Cadastro } from './app/Component/cadastro/cadastro';
import { CadastroFuncionario } from './app/Component/administrador/Funcionario/cadastro-funcionario/cadastro-funcionario';
import { EntradaProduto } from './app/Component/administrador/entrada-produto/entrada-produto';
import { Servicos } from './app/Component/Servico/servicos';
import { Funcionario } from './app/Component/administrador/Funcionario/funcionario/funcionario';
import { Clientes } from './app/Component/administrador/clientes/clientes';
import { CadastroCategoria } from './app/Component/administrador/cadastro-categoria/cadastro-categoria';
import { ListaProdutos } from './app/Component/Produtos/lista-produtos/lista-produtos';
import { CadastroProdutos } from './app/Component/Produtos/cadastro-produtos/cadastro-produtos';
import { EnderecoCadastro } from './app/Component/endereco-cadastro/endereco-cadastro';
import { PedidosComponent } from './app/Component/pedidos-component/pedidos-component';
import { CarrinhoComponent } from './app/Component/carrinho-component/carrinho-component';
import { Login } from './app/Component/login/login';
import { EditarPedidos } from './app/Component/editar-pedidos/editar-pedidos';
import { PerfilLogin } from './app/Component/perfil-login/perfil-login';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
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
        path: 'cadastro/:idPessoa',
        component: Cadastro
    },
    {
        path: 'cadastro-funcionario',
        component: CadastroFuncionario
    },
    {
        path: 'cadastro-funcionario/:idPessoa',
        component: CadastroFuncionario
    },
    {
        path: 'entrada',
        component: EntradaProduto
    },
    {
        path: 'entrada/:idEntradaProduto',
        component: EntradaProduto
    },
    {
        path: 'servicos',
        component: Servicos
    },
    {
        path: 'funcionario-lista',
        component: Funcionario
    },
    {
        path: 'lista-cliente',
        component: Clientes
    },
    {
        path: 'categoria-cadastra',
        component: CadastroCategoria
    },
    {
        path: 'categoria-cadastra/:idCategoria',
        component: CadastroCategoria
    },
    {
        path: 'lista-produtos',
        component: ListaProdutos
    },
    {
        path: 'cadastro-produto',
        component: CadastroProdutos
    },
    {
        path: 'cadastro-produto/:idItem',
        component: CadastroProdutos
    },
    {
        path: 'endereco-cadastro',
        component: EnderecoCadastro
    },
    {
        path: 'endereco-cadastro/:idEndereco',
        component: EnderecoCadastro
    },
    {
        path: 'pedido-component',
        component: PedidosComponent
    },
    {
        path: 'carrinho-component',
        component: CarrinhoComponent
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'editar-pedidos',
        component: EditarPedidos
    },
        {
        path: 'editar-pedidos/:idAtendimento',
        component: EditarPedidos
    },
    {
        path: 'perfil-login',
        component: PerfilLogin
    }
];
