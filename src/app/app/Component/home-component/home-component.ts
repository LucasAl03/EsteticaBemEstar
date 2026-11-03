import { ChangeDetectorRef, Component } from '@angular/core';
import { Produto } from '../../Models/Produto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { CurrencyPipe } from '@angular/common';
import { Categoria } from '../../Models/Categoria';
import { CategoriaService } from '../../Service/CategoriaService/categoria-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CurrencyPipe, RouterLink, FormsModule],
  selector: 'app-home-component',
  styleUrl: './home-component.css',
  templateUrl: './home-component.html',
})
export class HomeComponent {

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private produtoService: ProdutoItem, private categoriaService: CategoriaService){}

  items: Produto[] =[];
  catego: Categoria[] = [];

  idCategoria = 0

  ngOnInit(){
    this.carregaItem();
    this.carregaCategoria();
  }

  carregaItem(){
    this.produtoService.listarProdutos()
      .subscribe({
        next: (lista) => {
          this.items = lista.filter(p => p.ativoProdutoServico === 'S')
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
    if (!this.idCategoria) return this.items;
    return this.items.filter(p => p.idCategoria === this.idCategoria);
  }
}
