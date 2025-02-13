import { Request,Response,Router } from "express";
import { createBooking,getAllBookingByEventName } from "../controllers/bookingController";

const router=Router();

 router.post("/",async(req:Request,res:Response):Promise<any>=>{
   createBooking(req,res)
 })

 router.get("/",async(req:Request,res:Response):Promise<any>=>{
   getAllBookingByEventName(req,res)
 })

 export default router;