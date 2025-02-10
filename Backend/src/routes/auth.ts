import { sequelize } from "../config/databse";
import { QueryTypes, Sequelize } from "sequelize";
import { Request,Response,Router } from "express";

const router=Router();

 router.post("/signup",async(req:Request,res:Response):Promise<any>=>{
    const {UserName,UserEmail,Password}=req.body;
    try{
        const user=await sequelize.query('SELECT * FROM Customers WHERE CustomerName=? OR CustomerEmail=? ',
            {
                replacements:[UserName,UserEmail]
                ,type:QueryTypes.SELECT
            }
        )
        if(user.length>0){
            return res.status(409).json({message:"This user is already registed"})
        }
        const [result,metadata]=await sequelize.query('INSERT INTO Customers (CustomerName,CustomerEmail,Password) VALUES (?,?,?)',
            {
                replacements:[UserName,UserEmail,Password]
                ,type:QueryTypes.INSERT
            }
        )
        console.log(result,metadata)
        if(metadata>1){
            return res.status(202).json({message:"You have successfully registered."})
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

 router.post("/signin",async(req:Request,res:Response):Promise<any>=>{
    const {UserName,UserEmail,Password}=req.body;
    try{
        const user=await sequelize.query('SELECT * FROM Customers WHERE CustomerName=? AND CustomerEmail=? AND Password=?',
            {
                replacements:[UserName,UserEmail,Password]
                ,type:QueryTypes.SELECT
            }
        )
        if(user.length>0){
            return res.status(202).json({message:"You have successfully signed in."});
        }
        else{
            return res.status(404).json({message:"You have not created a account yet"});
        }
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!!"})
    }
 })

 export default router ;