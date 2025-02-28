"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const databse_1 = require("../db/databse");
const event_1 = require("./event");
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
    },
    EventID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: event_1.Event,
            key: 'EventID'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});
console.log(sequelize_1.Model === databse_1.sequelize.models.Model);
