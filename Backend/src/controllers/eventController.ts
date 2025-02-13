import { sequelize } from "../db/databse";
import { Request,Response } from "express";
import { QueryTypes } from "sequelize";


export async function createEvent(req:Request,res:Response) {
    const {EventName,location,date}=req.body;
    try{
        const user=await sequelize.query('SELECT * FROM Events WHERE EventName=?  ',
            {
                replacements:[EventName]
                ,type:QueryTypes.SELECT
            }
        )
        if(user.length!==0){
            return res.status(409).json({message:"This event is already exist"})
        }
        const [result,metadata]=await sequelize.query('INSERT INTO Events (EventName,location,date) VALUES (?,?,?)',
            {
                replacements:[EventName,location,date]
                ,type:QueryTypes.INSERT
            }
        )
        console.log(result,metadata)
        if(metadata>0){
            return res.status(202).json({message:"You have successfully added a new event."})
        }
        else{
            return res.status(403).json({message:"error adding a new event"})
        }
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!!"})
    }
}



export async function getEvents(req: Request, res: Response) {
    try {
        const allEvent = await sequelize.query('SELECT * FROM Events', {
            type: QueryTypes.SELECT
        });

        if (allEvent.length > 0) {
            return res.status(200).json(allEvent);  
        } else {
            return res.status(404).json({ message: "No Event exists" });  
        }
    } catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: "Please try again after some time!!" }); 
    }
}




export async function getEventByName(req:Request,res:Response) {
     const {name}=req.params
    try{
        const getByName=await sequelize.query('SELECT * FROM Events WHERE EventName=?',
            {
                replacements:[name],
                type:QueryTypes.SELECT
            }
        )
        return res.status(200).json(getByName)
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!!"})
    }
}



export async function updateEvent(req:Request,res:Response) {
    const {eventID,location,date,EventName}=req.body
    console.log(req.body)
    try{
        const deleteEvent=await sequelize.query('UPDATE Events set EventName=? , date=? ,location=? WHERE EventID=?',
            {
                replacements:[EventName,date,location,eventID],
                type:QueryTypes.DELETE
            }
        )
        return res.status(202).json({message:"Updated the event location successfully"});
    }
    catch(error){
        console.log(error,"error")
        return res.status(500).json({error:"Please try again after sometimes"});
    }
}



export async function deleteEvent(req:Request,res:Response){
    console.log(req.body)
    const {eventID}=req.body
    try{
        const deleteEvent=await sequelize.query('DELETE FROM Events WHERE EventID=?',
            {
                replacements:[eventID],
                type:QueryTypes.DELETE
            }
        )
        return res.status(202).json({message:"Deleted the event successfully"});
    }
    catch(error){
        console.log(error,"error")
        return res.status(500).json({error:"Please try again after sometimes"});
    }
}

