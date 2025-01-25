import mongoose from "mongoose";
const {Schema} = mongoose

const ApplicationSChema= new Schema({
    name:{
        type:mongoose.Types.ObjectId,
        ref:'Job',
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
export const Application = mongoose.model('ApplicationSChema',ApplicationSChema)