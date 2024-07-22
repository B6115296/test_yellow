"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const cryptocurrencies_1 = require("../model/cryptocurrencies");
dotenv.config();
class Database {
    constructor() {
        this.POSTGRES_DB = process.env.POSTGRES_DB;
        this.POSTGRES_HOST = process.env.POSTGRES_HOST;
        this.POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT, 10);
        this.POSTGRES_USER = process.env.POSTGRES_USER;
        this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
        if (!this.POSTGRES_DB ||
            !this.POSTGRES_HOST ||
            !this.POSTGRES_PORT ||
            !this.POSTGRES_USER ||
            !this.POSTGRES_PASSWORD) {
            throw new Error("One or more required environment variables are missing.");
        }
        this.sequelize = this.connectToPostgreSQL();
    }
    connectToPostgreSQL() {
        const sequelize = new sequelize_typescript_1.Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
            models: [cryptocurrencies_1.Cryptocurrencies],
            logging: console.log,
        });
        sequelize
            .authenticate()
            .then(() => {
            console.log("✅ PostgreSQL Connection has been established successfully.");
        })
            .catch((err) => {
            console.error("❌ Unable to connect to the PostgreSQL database:", err);
        });
        return sequelize;
    }
    importData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sequelize) {
                throw new Error("Database connection not established.");
            }
            const [results] = yield this.sequelize.query(`SELECT COUNT(*) FROM "cryptocurrency"`);
            const count = parseInt(results[0].count, 10);
            if (count > 0) {
                console.log("✅ Data already exists, skipping import.");
                return;
            }
            const sqlFilePath = path.resolve(__dirname, "default_cryptocurrencies_data.sql");
            const sql = fs.readFileSync(sqlFilePath, "utf8");
            try {
                yield this.sequelize.query(sql);
                console.log("Data imported successfully!");
            }
            catch (err) {
                console.error("Error importing data:", err);
            }
        });
    }
}
exports.default = Database;
