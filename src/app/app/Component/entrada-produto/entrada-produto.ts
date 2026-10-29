import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntradaService } from '../../Service/EntradaService/entrada-service';
import { FormsModule } from '@angular/forms';
import { Entrada } from '../../Models/Entrada';

@Component({
  imports: [FormsModule],
  selector: 'app-entrada-produto',
  styleUrl: './entrada-produto.css',
  templateUrl: './entrada-produto.html',
})
export class EntradaProduto {
  constructor(private cdr: ChangeDetectorRef, private entradaService: EntradaService, private route: ActivatedRoute){}

  
  IdEntradaProduto = 0
  IdItem = 0
  QuantidadeEntrada = 0
  Unidade = ''
  DataEntradaProduto = ''
  ValorUnitarioEntrada = 0

  editar = false
  produtoId = 0

  ngOnInit(){
    this.produtoId = Number(this.route.snapshot.paramMap.get('IdEntradaProduto'))

    if(this.produtoId > 0){
      this.editar = true
      this.carregaCampo(this.produtoId)
    }
  }

  exibeDados(){
    console.log(this.IdItem, this.QuantidadeEntrada, this.Unidade, this.DataEntradaProduto, this.ValorUnitarioEntrada)

    this.limparCampos();
  }

  limparCampos(){
    this.IdItem = 0
    this.QuantidadeEntrada = 0
    this.Unidade = ''
    this.DataEntradaProduto = ''
    this.ValorUnitarioEntrada = 0
  }
}
