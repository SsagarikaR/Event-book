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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/databse");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
() => __awaiter(void 0, void 0, void 0, function* () {
    // await Event.sync({alter:true});
    // await User.sync({alter:true});
    // await Booking.sync({alter:true});
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("App is listening on port 300");
}));
app.listen(port, () => {
    console.log("app is listening on port 3000");
});
