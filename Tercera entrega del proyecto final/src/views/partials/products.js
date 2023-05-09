import { Product } from '../../table/product.model.js';

const products = await Product.find();

    if (products) {
      console.log(products)
    }