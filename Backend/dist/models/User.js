"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
exports.User = databse_1.sequelize.define('User', {
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    UserName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    UserEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
console.log(exports.User === databse_1.sequelize.models.User);
