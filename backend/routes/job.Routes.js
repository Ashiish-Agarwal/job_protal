import express from 'express';
import { AllJob, JobById, jobCreat, JobCreatByAdmin } from '../controllers/job.controllers.js';
import  isAuthenticated from '../middlewares/user.authenticate.js'

const JobRouter = express.Router();

JobRouter.route('/post').post( isAuthenticated, jobCreat)
JobRouter.route('/getAlljobs').get(isAuthenticated ,AllJob)
JobRouter.route('/get/:id').get( isAuthenticated ,JobById)
JobRouter.route('/getadminjob').get( isAuthenticated,JobCreatByAdmin)

export default JobRouter
