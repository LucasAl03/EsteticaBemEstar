// para tipar o EntradaProdEstoque que vem da api

import { Entrada } from "./Entrada"

export interface EstoqueResposta {
    quantidadeEstoque: number
    entradaProdutos: Entrada[]
}