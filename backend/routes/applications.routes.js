import express from 'express'
import { applyJob, getApplicants, getAppliedJobs, updateApplication } from '../controllers/application.controller.js';
import isAuthenticated from '../middlewares/user.authenticate.js';
const applicationsrouter = express.Router();

applicationsrouter.route('/get/:id').get(isAuthenticated, applyJob)
applicationsrouter.route('/get').get(isAuthenticated, getAppliedJobs)
applicationsrouter.route('/:id/applicants').get(isAuthenticated, getApplicants)
applicationsrouter.route('/status/:id/update').get( isAuthenticated, updateApplication)
export default applicationsrouter 