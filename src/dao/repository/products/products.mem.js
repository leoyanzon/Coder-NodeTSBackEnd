
class ProductsMem{
    constructor(){
        this.products = [];
    }
    
    async save(_objeto){
        try{
            const id = this.products.length >= 1 ? this.products[this.products.length-1].id + 1 : 1
            this.products.push({..._objeto, id:id});
            return id
        } catch (err){
            console.error("Error al guardar objeto:", err);
        }
    }
    async getAll(){
        try{
            return this.products;
        } catch (err){
            console.error("no existe el archivo:", err.message)
        }
    }
    async getById(_id){
        try{
            return this.products.filter(it => it.id === _id);
        } catch(err) {
            console.log("Error en la busqueda", err.message);
        }
    }
    async deleteById(_id){
        try{
            return this.products.filter(it => it.id != _id);
        } catch(err) {
            console.log("Error en el proceso de eliminacion", err.message);
        }
    }
    async deleteAll(){
        try{
            this.products = [];
        } catch(err) {
            console.log("Error en la eliminacion", err.message);
        }
    }
}

module.exports = ProductsMem;