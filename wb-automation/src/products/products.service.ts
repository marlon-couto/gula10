import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly products: Product[];

  create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto);
    this.products.push(product);
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((x) => x.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((x) => x.id === id);
    this.products[productIndex] = updateProductDto;
  }

  remove(id: number) {
    const productIndex = this.products.findIndex((x) => x.id === id);
    this.products.splice(productIndex, 1);
  }
}
