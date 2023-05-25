import {faker} from '@faker-js/faker/locale/es';

const productGenerator = () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productAdjective(),
    price: faker.commerce.price(10,200),
    stock: faker.random.numeric(2)
})

export default productGenerator;