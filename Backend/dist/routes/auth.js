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
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserName, UserEmail, Password } = req.body;
    try {
        const user = yield databse_1.sequelize.query('SELECT * FROM Customers WHERE CustomerName=? OR CustomerEmail=? ', {
            replacements: [UserName, UserEmail],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (user.length > 0) {
            return res.status(409).json({ message: "This user is already registed" });
        }
        const [result, metadata] = yield databse_1.sequelize.query('INSERT INTO Customers (CustomerName,CustomerEmail,Password) VALUES (?,?,?)', {
            replacements: [UserName, UserEmail, Password],
            type: sequelize_1.QueryTypes.INSERT
        });
        console.log(result, metadata);
        if (metadata > 1) {
            return res.status(202).json({ message: "You have successfully registered." });
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
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserName, UserEmail, Password } = req.body;
    try {
        const user = yield databse_1.sequelize.query('SELECT * FROM Customers WHERE CustomerName=? AND CustomerEmail=? AND Password=?', {
            replacements: [UserName, UserEmail, Password],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (user.length > 0) {
            return res.status(202).json({ message: "You have successfully signed in." });
        }
        else {
            return res.status(404).json({ message: "You have not created a account yet" });
        }
    }
    catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after sometimes!!" });
    }
}));
exports.default = router;
