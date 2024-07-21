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
const cryptocurrencies_1 = require("../model/cryptocurrencies");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
        });
        sequelize
            .authenticate()
            .then(() => {
            console.log("✅ PostgreSQL Connection has been established successfully.");
        })
            .catch((err) => {
            console.error("❌ Unable to connect to the PostgreSQL database:", err);
        });
        this.syncModels(sequelize);
        return sequelize;
    }
    syncModels(sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize.sync({ force: false });
                console.log("✅ Database synced successfully.");
                if (!Database.initialized) {
                    this.insertDefaultDataIfNeeded();
                    Database.initialized = true;
                }
            }
            catch (error) {
                console.error("❌ Error syncing database:", error);
            }
        });
    }
    insertDefaultDataIfNeeded() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sequelize)
                return;
            try {
                const count = yield cryptocurrencies_1.Cryptocurrencies.count();
                if (count === 0) {
                    console.log("Table is empty. Inserting default data.");
                    yield this.executeSQLScript();
                }
                else {
                    console.log("Table already contains data. No default data inserted.");
                }
            }
            catch (error) {
                console.error("❌ Error checking table or inserting default data:", error);
            }
        });
    }
    executeSQLScript() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sequelize)
                return;
            try {
                const sqlFilePath = path.join(__dirname, "insert_default_data.sql");
                const sql = fs.readFileSync(sqlFilePath, "utf8");
                yield this.sequelize.query(sql);
                console.log("✅ Default data inserted successfully.");
            }
            catch (error) {
                console.error("❌ Error executing SQL script:", error);
            }
        });
    }
}
Database.initialized = false;
exports.default = Database;
