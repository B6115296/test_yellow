"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cryptocurrencies = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CRYPTOCURRENCY_TABLE_NAME = "cryptocurrency";
const CRYPTOCURRENCY_ID = "id";
const CRYPTOCURRENCY_NAME = "name";
const CRYPTOCURRENCY_SYMBOL = "symbol";
const CRYPTOCURRENCY_PRICE = "price";
let Cryptocurrencies = class Cryptocurrencies extends sequelize_typescript_1.Model {
};
exports.Cryptocurrencies = Cryptocurrencies;
Cryptocurrencies.CRYPTOCURRENCY_TABLE_NAME = CRYPTOCURRENCY_TABLE_NAME;
Cryptocurrencies.CRYPTOCURRENCY_ID = CRYPTOCURRENCY_ID;
Cryptocurrencies.CRYPTOCURRENCY_NAME = CRYPTOCURRENCY_NAME;
Cryptocurrencies.CRYPTOCURRENCY_SYMBOL = CRYPTOCURRENCY_SYMBOL;
Cryptocurrencies.CRYPTOCURRENCY_PRICE = CRYPTOCURRENCY_PRICE;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: CRYPTOCURRENCY_ID,
    }),
    __metadata("design:type", Number)
], Cryptocurrencies.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        field: CRYPTOCURRENCY_NAME,
        unique: true,
    }),
    __metadata("design:type", String)
], Cryptocurrencies.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        field: CRYPTOCURRENCY_SYMBOL,
        unique: true,
    }),
    __metadata("design:type", String)
], Cryptocurrencies.prototype, "symbol", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        field: CRYPTOCURRENCY_PRICE,
    }),
    __metadata("design:type", Number)
], Cryptocurrencies.prototype, "price", void 0);
exports.Cryptocurrencies = Cryptocurrencies = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: CRYPTOCURRENCY_TABLE_NAME,
        timestamps: true,
    })
], Cryptocurrencies);
