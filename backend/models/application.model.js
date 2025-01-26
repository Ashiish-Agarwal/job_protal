import mongoose from "mongoose";


const ApplicationSChema= new mongoose.Schema({
    job:{
        type:mongoose.Types.ObjectId,
        ref:'JobModel',
        requred:true
    },
    applicants:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        requred:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }


},{timestamps:true})
export const Application = mongoose.model('Application',ApplicationSChema)