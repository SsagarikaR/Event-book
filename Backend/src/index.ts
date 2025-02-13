import express,{Request,Response,Application, urlencoded} from "express";
import "./db/databse"
import eventAPI from "./routes/event"
import bookingAPI from "./routes/booking"
import bodyParser from "body-parser";
import { Event } from "./models/event";
import { Booking } from "./models/booking";
import cors from "cors"
const app: Application = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

async()=>{
    await Event.sync({alter:true});
    await Booking.sync({alter:true});
}

app.use("/events",eventAPI);
app.use("/bookings",bookingAPI);

app.get("/",async(req:Request,res:Response)=>{
    res.send("App is listening on port 300");
})

app.listen(port,()=>{
    console.log("app is listening on port 3000");
})