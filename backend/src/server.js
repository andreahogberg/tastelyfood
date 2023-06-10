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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var database_1 = require("./database");
var Recipe_1 = require("../models/Recipe");
var User_1 = require("../models/User");
var Upload_1 = require("../models/Upload");
var dotenv_1 = require("dotenv");
var sequelize_1 = require("sequelize");
var cors_1 = require("cors");
var express_session_1 = require("express-session");
var multer_1 = require("multer");
var path_1 = require("path");
// declare module "express-session" {
//   interface Session {
//     user?: {
//       username: string
//     }
//   }
// }
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 8080;
var database = new database_1.Database();
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../frontend/public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
}));
app.post("/login", function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    req.session.user = { username: username };
    res.send("Logged in successfully");
});
app.get("/check-login", function (req, res) {
    if (req.session.user) {
        res.send("User is logged in");
    }
    else {
        res.send("User is not logged in");
    }
});
app.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password;
    return __generator(this, function (_b) {
        _a = req.body, username = _a.username, password = _a.password;
        res.json({ success: true });
        return [2 /*return*/];
    });
}); });
app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to destroy session" });
        }
        else {
            res.send("Logged out successfully");
        }
    });
});
var sequelize = new sequelize_1.Sequelize(process.env.DATABASEURL, {
    dialect: "postgres",
    ssl: true,
});
(0, Upload_1.initializeUploadModel)(database);
database.connect();
app.get("/recipes", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Recipe_1.Recipe.findAll()];
            case 1:
                recipes = _a.sent();
                res.json(recipes);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/recipes", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, ingredients, instructions, cookTime, servings, image, creator, recipe, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, description = _a.description, ingredients = _a.ingredients, instructions = _a.instructions, cookTime = _a.cookTime, servings = _a.servings, image = _a.image, creator = _a.creator;
                return [4 /*yield*/, Recipe_1.Recipe.create({
                        name: name_1,
                        description: description,
                        ingredients: ingredients,
                        instructions: instructions,
                        cookTime: cookTime,
                        servings: servings,
                        image: image,
                        creator: creator,
                    })];
            case 1:
                recipe = _b.sent();
                res.json(recipe);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/recipes/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, recipe, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                recipeId = req.params.id;
                return [4 /*yield*/, Recipe_1.Recipe.findByPk(recipeId)];
            case 1:
                recipe = _a.sent();
                if (!recipe) {
                    res.status(404).json({ error: "Recipe not found" });
                }
                else {
                    res.json(recipe);
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, email, password, existingUser, user, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, name_2 = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.User.findOne({ where: { email: email } })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(409).json({ error: "User already exists" })];
                }
                return [4 /*yield*/, User_1.User.create({ name: name_2, email: email, password: password })];
            case 2:
                user = _b.sent();
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.error(error_4);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/upload", upload.single("file"), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "Ingen fil vald" });
    }
    var uploadInstance = new Upload_1.Upload({ fileName: req.file.filename });
    console.log("Filväg:", req.file.path);
    uploadInstance.save();
    var imageUrl = "".concat(req.protocol, "://").concat(req.get("host"), "/uploads/").concat(req.file.filename);
    return res
        .status(200)
        .json({ fileName: req.file.filename, filePath: imageUrl });
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
