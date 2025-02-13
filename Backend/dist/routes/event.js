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
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, eventController_1.createEvent)(req, res);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, eventController_1.getEvents)(req, res);
}));
router.get("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, eventController_1.getEventByName)(req, res);
}));
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, eventController_1.updateEvent)(req, res);
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, eventController_1.deleteEvent)(req, res);
}));
exports.default = router;
