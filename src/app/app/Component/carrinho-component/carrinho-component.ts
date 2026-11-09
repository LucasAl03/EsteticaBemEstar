import { CurrencyPipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../Service/CarrinhoService/carrinho-service';
import { AtendimentoService } from '../../Service/AtendimentoService/atendimento-service';
import { SessaoService } from '../../Service/SessaoService/sessao-service';
import { Atendimento } from '../../Models/Atendimento';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';
import { FuncionarioService } from '../../Service/FuncionarioService/funcionario-service';
import { Router } from '@angular/router';
import { entradaService } from '../../Service/EntradaService/entrada-service';
import { EstoqueResposta } from '../../Models/EstoqueResposta';
import { Produto } from '../../Models/Produto';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { forkJoin } from 'rxjs';

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
  router = inject(Router)
  location = inject(Location)
  entradaService = inject(entradaService)
  cdr = inject(ChangeDetectorRef)
  produtoService = inject(ProdutoItem)

  funcionarios: PessoaFuncionario[] = []
  idFuncionarioSelect: number | null = null

  estoque_resposta: EstoqueResposta[] = []
  produtos: Produto[] = []

  carregando = false;

  ngOnInit(){
    if(!this.sessaoService.sessao()){
      this.router.navigate(['/home'])
    }

    this.carregaDados();
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
    for (const i of this.carrinho.itens()) {
      const ehProduto = this.produtos.some(p => p.idItem === i.idItem)

      if(!ehProduto) continue;

      const estoque = this.estoque_resposta.find(e => e.idItem === i.idItem);
    
      if (!estoque || estoque.quantidadeEstoque < i.quantidade) {
        alert(`O produto não tem estoque suficiente: ${i.item}`);
        return;
      }
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

  carregaDados() {
    forkJoin({
      estoque: this.entradaService.listarEstoque(),
      produtos: this.produtoService.listarProdutos()
    }).subscribe({
      next: ({ estoque, produtos }) => {
        this.estoque_resposta = estoque.sort((a, b) => b.idItem - a.idItem);
        this.produtos = produtos.filter(p => p.tipoItem === 'P');
        this.cdr.detectChanges();
      },
      error: (erro) => console.log('Erro ao carregar estoque e produtos', erro)
    });
  }
}