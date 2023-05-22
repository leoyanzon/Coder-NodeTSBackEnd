# CoderHouse NodeTSBackEnd

Same CoderHouse NodeJSBackEnd project but modified with TypeScript 

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Libraries Used](#libraries-used)
- [License](#license)


## Introduction

This project is my first Node.js application developed as part of the Coderhouse course. It is an ecommerce application that includes user creation and authentication, product purchasing, and cart management. The project follows a layered architecture approach, with components such as routers, controllers, middlewares, services (business logic), factories, and repositories (supporting different data storage options like memory, file, MongoDB Atlas, or local MongoDB). Additionally, it includes utility functions, loaders, and tests.

The following libraries and frameworks were used in the project:

- Express: A web application framework for Node.js.
- Mongoose: An object modeling tool for MongoDB.
- Argon: A library used for password encryption.
- Passport-Local: A Passport strategy for authenticating with a username and password.

## Getting Started

Follow the steps below to get the project up and running on your local machine.

### Installation

To install the necessary dependencies, run the following command:

`npm install`

### Scripts

The project includes several scripts that you can run using npm. Here are some of the available scripts:

- **Start**: Start the application in production mode.

`npm start`


- **Start:dev**: Start the application in development mode using nodemon.

`npm run start:dev`

- **Start:dev:FORK**: Start the application in development mode using nodemon with the FORK mode enabled.

`npm run start:dev:FORK`

- **Start:dev:CLUSTER**: Start the application in development mode using nodemon with the CLUSTER mode enabled.

`npm run start:dev:CLUSTER`

- **Start:dev:CLUSTER:8082**: Start the application in development mode using nodemon with the CLUSTER mode enabled and listening on port 8082.

Refer to the package.json file for the full list of available scripts and their descriptions.

### Testing

To run the tests for the project, you can use the following command:

`npm testUsers`

This will execute users tests using the Mocha testing framework.

`npm testProducts`

This will execute products tests using the Mocha testing framework.

Remember to configure any necessary environment variables before running the application or the tests.

**Note:** Make sure to update the sections with the appropriate information for your project.

## Configuration

The application can be configured using environment variables. Create a file named `.env` in the root directory of the project and add the following configuration variables:

- `SERVER_PORT`: The port on which the server will run. Example: `3005`
- `ENVIRONMENT`: The environment in which the application is running. Example: `development`
- `COOKIES_SECRET`: Secret key for signing cookies. Example: `cookiesPassword`

### Session Storage Configuration

The session storage can be configured using the following variables:

- `SESSION_STORAGE`: The type of session storage. It can be one of the following values: `MEM`, `FILE`, `MONGO_ATLAS`, `MONGO_DB`
- `DB_NAME`: The name of the MongoDB database. Example: `dbName`
- `MONGO_URI`: The MongoDB connection URI. Example: `mongodb://localhost:27017`
- `MONGO_ATLAS_URL`: The MongoDB Atlas connection URI. Example: `mongodb+srv://user:password@application.asdasd.mongodb.net`

### Data Storage Configuration

The data storage can be configured using the following variables:

- `DATA_STORAGE`: The type of data storage. It can be one of the following values: `MEM`, `FILE`, `MONGO_ATLAS`, `MONGO_DB`

### Twilio Configuration

To enable SMS notifications, configure the following variables:

- `TWILIO_SID`: Twilio account SID. Example: `AC360c1c7bafasdasdaddw3wdwwab1`
- `TWILIO_AUTH_TOKEN`: Twilio authentication token. Example: `e59asdwerfgrgsfsdsa55c`

### Email Configuration

To enable email notifications, configure the following variables:

- `EMAIL_USER`: Email address or username for sending emails. Example: `emailUser`
- `EMAIL_PASS`: Password for the email account. Example: `masdasdefgrgsagp`

### Logging Configuration

- `LOG_LEVEL`: The log level for Pino logger. Example: `info`

## Usage

To use this application, follow the steps below:

1. Access the home page of the application.

2. Register a new user by providing the required information. The registration process includes validation of the user data. Once registered, the user will receive an email and a WhatsApp message for confirmation.

3. After registering, the application generates 10 random products using the Faker library.

4. Browse through the products and add them to your cart. You can add multiple products to the cart.

5. When you are ready to make a purchase, go to the cart and proceed with the checkout process. Once the purchase is completed, a confirmation email will be sent.

Please note that the application handles errors gracefully. In case of an error, the application will return an HTML response with the corresponding error code and a description of the error.

## Endpoints

### User Endpoints

- `GET /`: Retrieves the home page. Requires authentication. 
- `GET /cart`: Retrieves the user's cart. Requires authentication.
- `GET /signin`: Retrieves the sign-in page.
- `GET /signup`: Retrieves the sign-up page.
- `GET /signout`: Sign out the user.
- `GET /error`: Retrieves the error page.

### API Endpoints for Front-End Integration

#### Cart Endpoints

- `GET /carritos/`: Retrieves all carts.
- `POST /carritos/:productId`: Adds a product to the cart.
- `POST /carritos/buyCart/:cartId`: Buys the cart.

#### Product Endpoints

- `GET /productos/`: Retrieves all products.
- `GET /productos/:id`: Retrieves a product by ID.
- `POST /productos/`: Adds a new product.
- `DELETE /productos/:id`: Deletes a product by ID.
- `DELETE /productos/`: Deletes all products.

### Process Info Endpoint

- `GET /info`: Retrieves process information.

### GraphQL Endpoint

- `/graphql`: GraphQL endpoint for executing queries and mutations.

Please note that the user endpoints are used for the e-commerce functionality, while the API endpoints are designed for integration with other front-end applications using JSON RESTful API.

## Libraries Used

The following libraries were used in this project:

### Development Dependencies

- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker): A library for generating fake data.
- [cors](https://www.npmjs.com/package/cors): Middleware for enabling Cross-Origin Resource Sharing.
- [nodemon](https://www.npmjs.com/package/nodemon): Utility for automatically restarting the application during development.
- [pino-pretty](https://www.npmjs.com/package/pino-pretty): A pretty formatter for Pino logger.

### Dependencies

- [@graphql-yoga/plugin-sofa](https://www.npmjs.com/package/@graphql-yoga/plugin-sofa): A plugin for GraphQL Yoga that generates a REST-like API from a GraphQL schema.
- [argon2](https://www.npmjs.com/package/argon2): A library for hashing passwords using the Argon2 algorithm.
- [axios](https://www.npmjs.com/package/axios): A library for making HTTP requests.
- [basic-auth](https://www.npmjs.com/package/basic-auth): A library for handling Basic Authentication.
- [bcrypt](https://www.npmjs.com/package/bcrypt): A library for hashing passwords using bcrypt.
- [chai](https://www.npmjs.com/package/chai): A library for writing assertion tests.
- [compression](https://www.npmjs.com/package/compression): Middleware for compressing HTTP responses.
- [connect-mongo](https://www.npmjs.com/package/connect-mongo): A MongoDB session store for Express.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Middleware for parsing cookies in Express.
- [dotenv](https://www.npmjs.com/package/dotenv): A library for loading environment variables from a .env file.
- [ejs](https://www.npmjs.com/package/ejs): A templating engine for generating HTML.
- [express](https://www.npmjs.com/package/express): A web framework for Node.js.
- [express-session](https://www.npmjs.com/package/express-session): Middleware for managing user sessions in Express.
- [express-validator](https://www.npmjs.com/package/express-validator): A library for validating request data in Express.
- [graphql](https://www.npmjs.com/package/graphql): A library for building GraphQL schemas and executing queries.
- [graphql-yoga](https://www.npmjs.com/package/graphql-yoga): A fully-featured GraphQL server library.
- [http-status](https://www.npmjs.com/package/http-status): A library for HTTP status codes.
- [http-status-codes](https://www.npmjs.com/package/http-status-codes): A library for common HTTP status codes.
- [lodash](https://www.npmjs.com/package/lodash): A utility library for JavaScript.
- [mocha](https://www.npmjs.com/package/mocha): A test framework for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose): A MongoDB object modeling library.
- [morgan](https://www.npmjs.com/package/morgan): A logging middleware for Express.
- [multer](https://www.npmjs.com/package/multer): A middleware for handling file uploads in Express.
- [nodemailer](https://www.npmjs.com/package/nodemailer): A library for sending emails.
- [passport](https://www.npmjs.com/package/passport): An authentication middleware for Node.js.
- [passport-local](https://www.npmjs.com/package/passport-local): A Passport strategy for authenticating with a username and password.
- [pino](https://www.npmjs.com/package/pino): A logger library for Node.js.
- [pino-http](https://www.npmjs.com/package/pino-http): A HTTP logger for Pino.
- [session-file-store](https://www.npmjs.com/package/session-file-store): A session store using the file system.
- [supertest](https://www.npmjs.com/package/supertest): A library for testing HTTP servers.
- [twilio](https://www.npmjs.com/package/twilio): A library for sending SMS and making phone calls.
- [yargs](https://www.npmjs.com/package/yargs): A library for parsing command-line arguments.

## License

This project is licensed under the ISC License. See the [LICENSE](license.txt) file for more information.

The ISC License is a permissive open-source license that allows you to use, modify, and distribute the software without many restrictions. It is considered suitable for small or experimental projects due to its simplicity and ease of understanding.