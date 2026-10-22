import {ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';
import { Pessoa } from '../../Models/Pessoa';


@Component({
  imports: [FormsModule],
  selector: 'app-cadastro',
  styleUrl: './cadastro.css',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  constructor(private cdr: ChangeDetectorRef, private pessoaService: PessoaService, private route: ActivatedRoute){}

  // pessoa
  idpessoa = 0
  nome = ''
  cpf = ''
  data_nascimento = ''
  email = ''
  telefone = ''

  editar = false
  pessoaId = 0

  exibeDados(){
    console.log(this.idpessoa, this.nome, this.cpf, this.data_nascimento, this.email, this.telefone)

    this.limparCampos();
  }

  limparCampos(){
    this.nome = ''
    this.cpf = ''
    this.data_nascimento = ''
    this.email = ''
    this.telefone = ''
  }

  ngOnInit(){
    this.pessoaId = Number(this.route.snapshot.paramMap.get('idpessoa'))

    if(this.pessoaId > 0){
      this.editar = true
      this.carregaCampo(this.pessoaId)
    }
  }

  carregaCampo(pessoaId: number){
    this.pessoaService.listarPessoa(this.pessoaId)
      .subscribe({
        next: (objPessoa) => {
          this.idpessoa = objPessoa.idpessoa
          this.nome = objPessoa.nome
          this.cpf = objPessoa.cpf
          this.email = objPessoa.email
          this.telefone = objPessoa.telefone

          this.cdr.detectChanges()
      }, error: (msgErro) =>{
        console.log("Erro ao listar pessoa", msgErro)
      }
      })
  }

  enviaDados(){
    const pessoaCadastra = new Pessoa()
    pessoaCadastra.nome = this.nome
    pessoaCadastra.cpf = this.cpf
    pessoaCadastra.data_nascimento = this.data_nascimento
    pessoaCadastra.email = this.email
    pessoaCadastra.telefone = this.telefone

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
      pessoaCadastra.idpessoa = this.pessoaId

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
