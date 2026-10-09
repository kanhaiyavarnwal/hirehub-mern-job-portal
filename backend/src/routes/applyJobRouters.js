import express from "express"
import { uploadResume } from "../middleware/multer.js"
import { applyJob, getJobApplications } from "../controllers/applyJobs.js"
import userAuth from "../middleware/userAuth.js"
import adminAuth from "../middleware/adminAuth.js"


const router = express.Router()

router.post("/applyjob",userAuth,uploadResume.single("resume"),applyJob)
router.get("/getJobApply/:id",adminAuth,getJobApplications)


export default router