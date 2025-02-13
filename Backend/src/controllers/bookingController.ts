import { sequelize } from "../db/databse";
import { Request,Response } from "express";
import { QueryTypes } from "sequelize";

export async function createBooking(req:Request,res:Response) {
     const {EventId,userId}=req.body;
        try{
            const user=await sequelize.query('SELECT * FROM Bookings WHERE BookedBy=? AND EventId=? ',
                {
                    replacements:[userId,EventId]
                    ,type:QueryTypes.SELECT
                }
            )
            if(user.length>0){
                return res.status(403).json({message:"This event is already booked by you"})
            }
            const [result,metadata]=await sequelize.query('INSERT INTO Bookings (BookedBy,EventID) VALUES (?,?)',
                {
                    replacements:[userId,EventId]
                    ,type:QueryTypes.INSERT
                }
            )
            console.log(result,metadata)
            return res.status(202).json({message:"You have successfully booked the event."})
        }
        catch(error){
            console.log(error,"error");
            return res.status(500).json({error:"Please try again after sometimes!!"})
        }
}


export async function  getAllBookingByEventName(req:Request,res:Response) {
     try{
            const allBooking=await sequelize.query(`SELECT Bookings.BookingID, Bookings.BookedBy, Events.EventName 
            FROM Bookings 
            JOIN Events ON Bookings.EventID = Events.EventID`,
            {
                type: QueryTypes.SELECT
            }
            );
            console.log(allBooking)
            return res.status(200).json(allBooking);
        }
        catch(error){
            console.log(error,"error");
            return res.status(500).json({error:"Please try again after sometimes!!"})
        }
}
