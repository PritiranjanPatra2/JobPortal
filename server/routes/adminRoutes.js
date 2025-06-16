import express from 'express'
import { adminLogin, adminLogout, editStatus, getAllJobs, isAdminAuth } from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter=express.Router();
adminRouter.post('/login',adminLogin);
adminRouter.get('/is-auth',authAdmin,isAdminAuth);
adminRouter.get('/logout',adminLogout);
adminRouter.get('/getAll',getAllJobs ); 
adminRouter.post('/edit-status',editStatus)

export default adminRouter;