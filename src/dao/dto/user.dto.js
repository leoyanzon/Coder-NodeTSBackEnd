class UserDTO{
    constructor(data){
        this.fullName = data.fullName,
        this.username = data.username,
        this.address = data.address,
        this.age = data.age,
        this.phone = data.phone,
        this.avatar = data.avatar
    }

    build(){
        return this;
    }
}

module.exports = UserDTO;