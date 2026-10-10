import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  BriefcaseBusiness,
  MapPin,
  IndianRupee,
  Clock,
  FileText,
  Plus,
  X,
  Send,
} from "lucide-react";
import { backendUrl } from "../App";

const CreateJob = ({ token }) => {
  const [form, setForm] = useState({
    jobTitle: "",
    jobDescription: "",
    experience: "",
    salary: "",
    location: "",
    bestToHave: [],
  });

  const [requirement, setRequirement] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addRequirement = () => {
    const value = requirement.trim();

    if (!value) {
      toast.error("Please enter a requirement");
      return;
    }

    if (
      form.bestToHave.some((item) => item.toLowerCase() === value.toLowerCase())
    ) {
      toast.error("This requirement has already been added");
      return;
    }

    setForm((prev) => ({
      ...prev,
      bestToHave: [...prev.bestToHave, value],
    }));

    setRequirement("");
  };

  const removeRequirement = (index) => {
    setForm((prev) => ({
      ...prev,
      bestToHave: prev.bestToHave.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("jobTitle", form.jobTitle.trim());
      formData.append("jobDescription", form.jobDescription.trim());
      formData.append("experience", form.experience.trim());
      formData.append("salary", form.salary.trim());
      formData.append("location", form.location.trim());

      //     Send the array as JSON from frontend to backend
      formData.append("bestToHave", JSON.stringify(form.bestToHave));

      // console.log("token: ",token)
      const { data } = await axios.post(
        `${backendUrl}/job/jobCreated`,
        formData,
        {
          headers: {
            token: token,
          },
        },
      );
      // console.log(data)
      if (!data.success) {
        toast.error(data.message || "Failed to create job");
        return;
      }

      toast.success(data.message || "Job created successfully!");

      setForm({
        jobTitle: "",
        jobDescription: "",
        experience: "",
        salary: "",
        location: "",
        bestToHave: [],
      });

      setRequirement("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create job");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <BriefcaseBusiness size={25} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Create a New Job
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Add a job opportunity and share it with potential candidates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Job Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the main details of the position.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="jobTitle" className={labelClass}>
                  Job Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="jobTitle"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="jobDescription" className={labelClass}>
                  Job Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={form.jobDescription}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and expectations..."
                  rows={6}
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="experience" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <Clock size={16} />
                      Experience
                    </span>
                  </label>

                  <input
                    id="experience"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g. 0-2 years"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="salary" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <IndianRupee size={16} />
                      Salary
                    </span>
                  </label>

                  <input
                    id="salary"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="e.g. 5-8 LPA"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="location" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} />
                      Job Location
                    </span>
                  </label>

                  <input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Bangalore, India / Remote"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Preferred requirements */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Preferred Requirements
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add skills or qualifications that are good to have.
              </p>
            </div>

            <label htmlFor="requirement" className={labelClass}>
              Add a Requirement
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="requirement"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addRequirement();
                  }
                }}
                placeholder="e.g. Experience with TypeScript"
                className={`${inputClass} flex-1`}
              />

              <button
                type="button"
                onClick={addRequirement}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                <Plus size={18} />
                Add
              </button>
            </div>

            {form.bestToHave.length > 0 && (
              <div className="mt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Added Requirements ({form.bestToHave.length})
                </p>

                <div className="flex flex-wrap gap-2">
                  {form.bestToHave.map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className="inline-flex max-w-full items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                    >
                      <span className="break-all">{item}</span>

                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        aria-label={`Remove ${item}`}
                        className="shrink-0 rounded p-0.5 hover:bg-blue-100"
                      >
                        <X size={15} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 pb-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setForm({
                  jobTitle: "",
                  jobDescription: "",
                  experience: "",
                  salary: "",
                  location: "",
                  bestToHave: [],
                });
                setRequirement("");
              }}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
            >
              Clear Form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={17} />
              {loading ? "Creating Job..." : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
