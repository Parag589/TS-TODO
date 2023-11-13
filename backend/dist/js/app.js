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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Define a request logging middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use(routes_1.default);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const uri = "mongodb+srv://shyam2020100:123456780@cluster0.zhnlwok.mongodb.net/?retryWrites=true&w=majority";
const connectDb = (DB_URL) => __awaiter(void 0, void 0, void 0, function* () {
    const DB_OPTIONS = {
        dbName: "Todo",
    };
    try {
        yield mongoose_1.default.connect(DB_URL, DB_OPTIONS);
        console.log('Connected to mongo');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
});
connectDb(uri);
