import { Company } from "../models/company.model.js"

export const CompanyRegister = async(req,res)=>
    {

        try {
            
        
        const {companyName}= req.body
        if(!companyName){
            return res.status(404).json({
                message:'Company not found'
            })
            
        }
        let company = await Company.findOne({
           name:companyName
        })
        if(company){
            return res.status(200).json({
                message:'Company registered  already',
                success:false
            })

        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
        
        }

        catch (error) {
            console.log(`error in company register${error}`)
        }
    }


    export const getCompany =async(req,res)=>{
        try{

            const userId = req.id
            const Companies = await Company.find({userId})
            if(!Companies){
                return res.status(404).json({
                    message: "Company not found",
                    success:false
                    
                })
            } 
            return (
                console.log(Companies),
                res.status(200).json({

                message: "Company registered",
                Companies,
                success: true,
                

                    
                    
                    
                
                
            })
            
        )
            
        }
 catch(err){
    console.log(`err in getCompnay :${err}`)
 }

    }
    export const CompanyByid = async(req,res)=>{
        try {
            
            
            
            const companyId = req.params.id
            const company= await Company.findById(companyId)
            if(!company){
                return res.status(404).json({
                message: "Company not found",
                success:false
            })
        }
        res.status(200).json({
            message: 'Company successfully found',
            company,
            success:true 
        })
        
    } catch (error) {
    console.log(`err in Compnaynotfound${error}`)
        
    }

    }
    export const companyUpdate=async(req,res)=>{

try {
    
    const {name, description,website,location} = req.body
    const file = req.files
    
    
    const data = {name, description,website,location,file}
    const company = await Company.findByIdAndUpdate(req.params.id,data,{new:true}) 
    if(!company){
        return res.status(404).json({
            message: 'Company not found',
            success:false
        })
    }
    
    return res.status(200).json({
        message: 'Company successfully updated',
        success:true
    })
    
} catch (error) {
    console.log(`error: in company Update ${error}`)
    
}

       


    }