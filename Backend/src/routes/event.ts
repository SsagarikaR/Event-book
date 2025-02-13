import { Request,Response,Router } from "express";
import { createEvent, deleteEvent, getEventByName, getEvents, updateEvent } from "../controllers/eventController";

const router=Router();

 router.post("/",async(req:Request,res:Response):Promise<any>=>{
    createEvent(req,res);
 })


 router.get("/",async(req:Request,res:Response):Promise<any>=>{
   getEvents(req,res)
 })


 router.get("/:name",async (req:Request,res:Response):Promise<any>=>{
   getEventByName(req,res)
 })
 
 router.patch("/",async(req:Request,res:Response):Promise<any>=>{
    updateEvent(req,res)
 })
 
 router.delete("/",async(req:Request,res:Response):Promise<any>=>{
    deleteEvent(req,res);
 })
 export default router;