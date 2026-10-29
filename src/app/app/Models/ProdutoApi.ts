export interface ProdutoApi {
    idItem: number
    idCategoria: number
    item: string
    descricaoItem: string
    preco: number | null
    tipoItem: string
    ativoProdutoServico: string
    produto: ProdutoDetalheApi | null
  }
  
  export interface ProdutoDetalheApi {
    precoVenda: number | null
    unidade: string
    codigoPreco: number | null
  }