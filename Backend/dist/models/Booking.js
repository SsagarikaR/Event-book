"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const databse_1 = require("../config/databse");
const User_1 = require("./User");
const Event_1 = require("./Event");
const sequelize_1 = require("sequelize");
exports.Booking = databse_1.sequelize.define('Booking', {
    BookingID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    BookedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.Customer,
            key: 'CustomerID'
        }
    },
    EventID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Event_1.Event,
            key: 'EventID'
        }
    }
}, {
    timestamps: false
});
console.log(sequelize_1.Model === databse_1.sequelize.models.Model);
