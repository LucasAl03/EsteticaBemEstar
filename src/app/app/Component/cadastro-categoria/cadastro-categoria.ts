import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../Service/CategoriaService/categoria-service';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../Models/Categoria';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-categoria',
  styleUrl: './cadastro-categoria.css',
  templateUrl: './cadastro-categoria.html',
})
export class CadastroCategoria implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private categoriaService: CategoriaService ){}

  idCategoria = 0
  categoria = ''

  categoriaId = 0
  editar = false

  catego: Categoria[] = []

  ngOnInit(): void {
      this.categoriaId = Number(this.route.snapshot.paramMap.get('idCategoria'))

      if(this.categoriaId > 0){
        this.editar = true
        this.carregaCampo(this.categoriaId)
      }

      this.carregaCategorias();
  }

  limparCampos(){
    this.categoria = ''
  }

  carregaCampo(categoriaId: number){
    this.categoriaService.listarCategoria(categoriaId)
      .subscribe({
        next: (objCategoria) => {
          this.idCategoria = objCategoria.idCategoria
          this.categoria = objCategoria.categoria

          this.cdr.detectChanges();
        }, error: (msgErro) => {
          console.log("Erro ao listar a categoria", msgErro)
        }
      })
  }

  enviaDados(){
      const catego = new Categoria()
      catego.categoria = this.categoria
  
      if(!this.editar){
        this.categoriaService.cadastrarCategoria(catego)
          .subscribe({
            next: (resposta) => {
              console.log(resposta)
            }, error: (msgErro) => {
              console.log("Erro ao cadastrar a nova categoria.", msgErro)
            }
          })
      } else {
        catego.idCategoria = this.categoriaId
  
        this.categoriaService.alterarCategoria(catego)
          .subscribe({
            next: (resposta) => {
              console.log(catego)
              console.log(resposta)
            }, error: (msgErro) => {
              console.log("Erro ao alterar a categoria", msgErro)
            }
          })
      }
      this.limparCampos();
    }

    listarCategoria(categoriaId: number){
      this.categoriaService.listarCategoria(categoriaId)
        .subscribe({
          next: (dados) => {
            console.table(dados)
          }, error: (msgErro) => {
            console.log("Erro ao listar a categoria", msgErro)
          }
        })
    }

    carregaCategorias(){
    this.categoriaService.listarCategorias()
      .subscribe({
        next: (lista) => {
          console.log(lista)
          this.catego = lista.sort((a,b) => b.idCategoria - a.idCategoria)
          this.cdr.detectChanges()
        },
        error: (err) => console.log('Erro ao listar as categorias', err)
      })
  }
}
