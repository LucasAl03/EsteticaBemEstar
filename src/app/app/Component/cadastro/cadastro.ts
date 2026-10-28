import {ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';
import { Pessoa } from '../../Models/Pessoa';
import { Endereco } from '../../Models/Endereco';


@Component({
  imports: [FormsModule],
  selector: 'app-cadastro',
  styleUrl: './cadastro.css',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  constructor(private cdr: ChangeDetectorRef, private pessoaService: PessoaService, private route: ActivatedRoute){}

  // pessoa
  Idpessoa = 0
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

  editar = false
  pessoaId = 0

  exibeDados(){
    console.log(this.Idpessoa, this.Nome, this.CPF, this.DataNascimento, this.Sexo, this.Email, this.Telefone, this.Cep, this.Numero, this.Complemento)

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
          this.Idpessoa = objPessoa.IdPessoa
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
    const pessoa = new Pessoa()
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

    pessoa.Enderecos = [endereco];

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
