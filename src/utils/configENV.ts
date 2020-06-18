import dotenv from "dotenv";

let path;

switch (process.env.NODE_ENV) {
    case "test":
        path = `${__dirname}/../../.env.test`;
        break;
    case "production":
        path = `${__dirname}/../../.env.production`;
        break;
    default:
        path = `${__dirname}/../../.env.development`;
}

dotenv.config({ path: path }); // imports .env file specific to the NODE_ENV

dotenv.config(); // imports .env file
