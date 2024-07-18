import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Cryptocurrencies } from "../model/cryptocurrencies";
dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT as string, 10);
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    if (!this.POSTGRES_DB || !this.POSTGRES_HOST || !this.POSTGRES_PORT || !this.POSTGRES_USER || !this.POSTGRES_PASSWORD) {
      throw new Error('One or more required environment variables are missing.');
    }
    this.sequelize = this.connectToPostgreSQL();
  }

  private connectToPostgreSQL(): Sequelize {
    const sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres",
      models: [Cryptocurrencies],
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log(
          "✅ PostgreSQL Connection has been established successfully."
        );
      })
      .catch((err) => {
        console.error("❌ Unable to connect to the PostgreSQL database:", err);
      });

    return sequelize;
  }
}

export default Database;
