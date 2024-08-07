"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cryptocurrencies = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const CRYPTOCURRENCY_TABLE_NAME = "cryptocurrency";
const CRYPTOCURRENCY_ID = "id";
const CRYPTOCURRENCY_NAME = "name";
const CRYPTOCURRENCY_SYMBOL = "symbol";
const CRYPTOCURRENCY_PRICE = "price";
const CRYPTOCURRENCY_CREATED_AT = "create_at";
let Cryptocurrencies = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({
            tableName: CRYPTOCURRENCY_TABLE_NAME,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _symbol_decorators;
    let _symbol_initializers = [];
    let _symbol_extraInitializers = [];
    let _price_decorators;
    let _price_initializers = [];
    let _price_extraInitializers = [];
    let _create_at_decorators;
    let _create_at_initializers = [];
    let _create_at_extraInitializers = [];
    var Cryptocurrencies = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.symbol = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _symbol_initializers, void 0));
            this.price = (__runInitializers(this, _symbol_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.create_at = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _create_at_initializers, void 0));
            __runInitializers(this, _create_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Cryptocurrencies");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _id_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: CRYPTOCURRENCY_ID,
            })];
        _name_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING(100),
                field: CRYPTOCURRENCY_NAME,
            })];
        _symbol_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING(255),
                field: CRYPTOCURRENCY_SYMBOL,
            })];
        _price_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
                field: CRYPTOCURRENCY_PRICE,
            })];
        _create_at_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DATE,
                field: CRYPTOCURRENCY_CREATED_AT,
            })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _symbol_decorators, { kind: "field", name: "symbol", static: false, private: false, access: { has: obj => "symbol" in obj, get: obj => obj.symbol, set: (obj, value) => { obj.symbol = value; } }, metadata: _metadata }, _symbol_initializers, _symbol_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: obj => "price" in obj, get: obj => obj.price, set: (obj, value) => { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _create_at_decorators, { kind: "field", name: "create_at", static: false, private: false, access: { has: obj => "create_at" in obj, get: obj => obj.create_at, set: (obj, value) => { obj.create_at = value; } }, metadata: _metadata }, _create_at_initializers, _create_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Cryptocurrencies = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.CRYPTOCURRENCY_TABLE_NAME = CRYPTOCURRENCY_TABLE_NAME;
    _classThis.CRYPTOCURRENCY_ID = CRYPTOCURRENCY_ID;
    _classThis.CRYPTOCURRENCY_NAME = CRYPTOCURRENCY_NAME;
    _classThis.CRYPTOCURRENCY_SYMBOL = CRYPTOCURRENCY_SYMBOL;
    _classThis.CRYPTOCURRENCY_PRICE = CRYPTOCURRENCY_PRICE;
    _classThis.CRYPTOCURRENCY_CREATED_AT = CRYPTOCURRENCY_CREATED_AT;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Cryptocurrencies = _classThis;
})();
exports.Cryptocurrencies = Cryptocurrencies;
