import multer from "multer";
import express from "express"
import {createdJob, getAllJobs, getJobById,deleteJob} from "../controllers/jobCreation.js"
import adminAuth from "../middleware/adminAuth.js"

const router  = express.Router()
const upload = multer();
router.post("/jobCreated", upload.none(),adminAuth,createdJob)
router.get("/getAllJob",getAllJobs)
router.get("/getJob/:id",adminAuth,getJobById)
router.delete("/deleteJob/:id",adminAuth,deleteJob)
export default router