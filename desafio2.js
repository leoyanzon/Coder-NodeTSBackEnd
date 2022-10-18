const fs = require('fs');

class Contenedor {
    constructor(_nombreArchivo){
        this.ruta = `./${_nombreArchivo}.txt`
        this.createFile();
    }
    async createFile(){
        try{
            await fs.promises.writeFile(this.ruta, "");
        } catch (err) {
            console.log("Error al crear archivo", err.message);
        }
    }
    async save(_objeto){
        try{
            const objetosExistentes = await this.getAll();
            const id = objetosExistentes.length >= 1 ? objetosExistentes[objetosExistentes.length-1].id + 1 : 1;
            objetosExistentes.push({..._objeto, id:id});
            const data = JSON.stringify(objetosExistentes);
            await fs.promises.writeFile(this.ruta, data)
            return id
        } catch (err){
            console.error("Error al guardar objeto:", err);
        }
    }
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8');
            if (contenido == ""){
                let data = []
                return data;
            } else {
                let data = JSON.parse(contenido);
                return data;
            }
        } catch (err){
            console.error("no existe el archivo:", err.message)
        }
    }
    async getById(_id){
        try{
            const objetosExistentes = await this.getAll();
            return objetosExistentes.filter(it => it.id === _id);
        } catch(err) {
            console.log("Error en la busqueda", err.message);
        }
    }
    async deleteById(_id){
        try{
            const objetosExistentes = await this.getAll();
            const data = JSON.stringify(objetosExistentes.filter(it => it.id != _id));
            await fs.promises.writeFile(this.ruta, data)
        } catch(err) {
            console.log("Error en el proceso de eliminacion", err.message);
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, "");
        } catch(err) {
            console.log("Error en la eliminacion", err.message);
        }
    }
}



module.exports.Contenedor = Contenedor;
