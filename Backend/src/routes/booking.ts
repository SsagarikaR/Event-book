import { sequelize } from "../config/databse";
import { QueryTypes, Sequelize } from "sequelize";
import { Request,Response,Router } from "express";
import { Booking } from "models/Booking";

const router=Router();

 router.post("/booking/:userId",async(req:Request,res:Response):Promise<any>=>{
    const {userId}=req.params;
    const {EventId}=req.body;
    try{
        const user=await sequelize.query('SELECT * FROM Bookings WHERE BookedBy=? AND EventId=? ',
            {
                replacements:[userId,EventId]
                ,type:QueryTypes.SELECT
            }
        )
        if(user.length>0){
            return res.status(409).json({message:"This event is already booked by you"})
        }
        const [result,metadata]=await sequelize.query('INSERT INTO Bookings (BookedBy,EventID) VALUES (?,?,?)',
            {
                replacements:[userId,EventId]
                ,type:QueryTypes.INSERT
            }
        )
        console.log(result,metadata)
        if(metadata>1){
            return res.status(202).json({message:"You have successfully booked the event."})
        }
        else{
            return res.status(403).json({message:"error registering"})
        }
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!!"})
    }
 })


 router.get("/all-booking",async(req:Request,res:Response):Promise<any>=>{
    try{
        const allBooking=sequelize.query('SELECT * FROM Bookings ',
            {
                type:QueryTypes.SELECT
            }
        )
        return res.status(200).json(allBooking);
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!!"})
    }
 })

 export default router;