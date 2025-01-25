import app from "./app";
import sequelize from "./config/database";

const PORT = process.env.PORT || 3000;

sequelize.sync({}).then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });