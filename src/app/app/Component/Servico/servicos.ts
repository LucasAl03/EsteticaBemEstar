import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { ActivatedRoute } from '@angular/router';
import { entradaService } from '../../Service/EntradaService/entrada-service';
import { Produto } from '../../Models/Produto';
import { CurrencyPipe } from '@angular/common';
import { Categoria } from '../../Models/Categoria';
import { CategoriaService } from '../../Service/CategoriaService/categoria-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CurrencyPipe, FormsModule],
  selector: 'app-servicos',
  styleUrl: './servicos.css',
  templateUrl: './servicos.html',
})
export class Servicos implements OnInit{

  constructor(private cdr: ChangeDetectorRef, private entradaService: entradaService, private route: ActivatedRoute, private produtoService: ProdutoItem, private categoriaService: CategoriaService){}
  
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
          this.produtos = lista.filter(p => p.tipoItem === 'S' && p.ativoProdutoServico === 'S')
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
