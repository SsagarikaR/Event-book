import { sequelize } from "../config/databse";
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
                return res.status(409).json({message:"This event is already booked by you"})
            }
            const [result,metadata]=await sequelize.query('INSERT INTO Bookings (BookedBy,EventID) VALUES (?,?,?)',
                {
                    replacements:[userId,EventId]
                    ,type:QueryTypes.INSERT
                }
            )
            console.log(result,metadata)
            if(metadata===1){
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
}


export async function  getAllBookingByEventName(req:Request,res:Response) {
     try{
            const allBooking=sequelize.query(`SELECT Bookings.BookingID, Bookings.BookedBy, Events.EventName 
            FROM Bookings 
            JOIN Events ON Bookings.EventID = Events.EventID`,
            {
                type: QueryTypes.SELECT
            }
            );
            return res.status(200).json(allBooking);
        }
        catch(error){
            console.log(error,"error");
            return res.status(500).json({error:"Please try again after sometimes!!"})
        }
}


export async function  updateBooking(req:Request,res:Response) {
      const {eventID,bookingID}=req.body
        try{
            const updateBooking=await sequelize.query('UPDATE Bookings SET EventID=? WHERE BookingID=?',
                {
                    replacements:[eventID,bookingID],
                    type:QueryTypes.UPDATE
                }
            )
            return res.status(200).json({message:"Updated Booking successfully"});
        }
        catch(error){
            console.log(error,"error")
            return res.status(500).json({error:"Please try again after sometimes!!"})
        }
}



export async function  deleteBooking(req:Request,res:Response) {
    const {bookingID}=req.body
    try{
        await sequelize.query('DELETE FROM Bookings WHERE BookingID=?',{
            replacements:[bookingID],
            type:QueryTypes.DELETE
        })
        return res.status(200).json({message:"Successfully deleted this event"});
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!!"})
    }
}