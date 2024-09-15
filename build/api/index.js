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
exports.sequelize = void 0;
const morgan_1 = __importDefault(require("morgan"));
const recipe_1 = __importDefault(require("./routes/recipe"));
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
require("dotenv").config();
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_port = process.env.DB_PORT;
exports.sequelize = new sequelize_1.Sequelize(db_name, db_username, db_password, {
    host: process.env.DB_HOST,
    port: parseInt(db_port),
    dialect: "mysql",
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
if (app.get("env") === "development") {
    app.use((0, morgan_1.default)("tiny"));
    console.log("Morgan enabled");
}
app.use("/recipes", recipe_1.default);
const port = process.env.PORT || 3000;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.sequelize.authenticate();
            app.listen(port, () => console.log(`Listening on port ${port}...`));
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    });
}
start();
//# sourceMappingURL=index.js.map