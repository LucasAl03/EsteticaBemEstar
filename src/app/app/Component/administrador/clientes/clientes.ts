import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../../Service/PessoaService/pessoa-service';
import { Pessoa } from '../../../Models/Pessoa';
import { Endereco } from '../../../Models/Endereco';
import { EnderecoService } from '../../../Service/EnderecoService/endereco-service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SessaoService } from '../../../Service/SessaoService/sessao-service';

@Component({
  imports: [FormsModule, DatePipe],
  selector: 'app-clientes',
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private pessoaService: PessoaService, private route: ActivatedRoute, private router: Router, private enderecoService: EnderecoService, private sessao: SessaoService){}

  pessoa: Pessoa[] = []

  itemAtivo: string = 'S'

  pesquisa: string = ''
  
    ngOnInit(){
      if(!this.sessao.ehFuncionario())
      this.router.navigate(['/home'])
      this.carregaPessoa();
    }
  
    carregaPessoa(){
      this.pessoaService.listarPessoas()
        .subscribe({
          next: (lista) => {
            this.pessoa = lista.sort((a, b) => b.idPessoa - a.idPessoa)
            this.cdr.detectChanges()
          },
          error: (erro) => console.log('Erro ao listar os clientes', erro)
        })
    }

    buscaId(p: Pessoa) {
      this.router.navigate(['/cadastro', p.idPessoa])
    }

  excluir(p: Pessoa) {
    if (confirm('Certeza que deseja excluir o registro deste cliente?')) {
      this.pessoaService.excluirPessoa(p.idPessoa).subscribe({
        next: () => this.carregaPessoa(),
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
        next: () => this.carregaPessoa(),
        error: (erro) => console.log('Erro ao excluir o endereço', erro)
      })
    }
  }

  novoEnd(p: Pessoa){
    this.router.navigate(['/endereco-cadastro'], {
      queryParams: { idPessoa: p.idPessoa }
    });
  }

  get pessoasFiltradas(): Pessoa[] {
    const texto = this.pesquisa.trim().toLocaleLowerCase()

    return this.pessoa.filter(p => {
      const filtraTexto = !texto || p.nome.toLocaleLowerCase().includes(texto)
      const filtroSituacao = !this.itemAtivo || p.ativoPessoa === this.itemAtivo
      return filtraTexto && filtroSituacao;
    })
  }
}
