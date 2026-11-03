import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../Service/CategoriaService/categoria-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../Models/Categoria';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-categoria',
  styleUrl: './cadastro-categoria.css',
  templateUrl: './cadastro-categoria.html',
})
export class CadastroCategoria implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private categoriaService: CategoriaService, private router: Router ){}

  idCategoria = 0
  categoria = ''

  categoriaId = 0
  editar = false

  catego: Categoria[] = []

  ngOnInit() {
    this.carregaCategorias()

    this.route.paramMap.subscribe(params => {
      this.categoriaId = Number(params.get('idCategoria'))

      if (this.categoriaId > 0) {
        this.editar = true
        this.carregaCampo(this.categoriaId)
      } else {
        this.editar = false
        this.idCategoria = 0
        this.limparCampos()
      }
    })
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
          console.log(objCategoria)

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
              this.carregaCategorias()
              this.limparCampos()
            }, error: (msgErro) => {
              console.log("Erro ao cadastrar a nova categoria.", msgErro)
            }
          })
      } else {
        catego.idCategoria = this.categoriaId
  
        this.categoriaService.alterarCategoria(catego)
          .subscribe({
            next: (resposta) => {
              console.log(resposta)
              this.carregaCategorias()
              this.limparCampos()
              this.router.navigate(['/categoria-cadastra'])
            }, error: (msgErro) => {
              console.log("Erro ao alterar a categoria", msgErro)
            }
          })
      }
    }

    listarCategoria(categoriaId: number){
      this.categoriaService.listarCategoria(categoriaId)
        .subscribe({
          next: () => {
            console.log()
          }, error: (msgErro) => {
            console.log("Erro ao listar a categoria", msgErro)
          }
        })
    }

    carregaCategorias(){
    this.categoriaService.listarCategorias()
      .subscribe({
        next: (lista) => {
          this.catego = lista.sort((a,b) => b.idCategoria - a.idCategoria)
          this.cdr.detectChanges()
        },
        error: (err) => console.log('Erro ao listar as categorias', err)
      })
    }

  buscaId(c: Categoria) {
    this.router.navigate(['/categoria-cadastra', c.idCategoria])
  }
  
  excluir(c: Categoria) {
    if (confirm('Certeza que deseja excluir o esta categoria?')) {
      this.categoriaService.excluirCategoria(c.idCategoria)
        .subscribe({
          next: () => this.carregaCategorias(),
          error: (erro) => console.log('Existem produtos e serviços ligados a esta categoria.', erro)
        })
    }
  }
}
