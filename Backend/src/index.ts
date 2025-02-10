import express,{Request,Response,Application} from "express";
import "./config/databse"
import { Event } from "./models/Event";
import { User } from "./models/User";
import { Booking } from "./models/Booking";
const app: Application = express();
const port = process.env.PORT || 8000;

async()=>{
    // await Event.sync({alter:true});
    // await User.sync({alter:true});
    // await Booking.sync({alter:true});
}
app.get("/",async(req:Request,res:Response)=>{
    res.send("App is listening on port 300");
})

app.listen(port,()=>{
    console.log("app is listening on port 3000");
})