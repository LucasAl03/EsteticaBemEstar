// para tipar o EntradaProdEstoque que vem da api

import { Entrada } from "./Entrada"

export interface EstoqueResposta {
    iditem: number
    quantidadeEstoque: number
    entradaProdutos: Entrada[]
}