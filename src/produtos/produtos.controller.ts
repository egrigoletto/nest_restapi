import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { get } from 'http';

//rota: /produtos
@Controller('produtos')
export class ProdutosController {
  //instancia o serviço para executar a função de adição
  constructor(private readonly produtosService: ProdutosService) {}
  //apenas haverá chamada a essa função ao usar o método POST do http
  @Post()
  /* retorna objeto, por isso a notação any 
    eu sou obrigado a madnar algo por body, @Body pega o body de uma request
  */
  adicionarProduto(
    @Body() produtoReq: {
      tipo: string,
      descricao: string,
      marca: string,
      preco: number,
    }) {
    const novoProdutoId = this.produtosService.inserirNovoProduto(
      produtoReq.tipo, 
      produtoReq.descricao, 
      produtoReq.marca, 
      produtoReq.preco)

    return {
      mensagem: "Produto gerado com sucesso",
      id: novoProdutoId
    }
  }
  
  @Get(':id')
  retornaProduto(@Param('id') id: string){
    return { produto: this.produtosService.pegaProduto(id) }
  }

  @Get()
  retornaTodosProdutos(){
    return { produtos: this.produtosService.pegaTodosProdutos() }
  }

  @Put(':id')
  alteraDadosProduto(
    @Param('id') id: string, 
    @Body() produtoReq: {
      tipo: string,
      descricao: string,
      marca: string,
      preco: number
    }){ 
      return { produto: this.produtosService.alteraProduto(
        id,
        produtoReq.tipo, 
        produtoReq.descricao, 
        produtoReq.marca, 
        produtoReq.preco
      )}
    }

  @Delete(':id')
  removerProduto(@Param('id') id: string){
    return { result: this.produtosService.apagarProduto(id)}
  }
}