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
  idPessoa = 0
  nome = ''
  cpf = ''
  dataNascimento = ''
  sexo = ''
  email = ''
  telefone: number | null = null
  ativoPessoa = 'S'

  // endereco
  cep = ''
  numero = ''
  complemento = ''

  // cargo 
  cargo = ''
  dataAdmissao = ''

  editar = false
  pessoaId = 0

  exibeDados(){
    console.log(this.idPessoa, this.nome, this.cpf, this.dataNascimento, this.sexo, this.email, this.telefone, this.cep, this.numero, this.complemento)

    this.limparCampos();
  }

  limparCampos(){
    this.nome = ''
    this.cpf = ''
    this.dataNascimento = ''
    this.sexo = ''
    this.email = ''
    this.telefone = null
    this.ativoPessoa = ''


    this.cep = ''
    this.numero = ''
    this.complemento = ''

    this.cargo = ''
    this.dataAdmissao = ''
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
          this.idPessoa = objPessoa.idPessoa
          this.nome = objPessoa.nome
          this.cpf = objPessoa.cpf
          this.dataNascimento = objPessoa.dataNascimento
          this.sexo = objPessoa.sexo
          this.email = objPessoa.email
          this.telefone = objPessoa.telefone
          this.ativoPessoa = objPessoa.ativoPessoa

          this.cdr.detectChanges()
      }, error: (msgErro) =>{
        console.log("Erro ao listar pessoa", msgErro)
      }
      })
  }

  enviaDados(){
    const pessoa = new PessoaFuncionario()
    pessoa.nome = this.nome
    pessoa.cpf = this.cpf
    pessoa.dataNascimento = this.dataNascimento
    pessoa.sexo = this.sexo
    pessoa.email = this.email
    pessoa.telefone = this.telefone
    pessoa.ativoPessoa = this.ativoPessoa

    const endereco = new Endereco()
    endereco.cep = this.cep
    endereco.numero = this.numero
    endereco.complemento = this.complemento

    const funcionario = new Funcionario()
    funcionario.cargo = this.cargo
    funcionario.dataAdmissao = this.dataAdmissao

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
      pessoa.idPessoa = this.pessoaId

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
