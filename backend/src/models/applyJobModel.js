import mongoose from "mongoose"
import Job from "./jobModel.js"

const applyJobSchema = new mongoose.Schema(
  {

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
 
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique:true,
    
      lowercase: true,
      trim: true,
    },

   

    higherEducation: {
      type: String,
      required: true,
      trim: true,
    },

    higherEducationPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    twelfthPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    tenthPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    experience: {
      type: String,
      default: "Fresher",
      trim: true,
    },

    resume: {
      type: String,
      default: "",
      required:true,
    },
  },
  {
    timestamps: true,
  }
);
const ApplyJob = mongoose.model("ApplyJob", applyJobSchema);
export default ApplyJob;