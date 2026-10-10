import Job from "../models/jobModel.js";

const createdJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, experience, salary, location } = req.body;

    let { bestToHave } = req.body;

    if (!jobTitle || !jobDescription || !experience || !salary || !location) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    if (typeof bestToHave === "string") {
      try {
        bestToHave = JSON.parse(bestToHave);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid bestToHave format",
        });
      }
    }

    if (
      bestToHave !== undefined &&
      (!Array.isArray(bestToHave) ||
        !bestToHave.every((item) => typeof item === "string"))
    ) {
      return res.status(400).json({
        success: false,
        message: "bestToHave must be an array of strings",
      });
    }

    // console.log("Request body:", req.body);
    // console.log("Parsed requirements:", bestToHave);

    const job = await Job.create({
      jobTitle,
      jobDescription,
      experience,
      salary,
      location,
      bestToHave: bestToHave || [],
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create job",
      error: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job",
      error: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete job",
      error: error.message,
    });
  }
};

export { createdJob, getAllJobs, deleteJob, getJobById };
