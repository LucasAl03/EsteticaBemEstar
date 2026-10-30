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
  idEntradaProduto = 0
  idItem = 0
  quantidadeEntrada: number | null = null
  unidade = ''
  dataEntradaProduto = ''
  valorUnitarioEntrada: number | null = null

  // array do objeto Produto 
  produtos: Produto[] = []

  entradas: Entrada[] = []

  editar = false
  produtoId = 0

  ngOnInit(){
    this.produtoId = Number(this.route.snapshot.paramMap.get('idEntradaProduto'))

    if(this.produtoId > 0){
      this.editar = true
      this.carregaCampo(this.produtoId)
    }

    this.carregaProdutos()
    this.carregaEntradas()
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
    const produto = this.produtos.find(p => p.idItem === this.idItem)

    if (produto) {
      this.unidade = produto.unidade
      this.valorUnitarioEntrada = produto.preco
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
}
