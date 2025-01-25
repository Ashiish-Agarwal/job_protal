import mongoose from "mongoose";

  const  mongodb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB)
        
    
       
         console.log("mongodb connected")
        
            
        } catch (error) {
             console.log("mongodb error: " + error)
            
        }
}
export default mongodb
