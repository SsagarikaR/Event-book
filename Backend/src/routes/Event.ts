import { sequelize } from "../config/databse";
import { QueryTypes, Sequelize } from "sequelize";
import { Request,Response,Router } from "express";

const router=Router();

 router.post("/",async(req:Request,res:Response):Promise<any>=>{
    const {EventName,date,location}=req.body;
    try{
        const user=await sequelize.query('SELECT * FROM Events WHERE CEventName=?  ',
            {
                replacements:[EventName]
                ,type:QueryTypes.SELECT
            }
        )
        if(user.length>0){
            return res.status(409).json({message:"This user is already registed"})
        }
        const [result,metadata]=await sequelize.query('INSERT INTO Events (EventName,date,location) VALUES (?,?,?)',
            {
                replacements:[EventName,date,location]
                ,type:QueryTypes.INSERT
            }
        )
        console.log(result,metadata)
        if(metadata>1){
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
 })

 router.get("/all",async(req:Request,res:Response):Promise<any>=>{
    try{
        const allEvent=await sequelize.query('SELECT * FROM Events',
            {
                type:QueryTypes.SELECT
            }
        );
        if((await allEvent).length>0){
            return res.send(200).json(allEvent);
        }
        else{
            return res.status(404).json({message:"No Event exist"})
        }
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!!"})
    }
 })


 router.get("/:name",async (req:Request,res:Response):Promise<any>=>{
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
 })
 
 export default router;