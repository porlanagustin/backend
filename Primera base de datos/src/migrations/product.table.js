import knex from "knex";

const config = {
    client: 'mysql',
    connection: { 
        host: "127.0.0.1",
        user: "cucho",
        password: "clear1",
        database: "backend"
    },
    pool: { min: 0, max: 7 },
};

const database = knex(config);

const createTable = async () => {
    try {
        await database.schema.dropTableIfExists("product");
        await database.schema.createTable('product', (productTable) =>{
            productTable.increments("id").primary();
            productTable.string("name", 50).notNullable();
            productTable.integer("price").notNullable();
            productTable.string("image").notNullable();
        });

        console.log("Product table created");
        database.destroy();
    } catch(err){
        console.log(`There is an error: ${err}`);
        database.destroy();
    }
};

createTable();