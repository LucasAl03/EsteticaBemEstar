import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdutoItem } from '../../../Service/ProdutoItem/produto-item';
import { ActivatedRoute } from '@angular/router';
import { entradaService } from '../../../Service/EntradaService/entrada-service';
import { Produto } from '../../../Models/Produto';

@Component({
  imports: [],
  selector: 'app-servicos',
  styleUrl: './servicos.css',
  templateUrl: './servicos.html',
})
export class Servicos implements OnInit{

  constructor(private cdr: ChangeDetectorRef, private entradaService: entradaService, private route: ActivatedRoute, private produtoService: ProdutoItem){}

  
  produtos: Produto[] = []

  ngOnInit(){
    this.carregaProdutos()
  }

  carregaProdutos(){
    this.produtoService.listarProdutos()
      .subscribe({
        next: (lista) => {
          this.produtos = lista.filter(p => p.TipoItem === 'S')
          this.cdr.detectChanges()
        },
        error: (err) => console.log('Erro ao listar os produtos', err)
      })
  }
}
