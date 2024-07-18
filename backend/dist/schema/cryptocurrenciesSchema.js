"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCryptoSchema = exports.createCryptoSchema = void 0;
const zod_1 = require("zod");
exports.createCryptoSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        symbol: zod_1.z.string().min(1, { message: "Symbol is required" }),
        price: zod_1.z.number().min(0, { message: "Price must be a positive number" }),
    }),
});
exports.updateCryptoSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, { message: "Id is required" }),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        symbol: zod_1.z.string().min(1, { message: "Symbol is required" }),
        price: zod_1.z.number().min(0, { message: "Price must be a positive number" }),
    }),
});
