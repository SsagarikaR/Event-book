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
Object.defineProperty(exports, "__esModule", { value: true });
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/booking/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { EventId } = req.body;
    try {
        const user = yield databse_1.sequelize.query('SELECT * FROM Bookings WHERE BookedBy=? AND EventId=? ', {
            replacements: [userId, EventId],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (user.length > 0) {
            return res.status(409).json({ message: "This event is already booked by you" });
        }
        const [result, metadata] = yield databse_1.sequelize.query('INSERT INTO Bookings (BookedBy,EventID) VALUES (?,?,?)', {
            replacements: [userId, EventId],
            type: sequelize_1.QueryTypes.INSERT
        });
        console.log(result, metadata);
        if (metadata > 1) {
            return res.status(202).json({ message: "You have successfully booked the event." });
        }
        else {
            return res.status(403).json({ message: "error registering" });
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!!" });
    }
}));
router.get("/all-booking", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBooking = databse_1.sequelize.query('SELECT * FROM Bookings ', {
            type: sequelize_1.QueryTypes.SELECT
        });
        return res.status(200).json(allBooking);
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!!" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield databse_1.sequelize.query('DELETE FROM Bookings WHERE BookingID=?', {
            replacements: [id],
            type: sequelize_1.QueryTypes.SELECT
        });
        return res.status(200).json({ message: "Successfully deleted this event" });
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!!" });
    }
}));
exports.default = router;
