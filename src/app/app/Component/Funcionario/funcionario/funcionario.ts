import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../Service/FuncionarioService/funcionario-service';
import { PessoaFuncionario } from '../../../Models/PessoaFuncionario';
import { DatePipe } from '@angular/common';
import { Endereco } from '../../../Models/Endereco';
import { EnderecoService } from '../../../Service/EnderecoService/endereco-service';


@Component({
  imports: [DatePipe],
  selector: 'app-funcionario',
  styleUrl: './funcionario.css',
  templateUrl: './funcionario.html',
})
export class Funcionario implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private funcionarioService: FuncionarioService, private route: ActivatedRoute, private router: Router, private enderecoService: EnderecoService){}

  pessoa: PessoaFuncionario[] = []

  ngOnInit(){
    this.carregaFuncionarios();
  }

  carregaFuncionarios(){
    this.funcionarioService.listarFuncionarios()
      .subscribe({
        next: (lista) => {
          this.pessoa = lista.filter(f => f.funcionario).sort((a,b) => b.idPessoa - a.idPessoa)
          this.cdr.detectChanges()
        },
        error: (erro) => console.log('Erro ao listar os funcionarios', erro)
      })
  }

  buscaId(p: PessoaFuncionario) {
    this.router.navigate(['/cadastro-funcionario', p.idPessoa])
  }
  
  excluir(p: PessoaFuncionario) {
    if (confirm('Certeza que deseja excluir o registro deste cliente?')) {
      this.funcionarioService.excluirFuncionario(p.idPessoa).subscribe({
        next: () => this.carregaFuncionarios(),
        error: (erro) => console.log('Erro ao excluir', erro)
      })
    }
  }

  buscaIdEnd(e: Endereco){
    this.router.navigate(['/endereco-cadastro', e.idEndereco])
  }

  excluirEnd(e: Endereco){
    if (confirm('Certeza que deseja excluir este endereço.')){
      this.enderecoService.excluirEndereco(e.idEndereco).subscribe({
        next: () => this.carregaFuncionarios(),
        error: (erro) => console.log('Erro ao excluir o endereço', erro)
      })
    }
  }

  novoEnd(p: PessoaFuncionario){
    this.router.navigate(['/endereco-cadastro'], {
      queryParams: { idPessoa: p.idPessoa }
    });
  }
}
