import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pessoa } from '../../Models/Pessoa';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private router: Router, private pessoaService: PessoaService){}

  cpfLogin = '';
  erroLogin = '';
  carregando = true;

  pessoa: Pessoa[] = [];

  ngOnInit() {
    this.carregaPessoas();
  }

  carregaPessoas() {
    this.pessoaService.listarPessoas().subscribe({
      next: (lista) => {
        this.pessoa = lista;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.log('Erro ao listar as pessoas', erro);
        this.carregando = false;
        this.erroLogin = 'Não foi possível verificar o CPF. Tente novamente.';
        this.cdr.detectChanges();
      },
    });
  }

  private somenteNumeros(valor: string): string {
    return (valor ?? '').replace(/\D/g, '');
  }

  entrar() {
    const cpf = this.somenteNumeros(this.cpfLogin);

    const encontrada = this.pessoa.find(
      (p) => this.somenteNumeros(p.cpf) === cpf
    );

    if (!encontrada) {
      this.erroLogin = 'CPF não cadastrado.';
      return;
    }

    if (encontrada.ativoPessoa === 'N') {
      this.erroLogin = 'Este cadastro está desativado.';
      return;
    }

    this.erroLogin = '';
    this.router.navigate(['/home'], {
      queryParams: { idPessoa: encontrada.idPessoa },
    });
  }

  limparCampos() {
    this.cpfLogin = '';
    this.erroLogin = '';
  }

  cadastroBtn() {
    this.router.navigate(['/cadastro'], { state: { origem: 'login' } });
  }
}

/*

*/
