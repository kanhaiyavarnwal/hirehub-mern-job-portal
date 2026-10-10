import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  BriefcaseBusiness,
  MapPin,
  IndianRupee,
  Clock,
  Upload,
  ArrowLeft,
  Send,
  FileText,
  User,
  GraduationCap,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { backendUrl } from "../App";

const ApplyJob = ({ token }) => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resume, setResume] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    higherEducation: "",
    higherEducationPercentage: "",
    twelfthPercentage: "",
    tenthPercentage: "",
    experience: "Fresher",
  });

  // Fetch the selected job using the job ID in the URL
  const fetchJob = async () => {
    try {
      setLoading(true);

      // Finds the selected job by its MongoDB ID.
      const { data } = await axios.get(`${backendUrl}/job/getAllJob`);

      if (data.success && Array.isArray(data.jobs)) {
        const selectedJob = data.jobs.find((item) => item._id === jobId);

        if (selectedJob) {
          setJob(selectedJob);
        } else {
          toast.error("Job not found");
        }
      } else {
        toast.error("Unable to fetch job details");
      }
    } catch (error) {
      console.error("Fetch job error:", error);
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["application/pdf", "application/msword"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      e.target.value = "";
      setResume(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be smaller than 5 MB");
      e.target.value = "";
      setResume(null);
      return;
    }

    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = token || localStorage.getItem("token");

    if (!authToken) {
      toast.error("Please log in before applying");
      navigate("/login");
      return;
    }

    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    const percentageFields = [
      formData.higherEducationPercentage,
      formData.twelfthPercentage,
      formData.tenthPercentage,
    ];

    for (const percentage of percentageFields) {
      if (
        percentage !== "" &&
        (Number(percentage) < 0 || Number(percentage) > 100)
      ) {
        toast.error("Percentages must be between 0 and 100");
        return;
      }
    }

    try {
      setSubmitting(true);

      const applicationData = new FormData();

      applicationData.append("jobId", jobId);
      applicationData.append("firstName", formData.firstName.trim());
      applicationData.append("lastName", formData.lastName.trim());
      applicationData.append("email", formData.email.trim().toLowerCase());
      applicationData.append(
        "higherEducation",
        formData.higherEducation.trim(),
      );
      applicationData.append(
        "higherEducationPercentage",
        formData.higherEducationPercentage,
      );
      applicationData.append("twelfthPercentage", formData.twelfthPercentage);
      applicationData.append("tenthPercentage", formData.tenthPercentage);
      applicationData.append("experience", formData.experience);
      applicationData.append("resume", resume);

      // Change this URL if your apply router has a different mount path.
      const { data } = await axios.post(
        `${backendUrl}/application/applyjob`,
        applicationData,
        {
          headers: {
            token: authToken,
          },
        },
      );
      //  console.log("response  apply jon : ",data)
      if (data.success) {
        toast.success("Application submitted successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Application failed");
      }
    } catch (error) {
      console.error("Application error:", error.message);

      toast.error(
        error.response?.data?.message ||
          "Login again" ||
          "unable to submit your application",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3 bg-slate-50">
        <LoaderCircle className="animate-spin text-blue-600" size={28} />
        <p className="text-sm text-slate-500">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <BriefcaseBusiness size={48} className="mb-4 text-slate-300" />
        <h2 className="text-2xl font-bold text-slate-900">Job not found</h2>
        <p className="mt-2 text-slate-500">
          This job may have been removed or is no longer available.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Back to jobs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BriefcaseBusiness size={22} />
            </span>
            <span className="text-2xl font-extrabold text-slate-900">
              Hire<span className="text-blue-600">Hub</span>
            </span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            Career opportunity
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Apply for this job
          </h1>
          <p className="mt-3 text-slate-500">
            Complete your details and submit your application.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.4fr]">
          {/* Job details */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BriefcaseBusiness size={28} />
              </div>

              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={14} className="mr-1.5" />
                Open position
              </span>

              <h2 className="mt-4 break-words text-2xl font-bold text-slate-900">
                {job.jobTitle}
              </h2>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <MapPin size={19} className="shrink-0 text-blue-600" />
                  <span>{job.location || "Location not specified"}</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Clock size={19} className="shrink-0 text-blue-600" />
                  <span>{job.experience || "Experience not specified"}</span>
                </div>

                <div className="flex items-start gap-3 text-sm font-semibold text-slate-800">
                  <IndianRupee
                    size={19}
                    className="shrink-0 text-emerald-600"
                  />
                  <span>{job.salary || "Salary not disclosed"}</span>
                </div>
              </div>

              <div className="my-6 border-t border-slate-100" />

              <h3 className="font-bold text-slate-900">Job description</h3>

              <p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-slate-600">
                {job.jobDescription || "No description available."}
              </p>

              {Array.isArray(job.bestToHave) && job.bestToHave.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 font-bold text-slate-900">
                    Preferred skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.bestToHave.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="font-bold text-blue-900">Before you apply</h3>
              <p className="mt-2 text-sm leading-6 text-blue-800">
                Make sure your contact information and education details are
                correct. Upload an up-to-date resume in PDF or Word format.
              </p>
            </div>
          </aside>

          {/* Application form */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-7 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Application details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Fields marked with * are required.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal information */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                  <User size={18} className="text-blue-600" />
                  Personal information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      First name *
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="First name"
                      autoComplete="given-name"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Last name *
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Last name"
                      autoComplete="family-name"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                  <GraduationCap size={20} className="text-blue-600" />
                  Education details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Highest education *
                    </label>
                    <input
                      name="higherEducation"
                      value={formData.higherEducation}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. B.Tech in Computer Science"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Graduation %
                      </label>
                      <input
                        name="higherEducationPercentage"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={formData.higherEducationPercentage}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g. 75"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Class 12 %
                      </label>
                      <input
                        name="twelfthPercentage"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={formData.twelfthPercentage}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g. 80"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Class 10 %
                      </label>
                      <input
                        name="tenthPercentage"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={formData.tenthPercentage}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g. 85"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                  <BriefcaseBusiness size={18} className="text-blue-600" />
                  Work experience
                </h3>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Experience level *
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="Fresher">Fresher</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-3 years">2-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              {/* Resume upload */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                  <Upload size={18} className="text-blue-600" />
                  Upload resume
                </h3>

                <label
                  htmlFor="resume"
                  className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Upload size={23} />
                  </div>

                  <span className="text-sm font-semibold text-slate-800">
                    {resume ? resume.name : "Click to upload your resume"}
                  </span>

                  <span className="mt-2 text-xs text-slate-500">
                    PDF or DOC/DOCX · Maximum 5 MB
                  </span>

                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="sr-only"
                  />
                </label>

                {resume && (
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                    <div className="flex min-w-0 items-center gap-2 text-sm text-emerald-800">
                      <FileText size={18} className="shrink-0" />
                      <span className="truncate">{resume.name}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setResume(null)}
                      className="ml-3 text-xs font-semibold text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Submitting application...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit application
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Please review your information before submitting.
                </p>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} HireHub. Connecting talent with
          opportunity.
        </div>
      </footer>
    </div>
  );
};
export default ApplyJob;
