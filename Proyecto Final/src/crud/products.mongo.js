import { Product } from '../table/product.model.js';

class ProductManagerMongo {
    constructor(model) {
        this.Product = model;
    }

    async getProducts(){
        try {
            return await this.Product.find({})
        } catch (err) {
            return new Error("Error al encontrar productos", err)
        }
    }

    async findProductById(id){
        try {
            return await this.Product.findById(id)
        } catch (err) {
            return new Error("Error al encontrar un producto", err)
        }
    }

}

export default ProductManagerMongo;