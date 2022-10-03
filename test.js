class Usuario{
    constructor(_nombre, _apellido, _libros = [], _mascotas = []){
        this.nombre = _nombre
        this.apellido = _apellido
        this.libros = _libros
        this.mascotas = _mascotas
    }
    getFullName(){
        return  `${this.nombre} ${this.apellido}`
    }

    addMascota(_addMascota){
        this.mascotas.push(_addMascota);
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(_nombre, _autor){
        this.libros.push({nombre:_nombre, autor:_autor});
    }

    getBookNames(){
        return this.libros.map(it => it.nombre);
    }
}

const user1 = new Usuario("Pablo", "Lopez")

user1.addBook("El señor de los anillos", "Tolkien");
user1.addBook("Canción de hielo y fuego", "George R.R. Martin")
user1.addMascota("perro");
user1.addMascota("gato");


console.log("La instancia completa de la clase:", user1);
console.log("El nombre del usuario es:",user1.getFullName());
console.log("La cantidad de mascotas son:",user1.countMascotas());
console.log("Los nombres de los libros",user1.getBookNames());