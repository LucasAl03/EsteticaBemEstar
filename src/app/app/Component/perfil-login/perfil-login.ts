
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SessaoService } from '../../Service/SessaoService/sessao-service';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';
import { FuncionarioService } from '../../Service/FuncionarioService/funcionario-service';
import { EnderecoService } from '../../Service/EnderecoService/endereco-service';

import { Pessoa } from '../../Models/Pessoa';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';
import { Endereco } from '../../Models/Endereco';

@Component({
  imports: [FormsModule],
  selector: 'app-perfil-login',
  styleUrl: './perfil-login.css',
  templateUrl: './perfil-login.html',
})
export class PerfilLogin implements OnInit {

  constructor(public sessao: SessaoService, private pessoaService: PessoaService, private funcionarioService: FuncionarioService, private enderecoService: EnderecoService, private router: Router, private cdr: ChangeDetectorRef) {}

  perfil: Pessoa | PessoaFuncionario | null = null;

  editando = false;
  carregando = false;
  salvando = false;

  ngOnInit(): void {
    this.carregaPerfil();
    if(!this.sessao.sessao()){
      this.router.navigate(['/home'])
    }
  }

  carregaPerfil(): void {
    const idPessoa = this.sessao.sessao()?.idPessoa;

    if (!idPessoa) {
      console.log('Não foi possível identificar a pessoa logada.');
      return;
    }

    this.carregando = true;

    if (this.sessao.ehFuncionario()) {
      this.funcionarioService.listarFuncioanrio(idPessoa).subscribe({
        next: (dados) => {
          this.perfil = dados;
          this.carregando = false;
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.log('Erro ao carregar o perfil do funcionário', erro);
          this.carregando = false;
        }
      });

    } else {
      this.pessoaService.listarPessoa(idPessoa).subscribe({
        next: (dados) => {
          this.perfil = dados;
          this.carregando = false;
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.log('Erro ao carregar o perfil do cliente', erro);
          this.carregando = false;
        }
      });
    }
  }

  salvarPerfil(): void {
    if (!this.perfil) return;

    this.salvando = true;

    if (this.sessao.ehFuncionario()) {
      this.funcionarioService.alterarFuncionario(
        this.perfil as PessoaFuncionario
      ).subscribe({
        next: (dados) => {
          this.perfil = dados;
          this.editando = false;
          this.salvando = false;
          this.cdr.detectChanges();
          alert('Perfil atualizado com sucesso!');
          
        },
        error: (erro) => {
          console.log('Erro ao atualizar o perfil do funcionário', erro);
          this.salvando = false;
          alert('Não foi possível atualizar o perfil.');
        }
      });

    } else {
      this.pessoaService.alterarPessoa(
        this.perfil as Pessoa
      ).subscribe({
        next: (dados) => {
          this.perfil = dados;
          this.editando = false;
          this.salvando = false;
          this.cdr.detectChanges();
          alert('Perfil atualizado com sucesso!');
        },
        error: (erro) => {
          console.log('Erro ao atualizar o perfil do cliente', erro);
          this.salvando = false;
          alert('Não foi possível atualizar o perfil.');
        }
      });
    }
  }
  
  novoEnd(): void {
    if (!this.perfil) return;

    this.router.navigate(['/endereco-cadastro'], {
      queryParams: { idPessoa: this.perfil.idPessoa }
    });
  }

  buscaIdEnd(e: Endereco): void {
    this.router.navigate(['/endereco-cadastro', e.idEndereco]);
  }

  excluirEnd(e: Endereco): void {
    if (confirm('Certeza que deseja excluir este endereço?')) {
      this.enderecoService.excluirEndereco(e.idEndereco).subscribe({
        next: () => {
          alert('Endereço excluído com sucesso!');
          this.carregaPerfil();
        },
        error: (erro) => {
          console.log('Erro ao excluir o endereço', erro);
          alert('Não foi possível excluir o endereço.');
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.editando = false;
    this.carregaPerfil();
  }
}
