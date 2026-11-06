import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Produto } from '../../Models/Produto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { CurrencyPipe } from '@angular/common';
import { Categoria } from '../../Models/Categoria';
import { CategoriaService } from '../../Service/CategoriaService/categoria-service';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../Service/CarrinhoService/carrinho-service';
import { SessaoService } from '../../Service/SessaoService/sessao-service';

@Component({
  imports: [CurrencyPipe, RouterLink, FormsModule],
  selector: 'app-home-component',
  styleUrl: './home-component.css',
  templateUrl: './home-component.html',
})
export class HomeComponent {

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private produtoService: ProdutoItem, private categoriaService: CategoriaService, private sessao: SessaoService){}

  items: Produto[] =[];
  catego: Categoria[] = [];

  idCategoria = 0
  pesquisa: string = ''

  servicosAbertos = true
  produtosAbertos = true

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
    const texto = this.pesquisa.trim().toLocaleLowerCase()
    
    return this.items.filter(p => {
      const filtraCategoria = !this.idCategoria || p.idCategoria === this.idCategoria && p.ativoProdutoServico === 'S'
      const filtraTexto = !texto || p.item.toLocaleLowerCase().includes(texto)
      return filtraCategoria && filtraTexto
    })
  }

  get servicos(): Produto[]{
    return this.itemsFiltrados.filter(p => p.tipoItem === 'S')
  }

  get produtos(): Produto[]{
    return this.itemsFiltrados.filter(p => p.tipoItem === 'P')
  }

  alternarServicos() {
    this.servicosAbertos = !this.servicosAbertos
  }

  alternarProdutos(){
    this.produtosAbertos = !this.produtosAbertos
  }

  private carrinhoService = inject(CarrinhoService)  

  adicionarAoCarrinho(p: Produto) {
    if(this.sessao.sessao()){
    this.carrinhoService.adicionar(p);

    console.log('Item adicionado:', p);
    console.log('Carrinho atualizado:', this.carrinhoService.itens());
    } else {
      return alert('Deve estar logado para adicionar itens ao carrinho.')
    }
  }
}
