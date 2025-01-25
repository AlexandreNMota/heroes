import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: "mysql",
        logging: console.log,
    }
);

export default sequelize;