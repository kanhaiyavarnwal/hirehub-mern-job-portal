// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import {
//   BriefcaseBusiness,
//   MapPin,
//   IndianRupee,
//   Clock,
//   RefreshCw,
// } from "lucide-react";
// import { backendUrl } from "../App";

// export default function GetAllJobs({ token }) {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const fetchJobs = async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.get(
//         `${backendUrl}/job/getAllJob`,
//         {
//           headers: { token:token } ,
//         }
//       );

//       if (data.success === false) {
//         toast.error(data.message || "Failed to fetch jobs");
//         return;
//       }
//       console.log(data.jobs)

//       // Supports APIs returning either an array or { jobs: [...] }
//       const jobList = Array.isArray(data)
//         ? data
//         : data.jobs  || [];

//       setJobs(jobList);
//     } catch (error) {
//       console.error("Fetch jobs error:", error.response?.data || error);
//       toast.error(
//         error.response?.data?.message || "Unable to load jobs"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleDeleteJob = async (jobId) => {
//   const confirmed = window.confirm(
//     "Are you sure you want to delete this job?"
//   );

//   if (!confirmed) return;

//   try {
//     const { data } = await axios.delete(
//       `${backendUrl}/job/deleteJob/${jobId}`,
//       {
//         headers: { token },
//       }
//     );

//     if (data.success) {
//       setJobs((prevJobs) =>
//         prevJobs.filter((job) => job._id !== jobId)
//       );

//       toast.success("Job deleted successfully");
//     }
//   } catch (error) {
//     toast.error(
//       error.response?.data?.message || "Failed to delete job"
//     );
//   }
// };

//   useEffect(() => {
//     fetchJobs();
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <RefreshCw className="animate-spin text-blue-600" size={32} />
//         <span className="ml-3 text-gray-600">Loading jobs...</span>
//       </div>
//     );
//   }
  

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               All Jobs
//             </h1>
//             <p className="mt-2 text-gray-500">
//               Manage and review job postings.
//             </p>
//           </div>

//           <button
//             onClick={fetchJobs}
//             className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
//           >
//             <RefreshCw size={18} />
//             Refresh
//           </button>
//         </div>

//         <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Total job postings</p>
//           <h2 className="mt-1 text-3xl font-bold text-blue-600">
//             {jobs.length}
//           </h2>
//         </div>

//         {jobs.length === 0 ? (
//           <div className="rounded-xl bg-white p-12 text-center shadow-sm">
//             <BriefcaseBusiness
//               size={48}
//               className="mx-auto mb-4 text-gray-400"
//             />
//             <h2 className="text-xl font-semibold text-gray-800">
//               No jobs found
//             </h2>
//             <p className="mt-2 text-gray-500">
//               Create a job posting to see it here.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {jobs.map((job) => (
//               <div
//                 key={job._id}
//                  onClick={() => navigate(`/admin/jobs/${job._id}`)}
//                 className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
//               >
//                 <div className="mb-4 flex items-start gap-3">
//                   <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
//                     <BriefcaseBusiness size={24} />
//                   </div>

//                   <div className="min-w-0">
//                     <h2 className="break-words text-xl font-bold text-gray-800">
//                       {job.jobTitle}
//                     </h2>
//                     <p className="mt-1 text-sm text-gray-500">
//                       Job ID: {job._id}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-600">
//                   <span className="flex items-center gap-1">
//                     <MapPin size={16} />
//                     {job.location}
//                   </span>

//                   <span className="flex items-center gap-1">
//                     <IndianRupee size={16} />
//                     {job.salary}
//                   </span>

//                   <span className="flex items-center gap-1">
//                     <Clock size={16} />
//                     {job.experience}
//                   </span>
//                 </div>

//                 <p className="mb-5 whitespace-pre-line break-words text-sm leading-6 text-gray-600">
//                   {job.jobDescription}
//                 </p>
              
//                <button
//                 onClick={() => handleDeleteJob(job._id)}
//                className="rounded-lg bg-red-600 px-4 py-2
//                 text-white hover:bg-red-700"
//               >
//                 Delete Job
//               </button>

//                 <div>
//                   <h3 className="mb-2 font-semibold text-gray-800">
//                     Preferred Skills
//                   </h3>

//                   <div className="flex flex-wrap gap-2">
//                     {(job.bestToHave || []).map((skill, index) => (
//                       <span
//                         key={`${skill}-${index}`}
//                         className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {job.createdAt && (
//                   <p className="mt-5 border-t pt-4 text-xs text-gray-400">
//                     Posted:{" "}
//                     {new Date(job.createdAt).toLocaleDateString()}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import {
//   BriefcaseBusiness,
//   MapPin,
//   IndianRupee,
//   Clock,
//   RefreshCw,
//   Trash2,
//   Copy,
//   CalendarDays,
// } from "lucide-react";
// import { backendUrl } from "../App";

// export default function GetAllJobs({ token }) {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const navigate = useNavigate();

//   const fetchJobs = async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.get(
//         `${backendUrl}/job/getAllJob`,
//         {
//           headers: { token },
//         }
//       );

//       if (data.success === false) {
//         toast.error(data.message || "Failed to fetch jobs");
//         return;
//       }

//       const jobList = Array.isArray(data)
//         ? data
//         : data.jobs || [];

//       setJobs(jobList);
//     } catch (error) {
//       console.error("Fetch jobs error:", error);
//       toast.error(
//         error.response?.data?.message || "Unable to load jobs"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteJob = async (jobId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this job? This action cannot be undone."
//     );

//     if (!confirmed) return;

//     try {
//       setDeletingId(jobId);

//       const { data } = await axios.delete(
//         `${backendUrl}/job/deleteJob/${jobId}`,
//         {
//           headers: { token },
//         }
//       );

//       if (data.success) {
//         setJobs((prevJobs) =>
//           prevJobs.filter((job) => job._id !== jobId)
//         );

//         toast.success("Job deleted successfully");
//       } else {
//         toast.error(data.message || "Failed to delete job");
//       }
//     } catch (error) {
//       console.error("Delete job error:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to delete job"
//       );
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const copyJobId = async (jobId) => {
//     try {
//       await navigator.clipboard.writeText(jobId);
//       toast.success("Job ID copied");
//     } catch {
//       toast.error("Unable to copy Job ID");
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center gap-3">
//         <RefreshCw className="animate-spin text-blue-600" size={28} />
//         <span className="text-sm font-medium text-gray-600">
//           Loading jobs...
//         </span>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
//               Admin Dashboard
//             </p>

//             <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
//               Manage Jobs
//             </h1>

//             <p className="mt-2 text-sm text-slate-500 sm:text-base">
//               Review, manage, and remove your job postings.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={fetchJobs}
//             className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
//           >
//             <RefreshCw size={17} />
//             Refresh Jobs
//           </button>
//         </div>

//         {/* Statistics */}
//         <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//             <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
//               <BriefcaseBusiness size={25} />
//             </div>

//             <div>
//               <p className="text-sm font-medium text-slate-500">
//                 Total Job Postings
//               </p>
//               <p className="mt-1 text-2xl font-bold text-slate-900">
//                 {jobs.length}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//             <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
//               <Clock size={25} />
//             </div>

//             <div>
//               <p className="text-sm font-medium text-slate-500">
//                 Dashboard Status
//               </p>
//               <p className="mt-1 text-lg font-bold text-slate-900">
//                 Up to date
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Empty State */}
//         {jobs.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
//             <BriefcaseBusiness
//               size={44}
//               className="mx-auto mb-4 text-slate-400"
//             />

//             <h2 className="text-xl font-bold text-slate-800">
//               No jobs found
//             </h2>

//             <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
//               There are no job postings available. Create a new
//               job posting to get started.
//             </p>
//           </div>
//         ) : (
//           <section className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
//             {jobs.map((job) => (
//               <article
//                 key={job._id}
//                 onClick={() => navigate(`/admin/jobs/${job._id}`)}
//                 onKeyDown={(event) => {
//                   if (event.key === "Enter") {
//                     navigate(`/admin/jobs/${job._id}`);
//                   }
//                 }}
//                 role="link"
//                 tabIndex={0}
//                 aria-label={`View applicants for ${job.jobTitle}`}
//                 className="flex min-w-0 cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-6"
//               >
//                 {/* Job heading */}
//                 <div className="mb-5 flex items-start gap-3">
//                   <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-600">
//                     <BriefcaseBusiness size={23} />
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <h2 className="break-words text-lg font-bold leading-6 text-slate-900">
//                       {job.jobTitle}
//                     </h2>

//                     <div className="mt-2 flex min-w-0 items-center gap-1.5">
//                       <span className="shrink-0 text-xs font-medium text-slate-400">
//                         ID:
//                       </span>

//                       <span
//                         title={job._id}
//                         className="min-w-0 truncate font-mono text-xs text-slate-500"
//                       >
//                         {job._id}
//                       </span>

//                       <button
//                         type="button"
//                         title="Copy Job ID"
//                         aria-label="Copy Job ID"
//                         onClick={(event) => {
//                           event.stopPropagation();
//                           copyJobId(job._id);
//                         }}
//                         className="shrink-0 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <Copy size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Job details */}
//                 <div className="mb-5 flex flex-wrap gap-2">
//                   <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-600">
//                     <MapPin size={14} className="shrink-0 text-slate-400" />
//                     {job.location}
//                   </span>

//                   <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-2 text-xs font-medium text-emerald-700">
//                     <IndianRupee size={14} className="shrink-0" />
//                     {job.salary}
//                   </span>

//                   <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-2 text-xs font-medium text-violet-700">
//                     <Clock size={14} className="shrink-0" />
//                     {job.experience}
//                   </span>
//                 </div>

//                 {/* Description */}
//                 <p className="mb-5 line-clamp-4 whitespace-pre-line break-words text-sm leading-6 text-slate-600">
//                   {job.jobDescription}
//                 </p>

//                 {/* Skills */}
//                 <div className="mb-6 flex-1">
//                   <h3 className="mb-3 text-sm font-semibold text-slate-800">
//                     Preferred Skills
//                   </h3>

//                   <div className="flex flex-wrap gap-2">
//                     {(job.bestToHave || []).length > 0 ? (
//                       job.bestToHave.map((skill, index) => (
//                         <span
//                           key={`${skill}-${index}`}
//                           className="max-w-full break-words rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
//                         >
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-xs text-slate-400">
//                         No preferred skills listed
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Posted date */}
//                 {job.createdAt && (
//                   <div className="mb-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
//                     <CalendarDays size={14} />
//                     <span>
//                       Posted:{" "}
//                       {new Date(job.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 )}

//                 {/* Actions */}
//                 <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row">
//                   <button
//                     type="button"
//                     onClick={(event) => {
//                       event.stopPropagation();
//                       navigate(`/admin/jobs/${job._id}`);
//                     }}
//                     className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                   >
//                     View Applicants
//                   </button>

//                   <button
//                     type="button"
//                     disabled={deletingId === job._id}
//                     onClick={(event) => {
//                       event.stopPropagation();
//                       handleDeleteJob(job._id);
//                     }}
//                     className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                   >
//                     {deletingId === job._id ? (
//                       <>
//                         <RefreshCw size={16} className="animate-spin" />
//                         Deleting...
//                       </>
//                     ) : (
//                       <>
//                         <Trash2 size={16} />
//                         Delete Job
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </article>
//             ))}
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  MapPin,
  IndianRupee,
  Clock,
  RefreshCw,
  Trash2,
  Copy,
  CalendarDays,
  X,
  AlertTriangle,
} from "lucide-react";
import { backendUrl } from "../App";

export default function GetAllJobs({ token }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate();

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/job/getAllJob`,
        {
          headers: { token },
        }
      );

      if (data.success === false) {
        toast.error(data.message || "Failed to fetch jobs");
        return;
      }

      const jobList = Array.isArray(data)
        ? data
        : data.jobs || [];

      setJobs(jobList);
    } catch (error) {
      console.error("Fetch jobs error:", error);

      toast.error(
        error.response?.data?.message || "Unable to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (event, job) => {
    event.stopPropagation();
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    if (deletingId) return;

    setShowDeleteModal(false);
    setSelectedJob(null);
  };

  // Delete job after confirmation
  const handleDeleteJob = async () => {
    if (!selectedJob || deletingId) return;

    const jobId = selectedJob._id;

    try {
      setDeletingId(jobId);

      const { data } = await axios.delete(
        `${backendUrl}/job/deleteJob/${jobId}`,
        {
          headers: { token },
        }
      );

      if (data.success) {
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job._id !== jobId)
        );

        toast.success("Job deleted successfully");

        setShowDeleteModal(false);
        setSelectedJob(null);
      } else {
        toast.error(data.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Delete job error:", error);

      toast.error(
        error.response?.data?.message || "Failed to delete job"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Copy job ID
  const copyJobId = async (event, jobId) => {
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(jobId);
      toast.success("Job ID copied");
    } catch {
      toast.error("Unable to copy Job ID");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3">
        <RefreshCw
          className="animate-spin text-blue-600"
          size={28}
        />
        <span className="text-sm font-medium text-gray-600">
          Loading jobs...
        </span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Admin Dashboard
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Manage Jobs
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Review, manage, and remove your job postings.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchJobs}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <RefreshCw size={17} />
            Refresh Jobs
          </button>
        </div>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <BriefcaseBusiness size={25} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Job Postings
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {jobs.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <Clock size={25} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Dashboard Status
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                Up to date
              </p>
            </div>
          </div>
        </section>

        {/* Empty State */}
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <BriefcaseBusiness
              size={44}
              className="mx-auto mb-4 text-slate-400"
            />

            <h2 className="text-xl font-bold text-slate-800">
              No jobs found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              There are no job postings available. Create a new
              job posting to get started.
            </p>
          </div>
        ) : (
          /* Job Cards */
          <section className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <article
                key={job._id}
                onClick={() =>
                  navigate(`/admin/jobs/${job._id}`)
                }
                onKeyDown={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    event.key === "Enter"
                  ) {
                    navigate(`/admin/jobs/${job._id}`);
                  }
                }}
                role="link"
                tabIndex={0}
                aria-label={`View applicants for ${job.jobTitle}`}
                className="flex min-w-0 cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-6"
              >
                {/* Job Heading */}
                <div className="mb-5 flex items-start gap-3">
                  <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-600">
                    <BriefcaseBusiness size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-lg font-bold leading-6 text-slate-900">
                      {job.jobTitle}
                    </h2>

                    <div className="mt-2 flex min-w-0 items-center gap-1.5">
                      <span className="shrink-0 text-xs font-medium text-slate-400">
                        ID:
                      </span>

                      <span
                        title={job._id}
                        className="min-w-0 truncate font-mono text-xs text-slate-500"
                      >
                        {job._id}
                      </span>

                      <button
                        type="button"
                        title="Copy Job ID"
                        aria-label="Copy Job ID"
                        onClick={(event) =>
                          copyJobId(event, job._id)
                        }
                        className="shrink-0 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-600">
                    <MapPin
                      size={14}
                      className="shrink-0 text-slate-400"
                    />
                    {job.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-2 text-xs font-medium text-emerald-700">
                    <IndianRupee
                      size={14}
                      className="shrink-0"
                    />
                    {job.salary}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-2 text-xs font-medium text-violet-700">
                    <Clock
                      size={14}
                      className="shrink-0"
                    />
                    {job.experience}
                  </span>
                </div>

                {/* Description */}
                <p className="mb-5 line-clamp-4 whitespace-pre-line break-words text-sm leading-6 text-slate-600">
                  {job.jobDescription}
                </p>

                {/* Preferred Skills */}
                <div className="mb-6 flex-1">
                  <h3 className="mb-3 text-sm font-semibold text-slate-800">
                    Preferred Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {(job.bestToHave || []).length > 0 ? (
                      job.bestToHave.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="max-w-full break-words rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">
                        No preferred skills listed
                      </span>
                    )}
                  </div>
                </div>

                {/* Posted Date */}
                {job.createdAt && (
                  <div className="mb-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
                    <CalendarDays size={14} />
                    <span>
                      Posted:{" "}
                      {new Date(
                        job.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/admin/jobs/${job._id}`);
                    }}
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    View Applicants
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === job._id}
                    onClick={(event) =>
                      openDeleteModal(event, job)
                    }
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <Trash2 size={16} />
                    Delete Job
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJob && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={closeDeleteModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={25} />
              </div>

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deletingId !== null}
                aria-label="Close modal"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="delete-modal-title"
              className="text-xl font-bold text-slate-900"
            >
              Delete this job?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-800">
                {selectedJob.jobTitle}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3">
              <p className="break-all font-mono text-xs text-red-700">
                Job ID: {selectedJob._id}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={closeDeleteModal}
                className="min-h-11 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deletingId !== null}
                onClick={handleDeleteJob}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === selectedJob._id ? (
                  <>
                    <RefreshCw
                      size={16}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
