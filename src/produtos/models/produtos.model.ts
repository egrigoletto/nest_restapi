export class Produto {
  id: string;
  tipo: string;
  descricao: string;
  marca: string;
  preco: number;
  constructor(
    id: string,
    tipo: string,
    desc: string,
    marca: string,
    preco: number,
  ) {
    this.id = id;
    this.tipo = tipo;
    this.descricao = desc;
    this.marca = marca;
    this.preco = preco;
  };
}