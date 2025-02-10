import { sequelize} from "../config/databse";
import { User } from "./User";
import { Event } from "./Event";
import { Sequelize, DataTypes, Model } from "sequelize";

export const Booking=sequelize.define(
    'Booking',
    {
        BookingID:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        BookedBy:{
            type:DataTypes.INTEGER,
            references:{
                model:User,
                key:'UserID'
            }
        },
        EventID:{
            type:DataTypes.INTEGER,
            references:{
                model:Event,
                key:'EventID'
            }
        }
    }
)
console.log(Model ===sequelize.models.Model);