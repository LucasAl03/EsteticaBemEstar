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
  DataNascimento = null
  Sexo = ''
  Email = ''
  Telefone = 0n

  // endereco
  cep = ''
  numero = ''
  complemento = ''

  editar = false
  pessoaId = 0

  exibeDados(){
    console.log(this.Idpessoa, this.Nome, this.CPF, this.DataNascimento, this.Sexo, this.Email, this.Telefone, this.cep, this.numero, this.complemento)

    this.limparCampos();
  }

  limparCampos(){
    this.Nome = ''
    this.CPF = ''
    this.DataNascimento = null
    this.Sexo = ''
    this.Email = ''
    this.Telefone = 0n

    this.cep = ''
    this.numero = ''
    this.complemento = ''
  }

  ngOnInit(){
    this.pessoaId = Number(this.route.snapshot.paramMap.get('idpessoa'))

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
    const pessoaCadastra = new Pessoa()
    pessoaCadastra.Nome = this.Nome
    pessoaCadastra.CPF = this.CPF
    pessoaCadastra.DataNascimento = this.DataNascimento
    pessoaCadastra.Sexo = this.Sexo
    pessoaCadastra.Email = this.Email
    pessoaCadastra.Telefone = this.Telefone

    const cadastraEndereco = new Endereco()
    cadastraEndereco.cep = this.cep
    cadastraEndereco.numero = this.numero
    cadastraEndereco.complemento = this.complemento

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
