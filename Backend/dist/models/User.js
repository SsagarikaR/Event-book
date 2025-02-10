"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const sequelize_1 = require("sequelize");
const databse_1 = require("../config/databse");
exports.Customer = databse_1.sequelize.define('Customer', {
    CustomerID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    CustomerName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    CustomerEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});
console.log(exports.Customer === databse_1.sequelize.models.Customer);
