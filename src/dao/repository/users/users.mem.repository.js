const ProductDTO = require('../../dto/product.dto');
const UserDTO = require('../../dto/user.dto');

class UsersMemRepository{
    constructor(){
        this.users = [];
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UsersMemRepository()
        }
        return this.instance
    }

    async save(userData){
        try{
            const id = this.users.length >= 1 ? this.users[this.users.length-1].id + 1 : 1;
            const userDTO = await new UserDTO(userData).build();
            this.users.push({...userDTO, id:id});
            return id
        } catch (err){
            console.error("Error al guardar objeto:", err);
        }
    }
    async getAll(){
        try{
            return this.users;
        } catch (err){
            console.error("no existe el archivo:", err.message)
        }
    }
    async getById(_id){
        try{
            return this.users.filter(it => it.id === _id);
        } catch(err) {
            console.log("Error en la busqueda", err.message);
        }
    }
    async deleteById(_id){
        try{
            return this.users.filter(it => it.id != _id);
        } catch(err) {
            console.log("Error en el proceso de eliminacion", err.message);
        }
    }
    async deleteAll(){
        try{
            this.users = [];
            return true
        } catch(err) {
            console.log("Error en la eliminacion", err.message);
        }
    }

}

module.exports = UsersMemRepository;