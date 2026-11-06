import { ChangeDetectorRef, Component } from '@angular/core';
import { AtendimentoService } from '../../Service/AtendimentoService/atendimento-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from '../../Models/Atendimento';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Produto } from '../../Models/Produto';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { SessaoService } from '../../Service/SessaoService/sessao-service';

@Component({
  imports: [DatePipe, CurrencyPipe],
  selector: 'app-pedidos-component',
  styleUrl: './pedidos-component.css',
  templateUrl: './pedidos-component.html',
})
export class PedidosComponent {
  constructor (public sessao: SessaoService, private cdr: ChangeDetectorRef, private atendimentoService: AtendimentoService, private route: ActivatedRoute, private router: Router, private produtoService: ProdutoItem){}

  atendimento: Atendimento[] = []

  item: Produto[] = []
  
    ngOnInit(){
      this.carregaAtendimento();
      this.carregaItems();
    }

    get filtroPedidos(): Atendimento[] {
      if (this.sessao.ehFuncionario()){
        return this.atendimento
      }

      const idPessoa = this.sessao.sessao()?.idPessoa
      return this.atendimento.filter(p => p.idPessoa == idPessoa)
    }
  
    carregaAtendimento(){
      this.atendimentoService.listarAtendimentos()
        .subscribe({
          next: (lista) => {
            this.atendimento = lista.sort((a, b) => b.idAtendimento - a.idAtendimento)
            this.cdr.detectChanges()
          },
          error: (erro) => console.log('Erro ao listar os atendimentos', erro)
        })
    }

    buscaId(a: Atendimento) {
      this.router.navigate(['/cadastro', a.idAtendimento])
    }

  excluir(a: Atendimento) {
    if (confirm('Certeza que deseja excluir o atendimento?')) {
      this.atendimentoService.excluirAtendimento(a.idPessoa).subscribe({
        next: () => this.carregaAtendimento(),
        error: (erro) => console.log('Erro ao excluir', erro)
      })
    }
  }

  carregaItems(){
    this.produtoService.listarProdutos()
      .subscribe({
        next: (lista) => {
          this.item = lista.sort((a, b) => b.idItem - a.idItem)
          this.cdr.detectChanges()
        },
        error: (erro) => console.log('Erro ao listar os items', erro)
      })
  }

  buscaProduto(idItem: number): Produto | undefined {
    return this.item.find(p => p.idItem === idItem);
  }
}
