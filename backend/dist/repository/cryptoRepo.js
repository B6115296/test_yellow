"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrypToRepo = void 0;
const cryptocurrencies_1 = require("../model/cryptocurrencies");
class CrypToRepo {
    save(crypto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield cryptocurrencies_1.Cryptocurrencies.create({
                    name: crypto.name,
                    symbol: crypto.symbol,
                    price: crypto.price,
                });
            }
            catch (error) {
                throw new Error("Failed to save crypto: " + error);
            }
        });
    }
    update(crypto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_crypto = yield cryptocurrencies_1.Cryptocurrencies.findOne({
                    where: {
                        id: crypto.id,
                    },
                });
                if (!new_crypto) {
                    throw new Error("Crypto not found");
                }
                new_crypto.name = crypto.name;
                new_crypto.symbol = crypto.symbol;
                new_crypto.price = crypto.price;
                yield new_crypto.save();
                return new_crypto;
            }
            catch (error) {
                throw new Error("Failed to update crypto: " + error);
            }
        });
    }
    delete(cryptoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_crypto = yield cryptocurrencies_1.Cryptocurrencies.findOne({
                    where: {
                        id: cryptoId,
                    },
                });
                if (!new_crypto) {
                    throw new Error("Crypto not found");
                }
                yield new_crypto.destroy();
                return new_crypto;
            }
            catch (error) {
                throw new Error("Failed to delete crypto: " + error);
            }
        });
    }
    retriveById(cryptoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_crypto = yield cryptocurrencies_1.Cryptocurrencies.findOne({
                    where: {
                        id: cryptoId,
                    },
                });
                if (!new_crypto) {
                    throw new Error("Crypto not found");
                }
                return new_crypto;
            }
            catch (error) {
                throw new Error("Failed to save crypto: " + error);
            }
        });
    }
    retriveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_crypto = yield cryptocurrencies_1.Cryptocurrencies.findAll({});
                if (!new_crypto) {
                    throw new Error("Crypto not found");
                }
                return new_crypto;
            }
            catch (error) {
                throw new Error("Failed to save crypto: " + error);
            }
        });
    }
}
exports.CrypToRepo = CrypToRepo;
