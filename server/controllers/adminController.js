import jwt from 'jsonwebtoken'
import Job from '../models/Job.js';

import nodemail from '../config/nodemailer.js';
export const adminLogin =async (req,res)=>{
    try {
        const {email,password}=req.body;
    if(password===process.env.ADMIN_PASSWORD && email===process.env.ADMIN_EMAIL){
        const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('adminToken',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            path:'/',
            maxAge:7*24*60*60*1000,
        })
        return res.json({
            success:true,
            message:'Admin logged in successfully',
        })
    }else{
        return res.json({
            success:false,
            message:'Invalid email or password',
        })
    }
    } catch (error) {
        console.log(error.message);
        return res.json({
            success:false,
            message:error.message,
        })
        
        
    }
}
export const isAdminAuth=async (req,res)=>{
    try {
        return res.json({
            success:true,
            message:"Admin is authenticated"
        })
        
    } catch (error) {
        console.log(error.message);
        
        res.json({
            success:false,
            message:error.message
        })
    }
} 
export const adminLogout=async (req,res)=>{
    try {
        res.clearCookie('adminToken',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            path:'/',
            maxAge:7*24*60*60*1000,
            
            

        });
        return res.json({
            success:true,
            message:"Logged out successfully"
        })
    } catch (error) {
        console.log(error.message);
        
        res.json({
            success:false,
            message:error.message
        })
    }
}
export const getAllJobs = async (req, res) => {
  try {
  

    const jobs = await Job.find()
      .populate('user', 'name email') ;

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error('Admin Get All Jobs Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
export const editStatus = async (req, res) => {
  try {
    const { jobId, newStatus } = req.body;

    if (!jobId || !newStatus) {
      return res.status(400).json({
        success: false,
        message: 'Job ID and new status are required',
      });
    }

    const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { status: newStatus },
      { new: true }
    ).populate('user', 'name email');
    let userEmail=updatedJob.user.email;
    

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

     await nodemail(userEmail,`Your Job Status Changed to ${newStatus}`);
    return res.json({
      success: true,
      message: 'Job status updated successfully',
      job: updatedJob,
    });
  } catch (error) {
    console.error('Edit Job Status Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
