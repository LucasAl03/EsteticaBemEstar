import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Endereco } from '../../Models/Endereco';
import { FuncionarioCargo } from '../../Models/FuncionarioCargo';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';
import { FuncionarioService } from '../../Service/FuncionarioService/funcionario-service';


@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-funcionario',
  styleUrl: './cadastro-funcionario.css',
  templateUrl: './cadastro-funcionario.html',
})
export class CadastroFuncionario implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private pessoaService: FuncionarioService, private route: ActivatedRoute){}

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

  cpfOriginal: string = ''

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
    this.pessoaId = Number(this.route.snapshot.paramMap.get('idPessoa'))

    this.carregaCpfs()

    if(this.pessoaId > 0){
      this.editar = true
      this.carregaCampo(this.pessoaId)
    }
  }

  carregaCampo(pessoaId: number){
    this.pessoaService.listarFuncioanrio(pessoaId)
      .subscribe({
        next: (objPessoa) => {
          this.idPessoa = objPessoa.idPessoa
          this.nome = objPessoa.nome
          this.cpf = objPessoa.cpf
          this.cpfOriginal = objPessoa.cpf
          this.dataNascimento = objPessoa.dataNascimento
          this.sexo = objPessoa.sexo
          this.email = objPessoa.email
          this.telefone = objPessoa.telefone
          this.ativoPessoa = objPessoa.ativoPessoa

          this.cep = objPessoa.enderecos?.[0]?.cep ?? ''
          this.numero = objPessoa.enderecos?.[0]?.numero ?? ''
          this.complemento = objPessoa.enderecos?.[0]?.complemento ?? ''

          // cargo
          this.cargo = objPessoa.funcionario?.cargo ?? ''
          this.dataAdmissao = objPessoa.funcionario?.dataAdmissao ?? ''

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

    const enderecos = new Endereco()
    enderecos.cep = this.cep
    enderecos.numero = this.numero
    enderecos.complemento = this.complemento

    const funcionario = new FuncionarioCargo()
    funcionario.cargo = this.cargo
    funcionario.dataAdmissao = this.dataAdmissao

    pessoa.enderecos = [enderecos];
    pessoa.funcionario = funcionario

    if(!this.editar){
      this.pessoaService.cadastrarFuncionario(pessoa)
        .subscribe({
          next: (resposta) => {
            console.log(resposta)
          }, error: (msgErro) => {
            console.log("Erro ao cadastrar a pessoa.", msgErro)
          }
        })
    } else {
      pessoa.idPessoa = this.pessoaId

      this.pessoaService.alterarFuncionario(pessoa)
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
    this.pessoaService.listarFuncioanrio(pessoaId)
      .subscribe({
        next: (dados) => {
          console.table(dados)
        }, error: (msgErro) => {
          console.log("Erro ao listar pessoas", msgErro)
        }
      })
  }

  cpfExiste = false
  private cpfsCadastrados: string[] = []

  carregaCpfs() {
    this.pessoaService.listarFuncionarios().subscribe({
      next: (lista) => {
        this.cpfsCadastrados = lista.map(p => p.cpf)
      },
      error: (erro) => console.log('Erro ao carregar CPFs', erro)
    })
  }

  verificaCpf(valor: string) {
    this.cpf = valor

    if (valor.length !== 11) {
      this.cpfExiste = false
      return
    }
    // na edição, ignora o CPF da própria pessoa
    this.cpfExiste = this.cpfsCadastrados.includes(valor) && valor !== this.cpfOriginal
  }
}
