import { CreateProductDto } from '../dto/create-product.dto';

export class Product {
  id: number;

  constructor(createProductDto: CreateProductDto) {
    this.id = createProductDto.id;
  }
}
