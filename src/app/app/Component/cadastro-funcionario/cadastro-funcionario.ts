import {ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';
import { Endereco } from '../../Models/Endereco';
import { Funcionario } from '../../Models/Funcionario';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';


@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-funcionario',
  styleUrl: './cadastro-funcionario.css',
  templateUrl: './cadastro-funcionario.html',
})
export class CadastroFuncionario {
  constructor(private cdr: ChangeDetectorRef, private pessoaService: PessoaService, private route: ActivatedRoute){}

  // pessoa
  IdPessoa = 0
  Nome = ''
  CPF = ''
  DataNascimento = ''
  Sexo = ''
  Email = ''
  Telefone = ''

  // endereco
  Cep = ''
  Numero = ''
  Complemento = ''

  // cargo 
  Cargo = ''
  DataAdmissao = ''

  editar = false
  pessoaId = 0

  exibeDados(){
    console.log(this.IdPessoa, this.Nome, this.CPF, this.DataNascimento, this.Sexo, this.Email, this.Telefone, this.Cep, this.Numero, this.Complemento)

    this.limparCampos();
  }

  limparCampos(){
    this.Nome = ''
    this.CPF = ''
    this.DataNascimento = ''
    this.Sexo = ''
    this.Email = ''
    this.Telefone = ''

    this.Cep = ''
    this.Numero = ''
    this.Complemento = ''

    this.Cargo = ''
    this.DataAdmissao = ''
  }

  ngOnInit(){
    this.pessoaId = Number(this.route.snapshot.paramMap.get('IdPessoa'))

    if(this.pessoaId > 0){
      this.editar = true
      this.carregaCampo(this.pessoaId)
    }
  }

  carregaCampo(pessoaId: number){
    this.pessoaService.listarPessoa(pessoaId)
      .subscribe({
        next: (objPessoa) => {
          this.IdPessoa = objPessoa.IdPessoa
          this.Nome = objPessoa.Nome
          this.CPF = objPessoa.CPF
          this.DataNascimento = objPessoa.DataNascimento
          this.Sexo = objPessoa.Sexo
          this.Email = objPessoa.Email
          this.Telefone = objPessoa.Telefone

          this.cdr.detectChanges()
      }, error: (msgErro) =>{
        console.log("Erro ao listar pessoa", msgErro)
      }
      })
  }

  enviaDados(){
    const pessoa = new PessoaFuncionario()
    pessoa.Nome = this.Nome
    pessoa.CPF = this.CPF
    pessoa.DataNascimento = this.DataNascimento
    pessoa.Sexo = this.Sexo
    pessoa.Email = this.Email
    pessoa.Telefone = this.Telefone

    const endereco = new Endereco()
    endereco.Cep = this.Cep
    endereco.Numero = this.Numero
    endereco.Complemento = this.Complemento

    const funcionario = new Funcionario()
    funcionario.Cargo = this.Cargo
    funcionario.DataAdmissao = this.DataAdmissao

    pessoa.Enderecos = [endereco];
    pessoa.Funcionarios = [funcionario];

    if(!this.editar){
      this.pessoaService.cadastrarPessoa(pessoa)
        .subscribe({
          next: (resposta) => {
            console.log(resposta)
          }, error: (msgErro) => {
            console.log("Erro ao cadastrar a pessoa.", msgErro)
          }
        })
    } else {
      pessoa.IdPessoa = this.pessoaId

      this.pessoaService.alterarPessoa(pessoa)
        .subscribe({
          next: (resposta) => {
            console.log(pessoa)
            console.log(resposta)
          }, error: (msgErro) => {
            console.log("Erro ao alterar a pessoa", msgErro)
          }
        })
    }
    this.limparCampos();
  }

  listarPessoa(pessoaId: number){
    this.pessoaService.listarPessoa(pessoaId)
      .subscribe({
        next: (dados) => {
          console.table(dados)
        }, error: (msgErro) => {
          console.log("Erro ao listar pessoas", msgErro)
        }
      })
  }
}
