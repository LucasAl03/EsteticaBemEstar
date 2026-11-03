import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';
import { Pessoa } from '../../Models/Pessoa';

@Component({
  imports: [],
  selector: 'app-clientes',
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {
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
