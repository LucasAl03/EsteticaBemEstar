import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntradaService } from '../../Service/EntradaService/entrada-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-entrada-produto',
  styleUrl: './entrada-produto.css',
  templateUrl: './entrada-produto.html',
})
export class EntradaProduto {
  constructor(private cdr: ChangeDetectorRef, private pessoaService: EntradaService, private route: ActivatedRoute){}

  
  IdEntradaProduto = 0
  IdItem = 0
  QuantidadeEntrada = 0
  Unidade = ''
  DataEntradaProduto = ''
  ValorUnitarioEntrada = 0

  exibeDados(){
    console.log(this.IdItem, this.QuantidadeEntrada, this.Unidade, this.DataEntradaProduto, this.ValorUnitarioEntrada)
  }

  limparCampos(){
    this.IdItem = 0
    this.QuantidadeEntrada = 0
    this.Unidade = ''
    this.DataEntradaProduto = ''
    this.ValorUnitarioEntrada = 0
  }
}
