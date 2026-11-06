import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdutoItem } from '../../../Service/ProdutoItem/produto-item';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../../Models/Produto';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../Models/Categoria';
import { CategoriaService } from '../../../Service/CategoriaService/categoria-service';

@Component({
  imports: [CurrencyPipe, FormsModule],
  selector: 'app-lista-produtos',
  styleUrl: './lista-produtos.css',
  templateUrl: './lista-produtos.html',
})
export class ListaProdutos implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private produtoService: ProdutoItem, private route: ActivatedRoute, private categoriaService: CategoriaService){}

  produtos: Produto[] = []
  catego: Categoria[] = [];

  idCategoria = 0
  pesquisa: string = ''

  ngOnInit(){
    this.carregaProdutos();
    this.carregaCategoria();
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

  carregaCategoria(){
    this.categoriaService.listarCategorias()
      .subscribe({
        next: (lista) => {
          this.catego = lista.sort((a,b) => a.idCategoria - b.idCategoria)
          this.cdr.detectChanges()
        },
        error: (err) => console.log('Erro ao carregar as categorias', err)
      })
  }

  get itemsFiltrados(): Produto[] {
    const texto = this.pesquisa.trim().toLocaleLowerCase()
    
    return this.produtos.filter(p => {
      const filtraCategoria = !this.idCategoria || p.idCategoria === this.idCategoria && p.ativoProdutoServico === 'S'
      const filtraTexto = !texto || p.item.toLocaleLowerCase().includes(texto)
      return filtraCategoria && filtraTexto
    })
  }
}
