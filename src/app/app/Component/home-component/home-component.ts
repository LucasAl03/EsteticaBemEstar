import { ChangeDetectorRef, Component } from '@angular/core';
import { Produto } from '../../Models/Produto';
import { ActivatedRoute } from '@angular/router';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-home-component',
  styleUrl: './home-component.css',
  templateUrl: './home-component.html',
})
export class HomeComponent {

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private produtoService: ProdutoItem){}

  items: Produto[] =[];

  ngOnInit(){
    this.carregaItem();
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
}
