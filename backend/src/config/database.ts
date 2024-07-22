import { Sequelize } from "sequelize-typescript";
import { Cryptocurrencies } from "../model/cryptocurrencies";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;
  private static initialized = false;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT as string, 10);
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    if (
      !this.POSTGRES_DB ||
      !this.POSTGRES_HOST ||
      !this.POSTGRES_PORT ||
      !this.POSTGRES_USER ||
      !this.POSTGRES_PASSWORD
    ) {
      throw new Error(
        "One or more required environment variables are missing."
      );
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

        this.syncModels(sequelize);
      })
      .catch((err) => {
        console.error("❌ Unable to connect to the PostgreSQL database:", err);
      });
    return sequelize;
  }

  private async syncModels(sequelize: Sequelize) {
    try {
      await sequelize.sync({ alter: true });
      console.log("✅ Database synced successfully.");

      if (!Database.initialized) {
        await this.insertDefaultDataIfNeeded();
        Database.initialized = true;
      }
    } catch (error) {
      console.error("❌ Error syncing database:", error);
    }
  }

  private async insertDefaultDataIfNeeded() {
    if (!this.sequelize) return;

    try {
      const count = await Cryptocurrencies.count();

      if (count === 0) {
        console.log("✅ Table is empty. Inserting default data.");
        this.executeSQLScript();
      } else {
        console.log(
          "✅ Table already contains data. No default data inserted."
        );
      }
    } catch (error) {
      console.error(
        "❌ Error checking table or inserting default data:",
        error
      );
    }
  }

  private async executeSQLScript() {
    if (!this.sequelize) return;

    try {
      const sqlFilePath = path.join(__dirname, "insert_default_data.sql");

      const sql = fs.readFileSync(sqlFilePath, "utf-8");

      await this.sequelize.query(sql);
      console.log("✅ Default data inserted successfully.");
    } catch (error) {
      console.error("❌ Error executing SQL script:", error);
    }
  }
}

export default Database;
