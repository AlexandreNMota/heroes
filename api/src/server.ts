import app from "./app";
import sequelize from "./config/database";

const PORT = process.env.PORT || 3000;

sequelize.sync({force : true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error syncing database:', error);
});