import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Users,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
  RefreshCw,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { backendUrl } from "../App";

export default function JobApplicants({ token }) {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/application/getJobApply/${id}`,
        {
          headers: { token },
        }
      );

      if (!data.success) {
        toast.error(data.message || "Failed to fetch applicants");
        return;
      }

      setJob(data.job);
      setApplicants(data.applications || []);
      setTotalApplications(data.totalApplications || 0);
    } catch (error) {
      console.error("API error:", error.response?.data || error);

      toast.error(
        error.response?.data?.message || "Unable to load applicants"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchApplicants();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3">
        <RefreshCw className="animate-spin text-blue-600" />
        Loading applicants...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-10 text-center text-gray-600">
       No Applicants for this job
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Job information */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <BriefcaseBusiness size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {job.jobTitle}
              </h1>
              <p className="break-all text-sm text-gray-500">
                Job ID: {job._id}
              </p>
            </div>
          </div>

          <p className="mb-5 leading-7 text-gray-600">
            {job.jobDescription}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <BriefcaseBusiness size={17} />
              {job.experience}
            </span>

            <span className="font-semibold text-green-700">
              Salary: {job.salary}
            </span>

            {job.location && (
              <span className="flex items-center gap-2">
                <MapPin size={17} />
                {job.location}
              </span>
            )}
          </div>
        </div>

        {/* Applicant count */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Users size={25} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Applications
              </p>
              <h2 className="text-2xl font-bold text-gray-800">
                {totalApplications}
              </h2>
            </div>
          </div>

          <button
            onClick={fetchApplicants}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {/* Applicants list */}
        {applicants.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <Users size={40} className="mx-auto mb-3 text-gray-400" />
            <h2 className="text-xl font-semibold">
              No applicants yet
            </h2>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {applicants.map((applicant) => (
              <div
                key={applicant.applicationId}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                    {applicant.firstName?.charAt(0)?.toUpperCase() || "A"}
                  </div>

                  <div className="min-w-0">
                    <h2 className="break-words text-lg font-bold text-gray-800">
                      {applicant.firstName} {applicant.lastName}
                    </h2>

                    <p className="break-all text-sm text-gray-500">
                      {applicant.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-4 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-blue-600" />
                    {applicant.higherEducation || "Education not provided"}
                  </p>

                  <p>
                    Graduation:{" "}
                    {applicant.higherEducationPercentage ?? "N/A"}
                    {applicant.higherEducationPercentage != null ? "%" : ""}
                  </p>

                  <p>
                    Class 12: {applicant.twelfthPercentage ?? "N/A"}
                    {applicant.twelfthPercentage != null ? "%" : ""}
                  </p>

                  <p>
                    Class 10: {applicant.tenthPercentage ?? "N/A"}
                    {applicant.tenthPercentage != null ? "%" : ""}
                  </p>

                  <p>
                    Experience: {applicant.experience || "Fresher"}
                  </p>

                  <p className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-blue-600" />
                    Applied:{" "}
                    {applicant.appliedAt
                      ? new Date(applicant.appliedAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                {applicant.resume && (
                  <a
                    href={applicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    <FileText size={18} />
                    View Resume
                  </a>
                )}

                <p className="mt-3 break-all text-xs text-gray-400">
                  Application ID: {applicant.applicationId}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}