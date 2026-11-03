import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pedidos-component',
  styleUrl: './pedidos-component.css',
  templateUrl: './pedidos-component.html',
})
export class PedidosComponent {
  constructor (private cdr: ChangeDetectorRef, private pessoaService: PessoaService, private route: ActivatedRoute, private router: Router){}

  pessoa: Pessoa[] = []
  
    ngOnInit(){
      this.carregaPessoa();
    }
  
    carregaPessoa(){
      this.pessoaService.listarPessoas()
        .subscribe({
          next: (lista) => {
            this.pessoa = lista.sort((a, b) => b.idPessoa - a.idPessoa)
            this.cdr.detectChanges()
          },
          error: (erro) => console.log('Erro ao listar os clientes', erro)
        })
    }

    buscaId(p: Pessoa) {
      this.router.navigate(['/cadastro', p.idPessoa])
    }

  excluir(p: Pessoa) {
    if (confirm('Certeza que deseja excluir o registro deste cliente?')) {
      this.pessoaService.excluirPessoa(p.idPessoa).subscribe({
        next: () => this.carregaPessoa(),
        error: (erro) => console.log('Erro ao excluir', erro)
      })
    }
  }
}
