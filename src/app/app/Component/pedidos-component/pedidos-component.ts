import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AtendimentoService } from '../../Service/AtendimentoService/atendimento-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from '../../Models/Atendimento';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Produto } from '../../Models/Produto';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { SessaoService } from '../../Service/SessaoService/sessao-service';
import { FormsModule } from '@angular/forms';
import { stat } from 'fs';

@Component({
  imports: [DatePipe, CurrencyPipe, FormsModule],
  selector: 'app-pedidos-component',
  styleUrl: './pedidos-component.css',
  templateUrl: './pedidos-component.html',
})
export class PedidosComponent implements OnInit {
  constructor (public sessao: SessaoService, private cdr: ChangeDetectorRef, private atendimentoService: AtendimentoService, private route: ActivatedRoute, private router: Router, private produtoService: ProdutoItem){}

  atendimento: Atendimento[] = []

  statusPedido = 'A'
  pesquisa: string = ''
  dataFilter: string = ''

  item: Produto[] = []
  
    ngOnInit(){
      if(!this.sessao.sessao()){
        this.router.navigate(['/home'])
      }

      this.carregaAtendimento();
      this.carregaItems();
    }

    get filtroPedidos(): Atendimento[] {
      const texto = this.pesquisa.trim().toLocaleLowerCase()

      let pedidos = this.atendimento

      if (!this.sessao.ehFuncionario()){
        const idPessoa = this.sessao.sessao()?.idPessoa
        pedidos = pedidos.filter(p => p.idPessoa === idPessoa)
      }

      return pedidos.filter(p => {
        const filtraStatus = !this.statusPedido || p.statusAtendimento === this.statusPedido
        const filtraTexto = !texto || p.nomePessoa.toLocaleLowerCase().includes(texto)
        const filtraData = !this.dataFilter || p.dataAtendimento === this.dataFilter
        return filtraStatus && filtraTexto && filtraData;
      })
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
      this.router.navigate(['/editar-pedidos', a.idAtendimento])
    }

  excluir(a: Atendimento) {
    if (confirm('Certeza que deseja excluir o atendimento?')) {
      this.atendimentoService.excluirAtendimento(a.idAtendimento).subscribe({
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
