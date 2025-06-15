import express from "express";

import authUser from "../middlewares/authUser.js";
import { createJob, deleteJob, getJobById, getJobs, updateJob } from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.use(authUser);

jobRouter.get("/", getJobs);
jobRouter.post("/", createJob);
jobRouter.get("/:id", getJobById);
jobRouter.put("/:id", updateJob);
jobRouter.delete("/:id", deleteJob);

export default jobRouter;
