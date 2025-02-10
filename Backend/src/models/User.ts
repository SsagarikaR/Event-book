import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../config/databse";

export const Customer=sequelize.define(
    'Customer',
    {
        CustomerID:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        CustomerName:{
            type:DataTypes.STRING,
            allowNull:false
            
        },
        CustomerEmail:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        
    },
    {
        timestamps:false
    }
)
console.log(Customer ===sequelize.models.Customer);