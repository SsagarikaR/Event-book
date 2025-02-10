import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../config/databse";

export const User=sequelize.define(
    'User',
    {
        UserID:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        UserName:{
            type:DataTypes.STRING,
            allowNull:false
            
        },
        UserEmail:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }
)
console.log(User ===sequelize.models.User);