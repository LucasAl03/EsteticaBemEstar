import { Produto } from "./Produto"

export interface Categoria {
    idCategoria: number
    categoria: string
    items: Produto[]
}