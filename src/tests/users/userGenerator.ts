import {faker} from '@faker-js/faker/locale/es';

const userGenerator = () => ({
    fullName: faker.name.fullName(),
    username: faker.internet.userName(),
    address: faker.address.direction(),
    age: faker.datatype.number({min: 17, max:100}),
    email:  faker.internet.email(),
    password: faker.internet.password(),
})

export default userGenerator;