import { Carts } from '../table/cart.model.js';

class CartManagerMongo {
  constructor(model) {
    this.Carts = model;
  }

  async createCart(username) {
    try {
      return await this.Carts.create({ products: [], username: username });
    } catch (error) {
      throw new Error("Error al crear carrito", error);
    }
  }

  async findOneCart(username) {
    try {
      const cart = await this.Carts.findOne({ username: username }).lean();
      if (!cart) throw new Error("No se encontro un carrito");
      return cart;
    } catch (error) {
      throw new Error("Error al buscar el carrito", error);
    }
  }

  async updateOneCart(username, newCart) {
    try {
      const updatedCart = await this.Carts.findOneAndUpdate({ username: username }, newCart, { new: true });
      if (!updatedCart) throw new Error("No se pudo modificar el carrito");
      return updatedCart;
    } catch (error) {
      throw new Error("Error al actualizar el carrito", error);
    }
  }

  async findCartById(cartId) {
    try {
      const cart = await this.Carts.findById(cartId);
      if (!cart) throw new Error("No se encontro un carrito");
      return cart;
    } catch (error) {
      throw new Error("Error al buscar el carrito", error);
    }
  }

  async findCartByUsername(username) {
    try {
      const cart = await this.Carts.findOne({ username: username });
      if (!cart) throw new Error("No se encontro un carrito");
      return cart;
    } catch (error) {
      throw new Error("Error al buscar el carrito", error);
    }
  }
}

export default CartManagerMongo;