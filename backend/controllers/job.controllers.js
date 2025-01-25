import {JobModel} from'../models/job.models.js'

export const jobCreat=async(req,res)=>{

const { name, description, requirements, salary, location, jobType, experience, position, companyId}= req.body;
const userId = req.id
const data = { name, description, requirements, salary, location, jobType, experience, position, companyId}
if(!data){
    return res.status(404).json({message: 'some filed is due',
        success:false
    })
}
const job = await JobModel.create({
    name, description,  
     requirements:requirements.split(','), salary:Number(salary), location, jobType, experienceLevel:experience, position, company:companyId,created_by:userId
})
if(!job){
    return res.status(404).json({
        message: 'sorry some errr in the job creation ', 
    success:false})
}
return res.status(200).json({message:'success job created',
    success:true
})





}

//searching jobs
export const AllJob=async(req,res) => {

    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { descriptions: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await JobModel.find(query).populate({path:"company"})
        
        if (jobs.length===0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        }; 
        return res.status(200).json({ 
            jobs,
            success: true
        })
    } catch (error) {
        res.status(404).json({message:"error in fetch all jobs"})
        console.log(error);
    }}
//student for redirect the job
export const JobById=async (req,res)=>{
    const JobId = req.params.id;
    const jobs = await JobModel.find({JobId})
    const namee = await JobModel.find({
        name: { $regex: "", $options: "i" }

    })
    if(!namee){
       return res.status(404).json({message:'not found'})
        
    }
    if(namee){
        return res.status(200).json({
            message:"jobs",
            namee,
            success:true
        })
    }
    if(jobs===0){
        return res.status(404).json({message: "job not founds",success:false})
    }

    return res.status(200).json({jobs,success:true})


}
//job created by admin 
export const JobCreatByAdmin=async(req,res)=>{
const adminId = req.id
const adminJob = await JobModel.find({created_by:adminId})

if(!adminJob){
    return res.status(404).json({message: "admin jobs not found",success:false})
}
return res.status(200).json({adminJob,success:true})
}