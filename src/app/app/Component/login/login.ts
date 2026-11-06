import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Pessoa } from '../../Models/Pessoa';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';
import { FuncionarioService } from '../../Service/FuncionarioService/funcionario-service';
import { SessaoService } from '../../Service/SessaoService/sessao-service';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html', 
})
export class Login implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private router: Router, private pessoaService: PessoaService, private funcionarioService: FuncionarioService, private sessaoService: SessaoService) {}

  cpfLogin = '';
  erroLogin = '';
  carregando = true;

  pessoa: Pessoa[] = [];
  funcionariop: PessoaFuncionario[] = [];

  ngOnInit() {
    this.carregaDados();
  }

  // Carrega clientes e funcionários juntos: o botão só libera quando os dois chegaram
  carregaDados() {
    forkJoin({
      pessoas: this.pessoaService.listarPessoas(),
      funcionarios: this.funcionarioService.listarFuncionarios(),
    }).subscribe({
      next: ({ pessoas, funcionarios }) => {
        this.pessoa = pessoas;
        this.funcionariop = funcionarios.filter((f) => f.funcionario);
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.log('Erro ao carregar os dados do login', erro);
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

    // 1º procura entre os funcionários
    const func = this.funcionariop.find(
      (f) => this.somenteNumeros(f.cpf) === cpf
    );

    // 2º se não for funcionário, procura entre os clientes
    const cliente = func
      ? undefined
      : this.pessoa.find((p) => this.somenteNumeros(p.cpf) === cpf);

    const encontrada = func ?? cliente;

    if (!encontrada) {
      this.erroLogin = 'CPF não cadastrado.';
      return;
    }

    if (encontrada.ativoPessoa === 'N') {
      this.erroLogin = 'Este cadastro está desativado.';
      return;
    }

    this.erroLogin = '';

    // Salva a sessão (storage + signal) para o menu e os guards lerem
    this.sessaoService.iniciarSessao({
      idPessoa: encontrada.idPessoa,
      nome: encontrada.nome,
      funcionario: !!func,
      cargo: func?.funcionario?.cargo ?? null,
    });

    this.router.navigate(['/home']);
  }

  limparCampos() {
    this.cpfLogin = '';
    this.erroLogin = '';
  }

  cadastroBtn() {
    this.router.navigate(['/cadastro'], { state: { origem: 'login' } });
  }
}