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
const auth_1 = __importDefault(require("./routes/auth"));
const Event_1 = __importDefault(require("./routes/Event"));
const booking_1 = __importDefault(require("./routes/booking"));
const body_parser_1 = __importDefault(require("body-parser"));
const Event_2 = require("./models/Event");
const User_1 = require("./models/User");
const Booking_1 = require("./models/Booking");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(body_parser_1.default.urlencoded({ extended: true }));
() => __awaiter(void 0, void 0, void 0, function* () {
    yield Event_2.Event.sync({ force: true });
    yield User_1.Customer.sync({ force: true });
    yield Booking_1.Booking.sync({ force: true });
});
app.use("/auth", auth_1.default);
app.use("/events", Event_1.default);
app.use("/bookings", booking_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("App is listening on port 300");
}));
app.listen(port, () => {
    console.log("app is listening on port 3000");
});
