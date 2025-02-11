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
            
        },
        date:{
            type:DataTypes.DATEONLY,
            allowNull:false,
            defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
        },
        location:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false
    }
)
console.log(Event ===sequelize.models.Event);