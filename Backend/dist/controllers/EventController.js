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
exports.createEvent = createEvent;
exports.getEvents = getEvents;
exports.getEventByName = getEventByName;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
const databse_1 = require("../config/databse");
const sequelize_1 = require("sequelize");
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { EventName, location, date } = req.body;
        try {
            const user = yield databse_1.sequelize.query('SELECT * FROM Events WHERE EventName=?  ', {
                replacements: [EventName],
                type: sequelize_1.QueryTypes.SELECT
            });
            if (user.length !== 0) {
                return res.status(409).json({ message: "This event is already exist" });
            }
            const [result, metadata] = yield databse_1.sequelize.query('INSERT INTO Events (EventName,location,date) VALUES (?,?,?)', {
                replacements: [EventName, location, date],
                type: sequelize_1.QueryTypes.INSERT
            });
            console.log(result, metadata);
            if (metadata > 0) {
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
    });
}
function getEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allEvent = yield databse_1.sequelize.query('SELECT * FROM Events', {
                type: sequelize_1.QueryTypes.SELECT
            });
            if (allEvent.length > 0) {
                return res.status(200).json(allEvent);
            }
            else {
                return res.status(404).json({ message: "No Event exists" });
            }
        }
        catch (error) {
            console.log(error, "error");
            return res.status(500).json({ error: "Please try again after some time!!" });
        }
    });
}
function getEventByName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.params;
        try {
            const getByName = yield databse_1.sequelize.query('SELECT * FROM Events WHERE EventName=?', {
                replacements: [name],
                type: sequelize_1.QueryTypes.SELECT
            });
            return res.status(200).json(getByName);
        }
        catch (error) {
            console.log(error, "error");
            return res.status(500).json({ error: "Please try again after sometimes!!" });
        }
    });
}
function updateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { eventID, location } = req.body;
        try {
            const deleteEvent = yield databse_1.sequelize.query('UPDATE Events set location=? WHERE EventID=?', {
                replacements: [location, eventID],
                type: sequelize_1.QueryTypes.DELETE
            });
            return res.status(202).json({ message: "Updated the event location successfully" });
        }
        catch (error) {
            console.log(error, "error");
            return res.status(500).json({ error: "Please try again after sometimes" });
        }
    });
}
function deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { eventID } = req.body;
        try {
            const deleteEvent = yield databse_1.sequelize.query('DELETE FROM Events WHERE EventID=:EventID', {
                replacements: {
                    EventID: eventID
                },
                type: sequelize_1.QueryTypes.DELETE
            });
            return res.status(202).json({ message: "Deleted the event successfully" });
        }
        catch (error) {
            console.log(error, "error");
            return res.status(500).json({ error: "Please try again after sometimes" });
        }
    });
}
