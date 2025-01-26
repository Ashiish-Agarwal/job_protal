import { Application } from "../models/application.model.js"
import { JobModel} from '../models/job.models.js'



export const applyJob = async(req,res)=>{
try {
   
   const userId= req.id
   const jobid = req.params.id
    
   if(!jobid){
      return res.status(404).json({
         message:'job is required',
         success:false,
      })

     }
     const applicationcheck = await Application.findOne({
        applicants:userId,job:jobid
      })
      if(applicationcheck){
         return res.status(202).json({ 
         message:'already applied the job',
         success:false
      })}
      
      const job = await JobModel.findById(jobid)
      if(!job){
         res.status(200).json({
            message:'job not found in database',
         })
      }
      
      const newApplication = await Application.create({
         applicants:userId,job:jobid
      })
      
      if(newApplication){
         res.status(200).json({
            message:'application added successfully',
            success:true
            
         }) 
      }
      job.application.push(newApplication._id)
      await job.save()
      return res.status(200).json({
         message:'application applied successfully',
         newApplication,
         success:true
      }) 
   }
   
 catch (error) {

   console.log(`error in creating application: ${error}`)
   return res.status(500).json({
      message: 'application error creation', 
      sucess:false
   })
}
   

}
//aplied jobs pepole applied for what jobs

export const getAppliedJobs= async(req,res)=>{
   try{
const userId = req.id

const jobsApplied = await Application.find({applicants:userId }).sort({createdAt:-1}).populate({
   path:'job',
   options:{sort:{createdAt:-1}},
   populate:{
       path:'company',
       options:{sort:{createdAt:-1}},
   }})
   if (!jobsApplied || jobsApplied.length === 0) { // Check if no jobs were found
      return res.status(404).json({
        message: 'No jobs found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Jobs found',
      jobsApplied,
      success: true,
    });


      
         }catch (error) {
      
            console.log(`eeror in creating application: ${error}`)
            return res.status(500).json({
               message: 'application error creation',
               sucess:false
            })
         }
         
      }


      export const getApplicants = async(req,res) => {

         try{
            const id = req.params.id

            if(!id){

               return res.status(500).json({
                  message: 'add job name ',
                  sucess:false
               })}
            
            const jobsApplied = await  JobModel.findById(id).populate({
               
                  path: 'application',  // Populating the 'application' field
                  populate: {
                    path: 'applicants', // Populating the 'applicants' field within each 'Application'
                  },
                  options: { sort: { createdAt: -1 } },  // Sorting applications by 'createdAt'
                
            })


            if(!jobsApplied){

               return res.status(500).json({
                  message: 'we have nothing application would you applied ',
                  sucess:false
               })
            }
            return res.status(200).json({
               message:'here the all aplicants',
               jobsApplied,
               sucess:true
            })


      }catch (error) {
         
            console.log(`eeror in getApplicants : ${error}`)
            return res.status(500).json({
               message: 'application error ',
               sucess:false
            })
         }
      }

      export const updateApplication = async (req,res) => {
         try {
             const {status} = req.body;
             const applicationId = req.params.id;
             if(!status){
                 return res.status(400).json({
                     message:'status is required',
                     success:false
                 })
             };
     
             // find the application by applicantion id
             const application = await Application.findOne({_id:applicationId});
             if(!application){
                 return res.status(404).json({
                     message:"Application not found.",
                     success:false
                 })
             };
     
             // update the status
             application.status = status.toLowerCase();
             await application.save();
     
             return res.status(200).json({
                 message:"Status updated successfully.",
                 success:true 
             });
     
         } catch (error) {
             console.log(error);
         }
     }