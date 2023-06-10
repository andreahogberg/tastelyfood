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
exports.initializeUploadModel = exports.Upload = void 0;
var sequelize_1 = require("sequelize");
var Upload = /** @class */ (function (_super) {
    __extends(Upload, _super);
    function Upload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Upload;
}(sequelize_1.Model));
exports.Upload = Upload;
function initializeUploadModel(database) {
    var sequelize = database.getSequelizeInstance();
    Upload.init({
        filename: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        path: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize: sequelize,
        modelName: "Upload",
    });
}
exports.initializeUploadModel = initializeUploadModel;
