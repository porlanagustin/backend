import knex from "knex";

class Contenedor {
    constructor(databaseConfig, tableName) {
        this.database = knex(databaseConfig);
        this.table = tableName;
    }

    // SAVE PRODUCT
    async save(name, price) {
        try {
            const newProduct = await this.database(this.table).insert({ name, price: Number(price)});

            return newProduct;
        } catch (err){
            throw new Error(`Failed to save a new object: ${err}`);
        }
    }

    // GET PRODUCTS
    async getAll() {
        try {
            const response = await this.database.from(this.table).select('*');
            return response;
        } catch {
            return { error: "product not found"}
        }
    }

    // REPLACE PRODUCTS
    async replace(id, product) {
        try {
            const response = await this.database(this.table).where({id}).update(product);

            return response;

        }catch (err){
            throw new Error(`error: product no finded`);
        }
    }

    // GET PRODUCT BY ID
    async getById(id) {
        try {
            const product = await this.database.from(this.table).select("*").where({id});
            return product;
        } catch(err){
            return { error: "product not found"}
        }
    }

    // DELETE BY ID
    async deleteById(id) {
        try {
            await this.database(this.table).del().where({id});

            return true;
        } catch (err){
            throw new Error(`Error to delete data: ${err}`);
        }
    }

    // DELETE ALL
    async deleteAll() {
        try {
            await this.database(this.table).del();

            return true;
        } catch (err){
            throw new Error(`Error to delete all: ${err}`);
        }
    }
}

export default Contenedor;