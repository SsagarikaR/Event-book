import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../config/databse";

export const Event=sequelize.define(
    'Event',
    {
        EventID:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        EventName:{
            type:DataTypes.STRING,
            allowNull:false
            
        }
    }
)
console.log(Event ===sequelize.models.Event);