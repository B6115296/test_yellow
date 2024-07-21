"use strict";
// updatePrice.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const database_1 = __importDefault(require("../config/database"));
const cryptocurrencies_1 = require("../model/cryptocurrencies");
const db = new database_1.default();
class SymbolNotFoundError extends Error {
    constructor(symbol) {
        super(`Symbol not found: ${symbol}`);
        this.name = "SymbolNotFoundError";
    }
}
// Function to update cryptocurrency prices
function updatePrices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cryptocurrencies = yield cryptocurrencies_1.Cryptocurrencies.findAll();
            for (let crypto of cryptocurrencies) {
                try {
                    const updatedPrice = yield fetchUpdatedPriceFromBinance(crypto.symbol);
                    crypto.price = updatedPrice;
                    yield crypto.save();
                    console.log(`Updated price for ${crypto.symbol}: ${updatedPrice}`);
                }
                catch (error) {
                    if (error instanceof SymbolNotFoundError) {
                        console.warn(`Skipping update for ${crypto.symbol}: ${error.message}`);
                    }
                    else {
                        console.error(`Error updating price for ${crypto.symbol}:`, error);
                    }
                }
            }
            console.log("Cryptocurrency prices updated successfully.");
        }
        catch (error) {
            console.error("Error updating cryptocurrency prices:", error);
        }
    });
}
// Function to fetch updated price from Binance API
function fetchUpdatedPriceFromBinance(symbol) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiUrl = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`;
            const response = yield axios_1.default.get(apiUrl);
            if (!response.data.price) {
                throw new SymbolNotFoundError(symbol);
            }
            const price = parseFloat(response.data.price);
            return price;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                if (error.response &&
                    (error.response.status === 404 || error.response.status === 400)) {
                    throw new SymbolNotFoundError(symbol);
                }
                else {
                    console.error(`Error fetching price for ${symbol} from Binance:`, error.message || error);
                }
            }
            else {
                console.error(`Unexpected error fetching price for ${symbol} from Binance:`, error);
            }
            throw error;
        }
    });
}
// Schedule the job to run every 5 seconds
node_cron_1.default.schedule("*/5 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running job to update cryptocurrency prices...");
    yield updatePrices();
}));
