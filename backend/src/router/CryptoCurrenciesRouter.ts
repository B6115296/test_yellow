import BaseRoutes from "./base/BaseRouter";
import CryptocurrenciesConroller from "../controller/cryptocurrenciesController";
import { createCryptoSchema, updateCryptoSchema } from "../schema/cryptocurrenciesSchema";
import validate from "../helper/validate";

class CryptocurrenciesRouter extends BaseRoutes {
  routes(): void {
    this.router.post(
      "",
      validate(createCryptoSchema),
      CryptocurrenciesConroller.create
    );
    this.router.patch(
      "/:id",
      validate(updateCryptoSchema),
      CryptocurrenciesConroller.update
    );
    this.router.delete("/:id", CryptocurrenciesConroller.delete);
    this.router.get("/", CryptocurrenciesConroller.findAll);
    this.router.get("/:id", CryptocurrenciesConroller.findById);
  }
}

export default new CryptocurrenciesRouter().router;
