import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoService } from '../../Service/EnderecoService/endereco-service';
import { Endereco } from '../../Models/Endereco';

@Component({
  imports: [FormsModule],
  selector: 'app-endereco-cadastro',
  styleUrl: './endereco-cadastro.css',
  templateUrl: './endereco-cadastro.html',
})
export class EnderecoCadastro implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private pessoaService: PessoaService, private route: ActivatedRoute, private router: Router, private enderecoService: EnderecoService){}

  idEndereco = 0
  idPessoa = 0
  cep = ''
  numero = ''
  complemento = ''

  editar = false
  enderecoId = 0

  limparCampos(){
    this.cep = ''
    this.numero = ''
    this.complemento = ''
  }

  ngOnInit(){
    this.idPessoa = Number(this.route.snapshot.queryParamMap.get('idPessoa'))
    this.enderecoId = Number(this.route.snapshot.paramMap.get('idEndereco'))

    if(this.enderecoId > 0){
      this.editar = true
      this.carregaCampo(this.enderecoId)
    }
  }

  carregaCampo(enderecoId: number){
    this.enderecoService.listarEndereco(enderecoId)
      .subscribe({
        next: (objEndereco) => {
          this.idEndereco = objEndereco.idEndereco
          this.idPessoa = objEndereco.idPessoa
          this.cep = objEndereco.cep
          this.numero = objEndereco.numero
          this.complemento = objEndereco.complemento

          this.cdr.detectChanges()
      }, error: (msgErro) =>{
        console.log("Erro ao listar pessoa", msgErro)
      }
      })
  }

  enviaDados(){
    const ende = new Endereco()
    ende.idPessoa = this.idPessoa
    ende.cep = this.cep
    ende.numero = this.numero
    ende.complemento = this.complemento

    if(!this.editar){
      this.enderecoService.cadastrarEndereco(ende)
        .subscribe({
          next: (resposta) => {
            console.log(resposta)
            this.limparCampos();
            this.router.navigate(['/funcionario-lista'])
          }, error: (msgErro) => {
            console.log("Erro ao cadastrar o novo endereço.", msgErro)
          }
        })
    } else {
      ende.idEndereco = this.enderecoId

      this.enderecoService.alterarEndereco(ende)
        .subscribe({
          next: (resposta) => {
            this.limparCampos();
            console.log(ende)
            console.log(resposta)
            this.router.navigate(['/funcionario-lista'])
          }, error: (msgErro) => {
            console.log("Erro ao alterar a pessoa", msgErro)
          }
        })
    }
  }

  listarEndereco(enderecoId: number){
    this.enderecoService.listarEndereco(enderecoId)
      .subscribe({
        next: (dados) => {
          console.table(dados)
        }, error: (msgErro) => {
          console.log("Erro ao listar as endereços", msgErro)
        }
      })
  }
  
}
