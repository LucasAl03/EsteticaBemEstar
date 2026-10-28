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
  idpessoa = 0
  nome = ''
  cpf = ''
  data_nascimento = ''
  sexo = ''
  email = ''
  telefone = ''

  // endereco
  cep = ''
  numero = ''
  complemento = ''

  // cargo 
  cargo = ''
  dataadmissao = ''

  editar = false
  pessoaId = 0

  exibeDados(){
    console.log(this.idpessoa, this.nome, this.cpf, this.data_nascimento, this.sexo, this.email, this.telefone, this.cep, this.numero, this.complemento)

    this.limparCampos();
  }

  limparCampos(){
    this.nome = ''
    this.cpf = ''
    this.data_nascimento = ''
    this.sexo = ''
    this.email = ''
    this.telefone = ''

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
          this.idpessoa = objPessoa.IdPessoa
          this.nome = objPessoa.Nome
          this.cpf = objPessoa.CPF
          this.data_nascimento = objPessoa.DataNascimento
          this.sexo = objPessoa.Sexo
          this.email = objPessoa.Email
          this.telefone = objPessoa.Telefone

          this.cdr.detectChanges()
      }, error: (msgErro) =>{
        console.log("Erro ao listar pessoa", msgErro)
      }
      })
  }

  enviaDados(){
    const pessoaCadastra = new Pessoa()
    pessoaCadastra.Nome = this.nome
    pessoaCadastra.CPF = this.cpf
    pessoaCadastra.DataNascimento = this.data_nascimento
    pessoaCadastra.Sexo = this.sexo
    pessoaCadastra.Email = this.email
    pessoaCadastra.Telefone = this.telefone

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
