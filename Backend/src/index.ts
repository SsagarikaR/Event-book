import express,{Request,Response,Application, urlencoded} from "express";
import "./config/databse"
import eventAPI from "./routes/Event"
import bookingAPI from "./routes/booking"
import bodyParser from "body-parser";
import { Event } from "./models/Event";
import { Booking } from "./models/Booking";
import cors from "cors"
const app: Application = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

async()=>{
    // await Event.sync({alter:true});
    // await Booking.sync({force:true});
}

app.use("/events",eventAPI);
app.use("/bookings",bookingAPI);

app.get("/",async(req:Request,res:Response)=>{
    res.send("App is listening on port 300");
})

app.listen(port,()=>{
    console.log("app is listening on port 3000");
})