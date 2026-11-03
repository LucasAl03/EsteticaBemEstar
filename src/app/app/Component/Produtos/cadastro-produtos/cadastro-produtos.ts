import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoItem } from '../../../Service/ProdutoItem/produto-item';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto, DetalheProduto } from '../../../Models/Produto';
import { Categoria } from '../../../Models/Categoria';
import { CategoriaService } from '../../../Service/CategoriaService/categoria-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [FormsModule, CurrencyPipe],
  selector: 'app-cadastro-produtos',
  styleUrl: './cadastro-produtos.css',
  templateUrl: './cadastro-produtos.html',
})
export class CadastroProdutos implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private produtoService: ProdutoItem, private route: ActivatedRoute, private categoriaService: CategoriaService, private router: Router){}

  catego: Categoria[] = []
  prodserv: Produto[] = []

  idItem = 0
  idCategoria = 0
  item = ''
  descricaoItem = ''
  preco: number | null = null
  tipoItem = ''
  ativoProdutoServico = ''
  precoVenda: number | null = null
  unidade = ''
  codigoPreco: number | null = null

  produtoId = 0
  editar = false

  limparCampos(){
    this.idCategoria = 0
    this.item = ''
    this.descricaoItem = ''
    this.preco = null
    this.tipoItem = ''
    this.ativoProdutoServico = ''
    this.precoVenda = null
    this.unidade = ''
    this.codigoPreco = null
  }

  ngOnInit(){
    this.produtoId = Number(this.route.snapshot.paramMap.get('idItem'))

    if(this.produtoId > 0){
      this.editar = true
      this.carregaCampo(this.produtoId)
    }
    this.carregaProdServ();
    this.carregaCategoria();
  }

  carregaCampo(produtoId: number){
    this.produtoService.listarProduto(produtoId)
      .subscribe({
        next: (objProduto) => {
          this.idItem = objProduto.idItem
          this.idCategoria = objProduto.idCategoria
          this.item = objProduto.item
          this.descricaoItem = objProduto.descricaoItem
          this.preco = objProduto.preco
          this.tipoItem = objProduto.tipoItem
          this.ativoProdutoServico = objProduto.ativoProdutoServico
          this.precoVenda = objProduto.produto?.precoVenda ?? null
          this.unidade = objProduto.produto?.unidade ?? ''
          this.codigoPreco = objProduto.produto?.codigoPreco ?? null

          this.cdr.detectChanges()
      }, error: (msgErro) =>{
        console.log("Erro ao listar o produto", msgErro)
      }
      })
  }

  enviaDados(){
    const item = new Produto()
    item.idItem = this.idItem
    item.idCategoria = this.idCategoria
    item.item = this.item
    item.descricaoItem = this.descricaoItem
    item.preco = this.preco
    item.tipoItem = this.tipoItem
    item.ativoProdutoServico = this.ativoProdutoServico

    if(this.tipoItem === 'P'){
      item.produto = new DetalheProduto()
      item.produto.precoVenda = this.precoVenda
      item.produto.unidade = this.unidade
      item.produto.codigoPreco = this.codigoPreco
    }

    if(!this.editar){
      this.produtoService.cadastrarProduto(item)
        .subscribe({
          next: (resposta) => {
            console.log(resposta)
            this.router.navigate(['/cadastro-produto'])
            this.limparCampos();
          }, error: (msgErro) => {
            console.log("Erro ao cadastrar o serviço/produto.", msgErro)
          }
        })
    } else {
      item.idItem = this.produtoId

      this.produtoService.alterarProduto(item)
        .subscribe({
          next: (resposta) => {
            console.log(item)
            console.log(resposta)
            this.router.navigate(['/cadastro-produto'])
            this.limparCampos();
          }, error: (msgErro) => {
            console.log("Erro ao alterar o serviço/produto", msgErro)
          }
        })
    }
  }

  listarProdutos(produtoId: number){
    this.produtoService.listarProduto(produtoId)
      .subscribe({
        next: (dados) => {
          console.table(dados)
        }, error: (msgErro) => {
          console.log("Erro ao listar os produtos e serviços", msgErro)
        }
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

  carregaProdServ(){
    this.produtoService.listarProdutos()
      .subscribe({
        next: (lista) => {
          console.log(lista.filter(i => i.tipoItem === 'P').map(i => ({ id: i.idItem, produto: i.produto })))
          this.prodserv = lista.sort((a,b) => a.idItem - b.idItem)
          this.cdr.detectChanges()
        },
        error: (err) => console.log('Erro ao carregar os produtos e serviços', err)
      })
  }

  buscaId(p: Produto) {
    this.router.navigate(['/cadastro-produto', p.idItem])
  }

  excluir(p: Produto) {
    if (confirm('Certeza que deseja excluir esse registro de entrada?')) {
      this.produtoService.excluirProduto(p.idItem).subscribe({
        next: () => this.carregaProdServ(),
        error: (erro) => console.log('Erro ao excluir', erro)
      })
    }
  }

  private readonly margens: Record<number, number> = {
    1: 0.04,
    2: 0.08,
    3: 0.10
  }

  calculaPrecoVenda() {
    const margem = this.margens[Number(this.codigoPreco)]

    if (this.preco == null || margem === undefined) {
      this.precoVenda = null
      return
    }

    this.precoVenda = Math.round(this.preco * (1 + margem) * 100) / 100
  }

  precoChange(valor: number) {
    this.preco = valor
    this.calculaPrecoVenda()
  }

  codigoPrecoChange(valor: number) {
    this.codigoPreco = valor === null ? null : Number(valor)
    this.calculaPrecoVenda()
  }
}