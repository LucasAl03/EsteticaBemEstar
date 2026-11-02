import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../Service/PessoaService/pessoa-service';
import { Pessoa } from '../../Models/Pessoa';

@Component({
  imports: [],
  selector: 'app-clientes',
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private pessoaService: PessoaService, private route: ActivatedRoute){}

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

    
}
