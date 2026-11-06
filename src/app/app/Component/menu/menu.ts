import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SessaoService } from '../../Service/SessaoService/sessao-service';
import { CarrinhoService } from '../../Service/CarrinhoService/carrinho-service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  constructor(public sessao: SessaoService, private router: Router) {}

  sair() {
    // limpa o carrinho
    this.carrinho.limpar();
    // encerra a sessao
    this.sessao.encerrarSessao();
    // Apaga o carrinho da sessionStorage e localStorage
    localStorage.removeItem('carrinho');
    sessionStorage.removeItem('carrinho');
    // replaceUrl evita que o botão Voltar retorne a uma página da sessão encerrada
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  carrinho = inject(CarrinhoService)
}