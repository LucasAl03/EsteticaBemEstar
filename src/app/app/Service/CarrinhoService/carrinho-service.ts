
import { Injectable, computed, signal } from '@angular/core';
import { Produto } from '../../Models/Produto';

export interface CarrinhoItem {
  idItem: number;
  item: string;
  tipoItem: 'P' | 'S';
  quantidade: number;
  valorUnitario: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly CHAVE = 'carrinho';

  private itensCarrinho = signal<CarrinhoItem[]>(this.lerStorage());

  // Lista de itens
  readonly itens = this.itensCarrinho.asReadonly();

  // Quantidade total de unidades
  readonly totalItens = computed(() =>
    this.itensCarrinho().reduce(
      (total, i) => total + i.quantidade, 0
    )
  );

  // Valor total do carrinho
  readonly totalValor = computed(() =>
    this.itensCarrinho().reduce(
      (total, i) => total + (i.quantidade * i.valorUnitario), 0
    )
  );

  // Adicionar produto ou serviço
  adicionar(p: Produto): void {

    const valor = p.tipoItem === 'P'
      ? Number(p.produto?.precoVenda ?? 0)
      : Number(p.preco ?? 0);

    const lista = [...this.itensCarrinho()];

    const existente = lista.find(i => i.idItem === p.idItem);

    if (existente) {
      existente.quantidade++;
    } else {
      lista.push({
        idItem: p.idItem,
        item: p.item,
        tipoItem: p.tipoItem as 'P' | 'S',
        quantidade: 1,
        valorUnitario: valor
      });
    }

    this.atualizar(lista);
  }

  // Alterar quantidade
  alterarQuantidade(idItem: number, quantidade: number): void {

    const qtd = Math.floor(Number(quantidade));

    if (!Number.isFinite(qtd) || qtd < 1) {
      return;
    }

    const lista = this.itensCarrinho().map(i =>
      i.idItem === idItem
        ? { ...i, quantidade: qtd }
        : i
    );

    this.atualizar(lista);
  }

  // Remover item
  remover(idItem: number): void {

    const lista = this.itensCarrinho().filter(
      i => i.idItem !== idItem
    );

    this.atualizar(lista);
  }

  // Limpar carrinho
  limpar(): void {
    this.atualizar([]);
  }

  // Atualizar estado e sessionStorage
  private atualizar(lista: CarrinhoItem[]): void {

    this.itensCarrinho.set(lista);

    try {
      sessionStorage.setItem(this.CHAVE, JSON.stringify(lista));
    } catch (erro) {
      console.log('Erro ao salvar carrinho', erro);
    }
  }

  // Recuperar carrinho salvo
  private lerStorage(): CarrinhoItem[] {

    try {
      const dados = sessionStorage.getItem(this.CHAVE);

      return dados ? JSON.parse(dados) as CarrinhoItem[] : [];

    } catch {
      return [];
    }
  }
}
