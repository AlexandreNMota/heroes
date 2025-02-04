import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  (process.env.DB_NAME as string) || "heroes",
  (process.env.DB_USER as string) || "root",
  (process.env.DB_PASSWORD as string) || "root",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: console.log,
  }
);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Conexão estabelecida com sucesso.");
//   })
//   .catch((error) => {
//     console.error("Não foi possível se conectar ao banco de dados:", error);
//   });

export default sequelize;
