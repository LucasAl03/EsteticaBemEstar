import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../Service/CarrinhoService/carrinho-service';
import { AtendimentoService } from '../../Service/AtendimentoService/atendimento-service';
import { SessaoService } from '../../Service/SessaoService/sessao-service';
import { Atendimento } from '../../Models/Atendimento';

@Component({
  imports: [CurrencyPipe, FormsModule],
  selector: 'app-carrinho-component',
  styleUrl: './carrinho-component.css',
  templateUrl: './carrinho-component.html',
})
export class CarrinhoComponent {

  carrinho = inject(CarrinhoService);
  atendimentoService = inject(AtendimentoService);
  sessaoService = inject(SessaoService);

  carregando = false;

  alterarQuantidade(idItem: number, quantidade: number) {
    this.carrinho.alterarQuantidade(idItem, quantidade);
  }

  removerItem(idItem: number) {
    this.carrinho.remover(idItem);
  }

  confirmarPedido() {
    // busca a sessao que esta logado
    const sessao = this.sessaoService.sessao();

    if (!sessao) {
      alert('É necessário fazer login para confirmar o pedido.');
      return;
    }

    if (this.carrinho.itens().length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    const pedido = {
      // busca o idPessoa da sessaoAtual
      idPessoa: sessao.idPessoa,

      itens: this.carrinho.itens().map(i => ({
        idItem: i.idItem,
        item: i.item,
        quantidade: i.quantidade,
        valorUnitario: i.valorUnitario,
        idFuncionario: '',
        nomeFuncionario: '',
        cargo: '',
        idAtendimento: 0
      }))
    } as Atendimento;

    this.carregando = true;

    this.atendimentoService.cadastrarAtendimento(pedido)
      .subscribe({

        next: (resposta) => {

          alert('Pedido realizado com sucesso!');

          this.carrinho.limpar();

          this.carregando = false;

          console.log('Atendimento cadastrado:', resposta);
        },

        error: (erro) => {

          console.log('Erro ao confirmar pedido:', erro);

          alert('Não foi possível confirmar o pedido.');

          this.carregando = false;
        }
      });
  }
}