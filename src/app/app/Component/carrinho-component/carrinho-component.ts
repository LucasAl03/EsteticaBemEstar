import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../Service/CarrinhoService/carrinho-service';
import { AtendimentoService } from '../../Service/AtendimentoService/atendimento-service';
import { SessaoService } from '../../Service/SessaoService/sessao-service';
import { Atendimento } from '../../Models/Atendimento';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';
import { FuncionarioService } from '../../Service/FuncionarioService/funcionario-service';

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
  funcionarioService = inject(FuncionarioService)

  funcionarios: PessoaFuncionario[] = []
  idFuncionarioSelect: number | null = null

  carregando = false;

  ngOnInit(){
    this.carregaFuncionarios();
  }

  carregaFuncionarios(){
    this.funcionarioService.listarFuncionarios()
      .subscribe({
        next: (lista) => {
          this.funcionarios = lista.filter(f => f.funcionario !== null)
        },
        error: (erro) => {
          console.log('Erro ao listar os funcionarios', erro)
          alert('Não foi possivel carregar os funcionarios')
        }
      })
  }

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

    if (this.idFuncionarioSelect === null) {
      alert('Selecione um funcionário para confirmar o pedido.');
      return;
    }

    const hoje = new Date();
    const dataAtendimento = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

    const pedido = {
      // busca o idPessoa da sessaoAtual
      idPessoa: sessao.idPessoa,
      dataAtendimento: dataAtendimento,
      statusAtendimento: 'A',

      itens: this.carrinho.itens().map(i => ({
        idItem: i.idItem,
        quantidade: i.quantidade,
        valorUnitario: i.valorUnitario,
        idFuncionario: this.idFuncionarioSelect!,
      }))
    } as unknown as Atendimento;

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