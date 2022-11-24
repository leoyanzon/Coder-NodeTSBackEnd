//const fs = require('fs');

const { options } = require('../db/mariaDB');
const knex = require('knex')(options);

class ProductService{
    constructor(){
        //this.ruta = __dirname + "/products.json";
        this.tableName = 'products';
        // knex.schema.createTable(this.tableName, table =>{
        //     table.increments('id')
        //     table.string('name')
        //     table.string('description')
        //     table.integer('price')
        //     table.string('code')
        //     table.string('thumbnail')
        //     table.string('uuid')
        //     table.integer('stock')
        //     table.integer('timestamp')
        // })
        // .then(()=> console.log("table created"))
        // .catch((err)=>{
        //     console.log(err);
        //     throw err
        // })
        // .finally(()=>{
        //     knex.destroy();
        // })
    }

    async getAllProducts(){
        try{
            const data = await knex.from(this.tableName).select("*")
            const object = Object.values(JSON.parse(JSON.stringify(data)))
            return ({
                success: true,
                data: object
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        } finally {
            //knex.destroy();
        }
    }

    async getProduct(uuid){
        try{
            const data = await knex.from(this.tableName).select("*").where('uuid','=',uuid)
            const object = Object.values(JSON.parse(JSON.stringify(data)))
            return ({
                success: true,
                data: object
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        } finally {
            //knex.destroy();
        }
    }

    async createProduct(dataToInsert){
        try{
            const data = await knex.from(this.tableName).insert([dataToInsert])
            return ({
                success: true,
                data: `Product ${dataToInsert.uuid} created successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        } finally {
            //knex.destroy();
        }
    }

    async updateProduct(uuid, dataToInsert){
        try{
            const data = await knex.from(this.tableName).where('uuid', '=', uuid).update([dataToInsert]);
            return ({
                success: true,
                data: `Product ${uuid} updated successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        } finally {
            //knex.destroy();
        }
    }

    async deleteProduct(uuid){
        try{
            const data = knex.from(this.tableName).where('uuid', '=', uuid).del();
            return ({
                success: true,
                data: `Product ${uuid} deleted successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        } finally {
            //knex.destroy();
        }
    }
}

module.exports = ProductService;