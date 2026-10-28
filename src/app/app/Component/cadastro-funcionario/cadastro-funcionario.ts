import {ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';
import { Pessoa } from '../../Models/Pessoa';
import { Endereco } from '../../Models/Endereco';
import { Funcionario } from '../../Models/Funcionario';


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
    const pessoaCadastra = new Pessoa()
    pessoaCadastra.Nome = this.Nome
    pessoaCadastra.CPF = this.CPF
    pessoaCadastra.DataNascimento = this.DataNascimento
    pessoaCadastra.Sexo = this.Sexo
    pessoaCadastra.Email = this.Email
    pessoaCadastra.Telefone = this.Telefone

    const cadastraEndereco = new Endereco()
    cadastraEndereco.Cep = this.Cep
    cadastraEndereco.Numero = this.Numero
    cadastraEndereco.Complemento = this.Complemento

    const cadastraFuncionario = new Funcionario()
    cadastraFuncionario.Cargo = this.Cargo
    cadastraFuncionario.DataAdmissao = this.DataAdmissao

    if(!this.editar){
      this.pessoaService.cadastrarPessoa(pessoaCadastra)
        .subscribe({
          next: (resposta) => {
            console.log(resposta)
          }, error: (msgErro) => {
            console.log("Erro ao cadastrar a pessoa.", msgErro)
          }
        })
    } else {
      pessoaCadastra.IdPessoa = this.pessoaId

      this.pessoaService.alterarPessoa(pessoaCadastra)
        .subscribe({
          next: (resposta) => {
            console.log(pessoaCadastra)
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
