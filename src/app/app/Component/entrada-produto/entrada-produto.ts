import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Entrada } from '../../Models/Entrada';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { entradaService } from '../../Service/EntradaService/entrada-service';
import { Produto } from '../../Models/Produto';

@Component({
  imports: [FormsModule],
  selector: 'app-entrada-produto',
  styleUrl: './entrada-produto.css',
  templateUrl: './entrada-produto.html',
})
export class EntradaProduto implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private entradaService: entradaService, private route: ActivatedRoute, private produtoService: ProdutoItem){}

  // declaração dos atributos para Entrada
  IdEntradaProduto = 0
  IdItem = 0
  QuantidadeEntrada: number | null = null
  Unidade = ''
  DataEntradaProduto = ''
  ValorUnitarioEntrada: number | null = null

  // array do objeto Produto 
  produtos: Produto[] = []

  editar = false
  produtoId = 0

  ngOnInit(){
    this.produtoId = Number(this.route.snapshot.paramMap.get('IdEntradaProduto'))

    if(this.produtoId > 0){
      this.editar = true
      this.carregaCampo(this.produtoId)
    }

    this.carregaProdutos()
  }

  exibeDados(){
    console.log(this.IdItem, this.QuantidadeEntrada, this.Unidade, this.DataEntradaProduto, this.ValorUnitarioEntrada)

    this.limparCampos();
  }

  limparCampos(){
    this.IdItem = 0
    this.QuantidadeEntrada = null
    this.Unidade = ''
    this.DataEntradaProduto = ''
    this.ValorUnitarioEntrada = null
  }

  carregaCampo(produtoId: number){
    this.entradaService.listarEntrada(produtoId)
      .subscribe({
        next: (objProduto) => {
          this.IdEntradaProduto = objProduto.IdEntradaProduto
          this.IdItem = objProduto.IdItem
          this.QuantidadeEntrada = objProduto.QuantidadeEntrada
          this.Unidade = objProduto.Unidade
          this.DataEntradaProduto = objProduto.DataEntradaProduto
          this.ValorUnitarioEntrada = objProduto.ValorUnitarioEntrada

          this.cdr.detectChanges()
      }, error: (msgErro) =>{
        console.log("Erro ao listar o produto", msgErro)
      }
      })
  }

  enviaDados(){
    const produto = new Entrada()
    produto.IdItem = this.IdItem
    produto.QuantidadeEntrada = this.QuantidadeEntrada
    produto.Unidade = this.Unidade
    produto.DataEntradaProduto = this.DataEntradaProduto
    produto.ValorUnitarioEntrada = (this.ValorUnitarioEntrada)

    if(!this.editar){
      this.entradaService.cadastrarEntrada(produto)
        .subscribe({
          next: (resposta) => {
            console.log(resposta)
          }, error: (msgErro) => {
            console.log("Erro ao cadastrar a entrada.", msgErro)
          }
        })
    } else {
      produto.IdEntradaProduto = this.produtoId

      this.entradaService.alterarEntrada(produto)
        .subscribe({
          next: (resposta) => {
            console.log(produto)
            console.log(resposta)
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
          this.produtos = lista.filter(p => p.TipoItem === 'P')
          this.cdr.detectChanges()
        },
        error: (err) => console.log('Erro ao listar os produtos', err)
      })
  }

  selecionaProduto(){
    const produto = this.produtos.find(p => p.IdItem === this.IdItem)

    if (produto) {
      this.Unidade = produto.Unidade
      this.ValorUnitarioEntrada = produto.Preco
    } else {
      this.Unidade = ''
      this.ValorUnitarioEntrada = null
    }
  }
}
