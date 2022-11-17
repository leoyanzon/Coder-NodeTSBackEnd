fs = require("fs");

class ProductService{
    constructor(){
        this.ruta = __dirname + "/products.json";
    }

    async getAllProducts(){
        try{
            const productsRaw = await fs.promises.readFile(this.ruta);
            return ({
                success: true,
                data: JSON.parse(productsRaw)
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async getProduct(uuid){
        try{
            const productsRaw = await fs.promises.readFile(this.ruta);
            const productsObject = JSON.parse(productsRaw);
            const product = productsObject.filter(it => it.uuid == uuid)
            return ({
                success: true,
                data: product[0]
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async createProduct(data){
        try{
            console.log(data)
            const productsRaw = await fs.promises.readFile(this.ruta);
            const productsObject = JSON.parse(productsRaw);
            productsObject.push(data);
            await fs.promises.writeFile(this.ruta, JSON.stringify(productsObject));
            return ({
                success: true,
                data: `Product ${data.uuid} created successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async updateProduct(uuid, data){
        try{
            const productsRaw = await fs.promises.readFile(this.ruta);
            const productsObject = JSON.parse(productsRaw);
            const productsNew = productsObject.map(it => (it.uuid == uuid) ? data : it)            
            await fs.promises.writeFile(this.ruta, JSON.stringify(productsNew));
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
        }
    }

    async deleteProduct(uuid){
        try{
            const productsRaw = await fs.promises.readFile(this.ruta);
            const productsObject = JSON.parse(productsRaw);
            const filteredProducts = productsObject.filter(it => it.uuid !== uuid)
            await fs.promises.writeFile(this.ruta, JSON.stringify(filteredProducts));
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
        }
    }
}

module.exports = ProductService;