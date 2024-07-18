"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const cryptocurrenciesController_1 = __importDefault(require("../controller/cryptocurrenciesController"));
const cryptocurrenciesSchema_1 = require("../schema/cryptocurrenciesSchema");
const validate_1 = __importDefault(require("../helper/validate"));
class CryptocurrenciesRouter extends BaseRouter_1.default {
    routes() {
        this.router.post("", (0, validate_1.default)(cryptocurrenciesSchema_1.createCryptoSchema), cryptocurrenciesController_1.default.create);
        this.router.patch("/:id", (0, validate_1.default)(cryptocurrenciesSchema_1.updateCryptoSchema), cryptocurrenciesController_1.default.update);
        this.router.delete("/:id", cryptocurrenciesController_1.default.delete);
        this.router.get("/", cryptocurrenciesController_1.default.findAll);
        this.router.get("/:id", cryptocurrenciesController_1.default.findById);
    }
}
exports.default = new CryptocurrenciesRouter().router;
