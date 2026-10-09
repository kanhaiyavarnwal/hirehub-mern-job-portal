




import ApplyJob from "../models/applyJobModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import sendOTPEmail from "../utils/emailSend.js";
import mongoose from "mongoose"

const applyJob = async (req, res) => {
  

  try {
    const  userId = req.user.id
    console.log("userid :",userId)
    const {
     
      jobId,
      firstName,
      lastName,
      email,
      higherEducation,
      higherEducationPercentage,
      twelfthPercentage,
      tenthPercentage,
      experience,
    } = req.body;
  console.log("body in applyjob : ",req.body)
    // 1. Validate required IDs
    if (!userId  ) {
      return res.status(400).json({
        success: false,
        message: "User ID  is required",
      });
    }
    if (!jobId  ) {
      return res.status(400).json({
        success: false,
        message: "job ID  is required",
      });
    }

    // 2. Validate resume
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume",
      });
    }

    // 3. Validate required fields
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !higherEducation?.trim() ||
      higherEducationPercentage === undefined ||
      twelfthPercentage === undefined ||
      tenthPercentage === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

  const existedApplication = await ApplyJob.findOne({
  email: email.trim().toLowerCase(),
});

if (existedApplication) {
  return res.status(409).json({
    success: false,
    message: "You have already applied with this email",
  });
}

    // 4. Validate percentages
    const percentages = [
      Number(higherEducationPercentage),
      Number(twelfthPercentage),
      Number(tenthPercentage),
    ];

    if (
      percentages.some(
        (value) =>
          !Number.isFinite(value) || value < 0 || value > 100
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Percentages must be between 0 and 100",
      });
    }
     let resumePath = req.file?.path;
    // 5. Upload resume to Cloudinary
    const resumeUpload = await uploadOnCloudinary(resumePath);

    if (!resumeUpload?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Resume upload failed",
      });
    }

    // Cloudinary helper deletes the local file after successful upload
    resumePath = null;

    // 6. Save application in MongoDB
    const application = await ApplyJob.create({
      userId,
      jobId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      higherEducation: higherEducation.trim(),
      higherEducationPercentage: percentages[0],
      twelfthPercentage: percentages[1],
      tenthPercentage: percentages[2],
      experience: experience?.trim() || "Fresher",
      resume: resumeUpload.secure_url,
    });
    console.log("application in job : ",application)
    await sendOTPEmail(application.email,"thanks for applying")
    return res.status(201).json({
      success: true,
      message: "Job application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply job error:", error);

  
      
    

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
//   } finally {
//     if (resumePath) {
//       await fs.unlink(resumePath).catch(() => {});
//     }
  }
};

const getJobApplications = async (req, res) => {
  try {
    const {id: jobId}  = req.params;
  console.log("jobId: ",jobId)
    // Validate job ID
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }
console.log("161")
    // Find applications for the selected job
    const applications = await ApplyJob.find({ jobId })
      .populate("userId", "name email")
      .populate(
        "jobId",
        "jobTitle jobDescription experience salary"
      )
    //   .sort({ createdAt: -1 });
console.log("application by id : ",applications)
    return res.status(200).json({
      success: true,
      message: "Job applications fetched successfully",
      job: applications[0]?.jobId ,
      totalApplications: applications.length,
      applications: applications.map((application) => ({
        applicationId: application._id,
        userId: application.userId,
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        higherEducation: application.higherEducation,
        higherEducationPercentage:
          application.higherEducationPercentage,
        twelfthPercentage: application.twelfthPercentage,
        tenthPercentage: application.tenthPercentage,
        experience: application.experience,
        resume: application.resume,
        appliedAt: application.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get job applications error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job applications",
    });
  }
};

export {applyJob,getJobApplications };




