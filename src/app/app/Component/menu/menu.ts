import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SessaoService } from '../../Service/SessaoService/sessao-service';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';
import { Pessoa } from '../../Models/Pessoa';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  constructor(public sessao: SessaoService, private router: Router) {}

  sair() {
    this.sessao.encerrarSessao();
    // replaceUrl evita que o botão Voltar retorne a uma página da sessão encerrada
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}