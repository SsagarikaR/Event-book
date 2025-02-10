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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { EventName } = req.body;
    try {
        const user = yield databse_1.sequelize.query('SELECT * FROM Events WHERE CEventName=?  ', {
            replacements: [EventName],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (user.length > 0) {
            return res.status(409).json({ message: "This user is already registed" });
        }
        const [result, metadata] = yield databse_1.sequelize.query('INSERT INTO Events (EventName) VALUES (?)', {
            replacements: [EventName],
            type: sequelize_1.QueryTypes.INSERT
        });
        console.log(result, metadata);
        if (metadata > 1) {
            return res.status(202).json({ message: "You have successfully added a new event." });
        }
        else {
            return res.status(403).json({ message: "error adding a new event" });
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!!" });
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEvent = databse_1.sequelize.query('SELECT * FROM Events', {
            type: sequelize_1.QueryTypes.SELECT
        });
        if ((yield allEvent).length > 0) {
            return res.send(200).json(allEvent);
        }
        else {
            return res.status(404).json({ message: "No Event exist" });
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!!" });
    }
}));
exports.default = router;
