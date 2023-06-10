"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRecipeModel = exports.Recipe = void 0;
var sequelize_1 = require("sequelize");
var Recipe = /** @class */ (function (_super) {
    __extends(Recipe, _super);
    function Recipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Recipe;
}(sequelize_1.Model));
exports.Recipe = Recipe;
function initializeRecipeModel(database) {
    var sequelize = database.getSequelizeInstance();
    Recipe.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        ingredients: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false,
        },
        instructions: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false,
        },
        servings: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        creator: {
            type: sequelize_1.DataTypes.JSONB,
            allowNull: false,
        },
    }, {
        sequelize: sequelize,
        modelName: 'Recipe',
    });
}
exports.initializeRecipeModel = initializeRecipeModel;
