
import { CurrencyPipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Atendimento, AtendimentoItem } from '../../Models/Atendimento';
import { Produto } from '../../Models/Produto';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';

import { AtendimentoService } from '../../Service/AtendimentoService/atendimento-service';
import { ProdutoItem } from '../../Service/ProdutoItem/produto-item';
import { FuncionarioService } from '../../Service/FuncionarioService/funcionario-service';
import { SessaoService } from '../../Service/SessaoService/sessao-service';

@Component({
  imports: [FormsModule, CurrencyPipe],
  selector: 'app-editar-pedidos',
  styleUrl: './editar-pedidos.css',
  templateUrl: './editar-pedidos.html',
})
export class EditarPedidos implements OnInit {

  private sessao = inject(SessaoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private location = inject(Location)

  private atendimentoService = inject(AtendimentoService);
  private produtoService = inject(ProdutoItem);
  private funcionarioService = inject(FuncionarioService);

  atendimento: Atendimento = new Atendimento();

  produtos: Produto[] = [];
  funcionarios: PessoaFuncionario[] = [];

  carregando = false;
  salvando = false;



  ngOnInit(): void {
    this.carregaProdutos();
    this.carregaFuncionarios();

    if(!this.sessao.logado()){
      this.router.navigate(['/home'])
      return
    }

    const id = Number(this.route.snapshot.paramMap.get('idAtendimento'));

    if (!id || !Number.isInteger(id)) {
      alert('Identificador do atendimento inválido.');
      this.router.navigate(['/pedidos']);
      return;
    }

    this.carregaAtendimento(id);    
  }

  get podeEditar(): boolean {
    const s = this.sessao.sessao();
    if (!s) return false;
  
    return (
      this.sessao.cargo() === 'Administrador'
    );
  }

  carregaAtendimento(id: number): void {
    this.carregando = true;

    this.atendimentoService.listarAtendimento(id).subscribe({
      next: (resposta) => {
        this.atendimento = resposta;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.log('Erro ao carregar atendimento:', erro);
        alert('Não foi possível carregar o atendimento.');
        this.carregando = false;
        this.router.navigate(['/pedidos']);
      }
    });
  }

  carregaProdutos(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (lista) => {
        this.produtos = lista.filter(p => p.ativoProdutoServico === 'S');
        this.cdr.detectChanges();
      },
      error: (erro) => console.log('Erro ao carregar produtos:', erro)
    });
  }

  carregaFuncionarios(): void {
    this.funcionarioService.listarFuncionarios().subscribe({
      next: (lista) => {
        this.funcionarios = lista.filter(f => f.funcionario !== null);
        this.cdr.detectChanges();
      },
      error: (erro) => console.log('Erro ao carregar funcionários:', erro)
    });
  }

  adicionarItem(): void {
    const novoItem = new AtendimentoItem();

    novoItem.idAtendimento = this.atendimento.idAtendimento;
    novoItem.quantidade = 1;
    novoItem.valorUnitario = 0;

    this.atendimento.itens.push(novoItem);
  }

  removerItem(index: number): void {
    this.atendimento.itens.splice(index, 1);
  }

  selecionarProduto(item: AtendimentoItem): void {
    const produto = this.produtos.find(p => p.idItem === item.idItem);

    if (!produto) return;

    item.item = produto.item;

    item.valorUnitario = Number(
      produto.tipoItem === 'P'
        ? produto.produto?.precoVenda ?? 0
        : produto.preco ?? 0
    );
  }

  salvarAlteracoes(): void {
    if (!this.atendimento.idAtendimento) {
      alert('Atendimento inválido.');
      return;
    }

    if (this.atendimento.itens.length === 0) {
      alert('Adicione pelo menos um item ao atendimento.');
      return;
    }

    const itensInvalidos = this.atendimento.itens.some(i =>
      !i.idItem ||
      !i.idFuncionario ||
      i.quantidade < 1 ||
      i.valorUnitario < 0
    );

    if (itensInvalidos) {
      alert('Confira os itens, funcionários, quantidades e valores.');
      return;
    }

    const pedido = {
      idAtendimento: this.atendimento.idAtendimento,
      idPessoa: this.atendimento.idPessoa,
      dataAtendimento: this.atendimento.dataAtendimento,
      statusAtendimento: this.atendimento.statusAtendimento,

      itens: this.atendimento.itens.map(i => ({
        idAtendimento: this.atendimento.idAtendimento,
        idItem: Number(i.idItem),
        idFuncionario: Number(i.idFuncionario),
        quantidade: Number(i.quantidade),
        valorUnitario: Number(i.valorUnitario)
      }))
    };

    this.salvando = true;

    this.atendimentoService.alterarAtendimento(pedido as Atendimento).subscribe({
      next: () => {
        alert('Atendimento atualizado com sucesso!');
        this.salvando = false;
        this.router.navigate(['/pedido-component']);
      },
      error: (erro) => {
        console.log('Erro ao atualizar atendimento:', erro);
        alert('Não foi possível atualizar o atendimento.');
        this.salvando = false;
      }
    });
  }

  voltar(): void {
    this.location.back();
    return
  }
}
