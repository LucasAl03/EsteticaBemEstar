import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdutoItem } from '../../../Service/ProdutoItem/produto-item';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../../Models/Produto';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-lista-produtos',
  styleUrl: './lista-produtos.css',
  templateUrl: './lista-produtos.html',
})
export class ListaProdutos implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private produtoService: ProdutoItem, private route: ActivatedRoute){}

  produtos: Produto[] = []

  ngOnInit(){
    this.carregaProdutos();
  }

  carregaProdutos(){
    this.produtoService.listarProdutos()
      .subscribe({
        next: (lista) => {
          this.produtos = lista.filter(p => p.tipoItem === 'P' && p.ativoProdutoServico === 'S')
          this.cdr.detectChanges()
        },
        error: (err) => console.log('Erro ao listar os produtos', err)
      })
  }
}
