import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Entrada } from '../../Models/Entrada';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { entradaService } from '../../Service/EntradaService/entrada-service';
import { Produto } from '../../Models/Produto';
import { DatePipe } from '@angular/common';
import { EstoqueResposta } from '../../Models/EstoqueResposta';

@Component({
  imports: [FormsModule, DatePipe],
  selector: 'app-entrada-produto',
  styleUrl: './entrada-produto.css',
  templateUrl: './entrada-produto.html',
})
export class EntradaProduto implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private entradaService: entradaService, private route: ActivatedRoute, private produtoService: ProdutoItem, private router: Router){}

  // declaração dos atributos para Entrada
  idEntradaProduto = 0
  idItem = 0
  quantidadeEntrada: number | null = null
  unidade = ''
  dataEntradaProduto = ''
  valorUnitarioEntrada: number | null = null

  // array do objeto Produto 
  produtos: Produto[] = []

  entradas: Entrada[] = []

  estoque_resposta: EstoqueResposta[] = []

  editar = false
  produtoId = 0

  dataFilter: string = ''

  ngOnInit(){
    this.produtoId = Number(this.route.snapshot.paramMap.get('idEntradaProduto'))

    if(this.produtoId > 0){
      this.editar = true
      this.carregaCampo(this.produtoId)
    }

    this.carregaProdutos()
    this.carregaEntradas()
    this.carregaEstoque()
  }

  exibeDados(){
    console.log(this.idItem, this.quantidadeEntrada, this.unidade, this.dataEntradaProduto, this.valorUnitarioEntrada)

    this.limparCampos();
  }

  limparCampos(){
    this.idItem = 0
    this.quantidadeEntrada = null
    this.unidade = ''
    this.dataEntradaProduto = ''
    this.valorUnitarioEntrada = null
  }

  carregaCampo(produtoId: number){
    this.entradaService.listarEntrada(produtoId)
      .subscribe({
        next: (objProduto) => {
          this.idEntradaProduto = objProduto.idEntradaProduto
          this.idItem = objProduto.idItem
          this.quantidadeEntrada = objProduto.quantidadeEntrada
          this.unidade = objProduto.unidade
          this.dataEntradaProduto = objProduto.dataEntradaProduto
          this.valorUnitarioEntrada = objProduto.valorUnitarioEntrada

          this.cdr.detectChanges()
          this.carregaEntradas();
      }, error: (msgErro) =>{
        console.log("Erro ao listar o produto", msgErro)
      }
      })
  }

  enviaDados(){
    const produto = new Entrada()
    produto.idItem = this.idItem
    produto.quantidadeEntrada = this.quantidadeEntrada
    produto.unidade = this.unidade
    produto.dataEntradaProduto = this.dataEntradaProduto
    produto.valorUnitarioEntrada = (this.valorUnitarioEntrada)

    if(!this.editar){
      this.entradaService.cadastrarEntrada(produto)
        .subscribe({
          next: (resposta) => {
            console.log(resposta)
            this.router.navigate(['/entrada'])
          }, error: (msgErro) => {
            console.log("Erro ao cadastrar a entrada.", msgErro)
          }
        })
    } else {
      produto.idEntradaProduto = this.produtoId

      this.entradaService.alterarEntrada(produto)
        .subscribe({
          next: (resposta) => {
            console.log(produto)
            console.log(resposta)
            this.limparCampos();
            this.router.navigate(['/entrada'])
          }, error: (msgErro) => {
            console.log("Erro ao alterar a entrada", msgErro)
          }
        })
    }
    this.limparCampos();
  }

  listarEntrada(produtoId: number){
    this.entradaService.listarEntrada(produtoId)
      .subscribe({
        next: (dados) => {
          console.table(dados)
        }, error: (msgErro) => {
          console.log("Erro ao listar as entradas", msgErro)
        }
      })
  }

  carregaProdutos(){
    this.produtoService.listarProdutos()
      .subscribe({
        next: (lista) => {
          this.produtos = lista.filter(p => p.tipoItem === 'P')
          this.cdr.detectChanges()
        },
        error: (err) => console.log('Erro ao listar os produtos', err)
      })
  }

  selecionaProduto(){
    const item = this.produtos.find(p => p.idItem === this.idItem)

    if (item) {
      this.unidade = item.produto?.unidade ?? ''
      this.valorUnitarioEntrada = item.preco
    } else {
      this.unidade = ''
      this.valorUnitarioEntrada = null
    }
  }

  carregaEntradas(){
    this.entradaService.listarEntradas()
      .subscribe({
        next: (lista) => {
          this.entradas = lista.sort((a, b) => b.idEntradaProduto - a.idEntradaProduto)
          this.cdr.detectChanges()
        },
        error: (err) => console.log('Erro ao listar as entradas', err)
      })
  }

  carregaEstoque(){
    this.entradaService.listarEstoque()
      .subscribe({
        next: (lista) => {
          this.estoque_resposta = lista.sort((a,b) => b.idItem - a.idItem)
          this.cdr.detectChanges()
        },
        error: (erro) => console.log('Erro ao listar o estoque.', erro)
      })
  }

  buscaId(e: Entrada) {
    this.router.navigate(['/entrada', e.idEntradaProduto])
  }

  excluir(e: Entrada) {
    if (confirm('Certeza que deseja excluir esse registro de entrada?')) {
      this.entradaService.excluirEntrada(e.idEntradaProduto).subscribe({
        next: () => this.carregaEntradas(),
        error: (erro) => console.log('Erro ao excluir', erro)
      })
    }
  }

  get itemsFiltrados(): Entrada[] {
    return this.entradas.filter(p => {
      const filtraData = !this.dataFilter || p.dataEntradaProduto === this.dataFilter
      return filtraData;
    })
  }
}
