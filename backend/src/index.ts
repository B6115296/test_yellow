import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import cors from "cors";
import CryptoCurrenciesRouter from "./router/CryptoCurrenciesRouter";
import "./jobs/updatePrice";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected async databaseSync(): Promise<void> {
    const db = new Database();
    await db.sequelize?.sync();
    await db.importData();
  }

  protected routes(): void {
    this.app
      .route("/")
      .get((req: Request, res: Response) => res.send("hello worldss"));
    this.app.use("/api/v1/cryptocurrencies", CryptoCurrenciesRouter);
  }
}

const app = new App().app;
const port: number = 8000;

app.listen(port, () => {
  console.log("✅ Server started successfully!");
});
