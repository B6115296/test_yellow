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
const cryptocurrencies_1 = require("../model/cryptocurrencies");
const cryptoRepo_1 = require("../repository/cryptoRepo");
const sequelize_1 = require("sequelize");
class CryptocurrenciesConroller {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, symbol } = req.body;
                const existingCrypto = yield cryptocurrencies_1.Cryptocurrencies.findOne({
                    where: {
                        [sequelize_1.Op.or]: [{ name }, { symbol }],
                    },
                });
                if (existingCrypto) {
                    return res.status(400).json({
                        status: "Bad Request",
                        message: "Cryptocurrency with the same name or symbol already exists",
                    });
                }
                const new_crypto = new cryptocurrencies_1.Cryptocurrencies();
                new_crypto.name = req.body.name;
                new_crypto.symbol = req.body.symbol;
                new_crypto.price = req.body.price;
                yield new cryptoRepo_1.CrypToRepo().save(new_crypto);
                res.status(201).json({
                    status: "Created",
                    message: "Successfully add cryptocurrencies",
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error",
                    message: "Internal Server Error",
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const new_crypto = new cryptocurrencies_1.Cryptocurrencies();
                new_crypto.id = id;
                new_crypto.name = req.body.name;
                new_crypto.symbol = req.body.symbol;
                new_crypto.price = req.body.price;
                yield new cryptoRepo_1.CrypToRepo().update(new_crypto);
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully update cryptocurrencies",
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error",
                    message: "Internal Server Error",
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                yield new cryptoRepo_1.CrypToRepo().delete(id);
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully delete cryptocurrencies",
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error",
                    message: "Internal Server Error",
                });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const new_crypto = yield new cryptoRepo_1.CrypToRepo().retriveById(id);
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully get cryptocurrencies",
                    data: new_crypto,
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error",
                    message: "Internal Server Error",
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_crypto = yield new cryptoRepo_1.CrypToRepo().retriveAll();
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully get all cryptocurrencies",
                    data: new_crypto,
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error",
                    message: "Internal Server Error",
                });
            }
        });
    }
}
exports.default = new CryptocurrenciesConroller();
