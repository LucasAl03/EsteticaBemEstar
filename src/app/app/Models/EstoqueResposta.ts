import { Entrada } from "./Entrada"

export interface EstoqueResposta {
    iditem: number
    quantidadeEstoque: number
    entradaProdutos: Entrada[]
}