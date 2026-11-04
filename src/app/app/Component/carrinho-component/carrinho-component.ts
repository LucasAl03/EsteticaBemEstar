import { Injectable, computed, signal } from '@angular/core';
import { Produto } from '../../Models/Produto';
import { AtendimentoItem } from '../../Models/Atendimento';

@Injectable({ providedIn: 'root' })
export class CarrinhoComponent {

  itens = signal<AtendimentoItem[]>([]);

  quantidadeTotal = computed(() =>
    this.itens().reduce((soma, i) => soma + i.quantidade, 0)
  );

  total = computed(() =>
    this.itens().reduce((soma, i) => soma + i.valorUnitario * i.quantidade, 0)
  );

  adicionar(p: Produto) {
    const preco = p.tipoItem === 'P' ? (p.produto?.precoVenda ?? 0) : (p.preco ?? 0);
    const existente = this.itens().find(i => i.idItem === p.idItem);

    if (existente) {
      this.alterarQuantidade(p.idItem, 1);
      return;
    }

    const novo = new AtendimentoItem();
    novo.idItem = p.idItem;
    novo.item = p.item;
    novo.quantidade = 1;
    novo.valorUnitario = preco;

    this.itens.set([...this.itens(), novo]);
  }

  alterarQuantidade(idItem: number, delta: number) {
    this.itens.set(
      this.itens()
        .map(i => i.idItem === idItem ? { ...i, quantidade: i.quantidade + delta } : i)
        .filter(i => i.quantidade > 0)
    );
  }

  remover(idItem: number) {
    this.itens.set(this.itens().filter(i => i.idItem !== idItem));
  }

  limpar() {
    this.itens.set([]);
  }
}