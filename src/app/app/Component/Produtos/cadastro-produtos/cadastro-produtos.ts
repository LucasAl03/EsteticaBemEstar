import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoItem } from '../../../Service/ProdutoItem/produto-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-produtos',
  styleUrl: './cadastro-produtos.css',
  templateUrl: './cadastro-produtos.html',
})
export class CadastroProdutos implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private produtoService: ProdutoItem, private route: ActivatedRoute){}

  idItem = 0
  idCategoria = 0
  item = ''
  descricaoItem = ''
  preco = null
  tipoItem = ''
  ativoProdutoServico = ''
  precoVenda = null
  unidade = ''
  codigoPreco = null

  produtoId = 0
  editar = false

  limparCampos(){
  }

  ngOnInit(){
    this.produtoId = Number(this.route.snapshot.paramMap.get('idItem'))

    if(this.produtoId > 0){
      this.editar = true

    }
  }

  carregaCampo(){

  }
}

/*
this.pessoaId = Number(this.route.snapshot.paramMap.get('idPessoa'))

    this.carregaCpfs()

    if(this.pessoaId > 0){
      this.editar = true
      this.carregaCampo(this.pessoaId)
    }
*/