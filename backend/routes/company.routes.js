import express from 'express'
import { CompanyRegister,CompanyByid,  companyUpdate, getCompany } from '../controllers/company.controllers.js'
import isAuthenticated  from '../middlewares/user.authenticate.js'

const CompanyRouter = express.Router()

CompanyRouter.route('/register').post(isAuthenticated , CompanyRegister)
CompanyRouter.route('/get').get(isAuthenticated  , getCompany)
CompanyRouter.route('/get/:id').get(isAuthenticated,CompanyByid)
CompanyRouter.route('/update/:id').put(isAuthenticated , companyUpdate)

export default CompanyRouter