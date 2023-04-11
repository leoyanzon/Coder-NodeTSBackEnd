const {faker} = require('@faker-js/faker/locale/es');

const get = () => ({
    fullName: faker.name.fullName(),
    username: faker.internet.userName(),
    address: faker.address.direction(),
    age: faker.datatype.number({min: 17, max:100}),
    phone: faker.datatype.number({min: 17, max:100}),
    password: faker.internet.password(),
})

module.exports = {
    get
}
