import Job from "../models/Job.js";

export const  createJob = async (req, res) => {
  try {
    const { company, role, status, appliedDate, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: 'Company and role are required' });
    }

    const job = await Job.create({
      user: req.userId,
      company,
      role,
      status,
      appliedDate,
      notes,
    });

    res.status(201).json({
      job,
      message: 'Job created successfully',
      success: true
    });
  } catch (error) {
    res.status(500).json({ success:false,message: 'Server error', error });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.userId });
    res.status(200).json({
      jobs,
      message: 'Jobs retrieved successfully',
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.userId });

    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.userId });

    if (!job) return res.status(404).json({ message: 'Job not found' });

    const { company, role, status, appliedDate, notes } = req.body;

    job.company = company || job.company;
    job.role = role || job.role;
    job.status = status || job.status;
    job.appliedDate = appliedDate || job.appliedDate;
    job.notes = notes || job.notes;

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
