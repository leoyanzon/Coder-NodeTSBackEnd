const {faker} = require('@faker-js/faker/locale/es');

const get = () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productAdjective(),
    price: faker.commerce.price(10,200),
    stock: faker.random.numeric(2)
})

module.exports = {
    get
}
