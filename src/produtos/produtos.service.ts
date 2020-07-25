import { Injectable, NotFoundException } from "@nestjs/common";
import { Produto } from './models/produtos.model';

@Injectable()
export class ProdutosService {
  private produtos: Produto[] = [];
  inserirNovoProduto(
    tipo: string,
    desc: string,
    marca: string,
    preco: number) {
      const novoId = Math.floor(Math.random() * 10).toString()
      const novoProduto =  new Produto(novoId, tipo, desc, marca, preco)
        //como não há banco de dados aqui, ele só adiciona num array em memória
        this.produtos.push(novoProduto)
        return { novoId }
    }

    pegaTodosProdutos() {
      return [...this.produtos]
    }

    pegaProduto(id: string) {
      const produtoSelecionado = this.filtroProduto(id)[0]
      return {...produtoSelecionado} 
    }

    alteraProduto(
      id: string,
      tipo: string,
      desc: string,
      marca: string,
      preco: number){
      const [produto, indice] = this.filtroProduto(id)
      const produtoAtualizado = {...produto}
      if (tipo)
        produtoAtualizado.tipo = tipo
      if (desc)
        produtoAtualizado.descricao = desc
      if (marca)
        produtoAtualizado.marca = marca
      if (preco)
        produtoAtualizado.preco = preco
      
      this.produtos[indice] = produtoAtualizado
      const result = this.produtos[indice] 
      return { result }
    }

    apagarProduto(id: string) {
      const produtoSelecionado = this.filtroProduto(id)[0]
      const novListaProdutos = this.produtos.filter(produto => produto.id !== produtoSelecionado.id)
      this.produtos = novListaProdutos
      return {
        message: `Produto id ${id} removido com sucesso`
      }       
    }

    private filtroProduto(id): [Produto, number] {
      const indice = this.produtos.findIndex(produto => produto.id === id)
      const selectProd = this.produtos[indice]
      if (!selectProd)
        throw new NotFoundException('Produto não encontrado')
      else 
        return [ selectProd, indice ]
    }
}