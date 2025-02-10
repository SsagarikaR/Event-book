import express,{Request,Response,Application, urlencoded} from "express";
import "./config/databse"
import authAPI from "./routes/auth"
import eventAPI from "./routes/Event"
import bookingAPI from "./routes/booking"
import bodyParser from "body-parser";
import { Event } from "./models/Event";
import { Customer } from "./models/User";
import { Booking } from "./models/Booking";
const app: Application = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
async()=>{
    await Event.sync({force:true});
    await Customer.sync({force:true});
    await Booking.sync({force:true});
}

app.use("/auth",authAPI);
app.use("/events",eventAPI);
app.use("/bookings",bookingAPI);
app.get("/",async(req:Request,res:Response)=>{
    res.send("App is listening on port 300");
})

app.listen(port,()=>{
    console.log("app is listening on port 3000");
})