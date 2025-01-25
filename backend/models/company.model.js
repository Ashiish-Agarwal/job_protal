import mongoose from "mongoose";
const {Schema} = mongoose

const CompanySchema = new Schema({

    name:{
        type: String,
        required: true,
        unique: true
    },
    descriptions:{
        type: String,
      
    },
    website:{
        type: String,
       
    },
    location:{
        type: String,
        
    },
    logo:{
        type: String,
       
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
},{timestamps: true})


export const Company = mongoose.model("company", CompanySchema)