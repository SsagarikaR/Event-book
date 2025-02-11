import { sequelize } from "../config/databse";
import { QueryTypes, Sequelize } from "sequelize";
import { Request,Response,Router } from "express";
import { Booking } from "models/Booking";
import { createBooking, deleteBooking, getAllBookingByEventName, updateBooking } from "../controllers/BookingController";

const router=Router();

 router.post("/",async(req:Request,res:Response):Promise<any>=>{
   createBooking(req,res)
 })



 router.get("/",async(req:Request,res:Response):Promise<any>=>{
   getAllBookingByEventName(req,res)
 })



 router.patch("/",async(req:Request,res:Response):Promise<any>=>{
  updateBooking(req,res)
 })



 router.delete("/",async(req:Request,res:Response):Promise<any>=>{
   deleteBooking(req,res)
 })
 export default router;