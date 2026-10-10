import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Clock,
  ArrowRight,
  Building2,
  Sparkles,
  RefreshCw,
  X,
} from "lucide-react";
import { backendUrl } from "../App";

const UserHome = ({ setToken, token }) => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("All");

  const navigate = useNavigate();

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${backendUrl}/job/getAllJob`);

      // console.log("Jobs response:", data);

      if (data.success) {
        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
        setTotalJobs(data.totalJobs ?? data.jobs?.length ?? 0);
      } else {
        setJobs([]);
        setTotalJobs(0);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  // Search and filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const query = search.toLowerCase().trim();

      const jobTitle = (job.jobTitle || "").toLowerCase();
      const description = (job.jobDescription || "").toLowerCase();

      const skills = Array.isArray(job.bestToHave)
        ? job.bestToHave.join(" ").toLowerCase()
        : (job.bestToHave || "").toString().toLowerCase();

      const matchesSearch =
        !query ||
        jobTitle.includes(query) ||
        description.includes(query) ||
        skills.includes(query);

      const matchesLocation =
        !location.trim() ||
        (job.location || "")
          .toLowerCase()
          .includes(location.toLowerCase().trim());

      const matchesExperience =
        experience === "All" ||
        (job.experience || "").toLowerCase().includes(experience.toLowerCase());

      return matchesSearch && matchesLocation && matchesExperience;
    });
  }, [jobs, search, location, experience]);

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setExperience("All");
  };

  // Logout
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BriefcaseBusiness size={22} />
            </div>

            <span className="text-2xl font-extrabold tracking-tight">
              Hire<span className="text-blue-600">Hub</span>
            </span>
          </button>

          <div className="hidden items-center gap-7 md:flex">
            <NavLink
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Find Jobs
            </NavLink>

            <NavLink
              to="/about"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              About
            </NavLink>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {!token ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:px-4"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:px-5"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              Your next opportunity starts here
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find a job that
              <span className="block text-blue-600">moves you forward.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Discover opportunities, explore new careers, and find the right
              role for your skills.
            </p>

            {/* Search bar */}
            <div className="mt-9 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]">
                <div className="flex items-center gap-3 rounded-xl px-3 py-3 focus-within:bg-slate-50">
                  <Search size={20} className="shrink-0 text-blue-600" />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Job title or skill"
                    aria-label="Search by job title or skill"
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="flex items-center gap-3 rounded-xl border-t border-slate-100 px-3 py-3 focus-within:bg-slate-50 md:border-l md:border-t-0">
                  <MapPin size={20} className="shrink-0 text-blue-600" />

                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="City or location"
                    aria-label="Search by location"
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("jobs")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Search size={18} />
                  Search Jobs
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Explore roles in development, design, marketing, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Jobs section */}
      <section
        id="jobs"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">
              Opportunities
            </p>

            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Explore latest jobs
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Find a position that fits your career goals.
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {filteredJobs.length} of {totalJobs} jobs
          </span>
        </div>

        {/* Filters */}
        <div className="mb-7 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5">
            <BriefcaseBusiness size={18} className="text-slate-400" />

            <select
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              aria-label="Filter by experience"
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
            >
              <option value="All">All experience levels</option>
              <option value="Fresher">Fresher</option>
              <option value="0-1">0-1 years</option>
              <option value="1-2">1-2 years</option>
              <option value="2-3">2-3 years</option>
              <option value="3-5">3-5 years</option>
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <X size={16} />
            Clear filters
          </button>

          <button
            type="button"
            onClick={fetchJobs}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Loading, empty state and job cards */}
        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3">
            <RefreshCw size={26} className="animate-spin text-blue-600" />

            <span className="text-sm text-slate-500">
              Finding opportunities...
            </span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <Search size={42} className="mx-auto mb-4 text-slate-400" />

            <h3 className="text-xl font-bold">No matching jobs found</h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another job title, location, or experience level.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <article
                key={job._id}
                className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50 sm:p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Building2 size={23} />
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    Open position
                  </span>
                </div>

                <h3 className="break-words text-lg font-bold text-slate-900">
                  {job.jobTitle || "Untitled position"}
                </h3>

                <p className="mt-2 line-clamp-3 whitespace-pre-line break-words text-sm leading-6 text-slate-500">
                  {job.jobDescription || "No description available."}
                </p>

                <div className="my-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-600">
                    <MapPin size={14} />
                    {job.location || "Not specified"}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-600">
                    <Clock size={14} />
                    {job.experience || "Not specified"}
                  </span>
                </div>

                <div className="mb-5 flex items-center gap-2">
                  <IndianRupee size={19} className="text-emerald-600" />

                  <span className="font-bold text-slate-900">
                    {job.salary || "Not disclosed"}
                  </span>
                </div>

                {Array.isArray(job.bestToHave) && job.bestToHave.length > 0 && (
                  <div className="mb-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Skills
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.bestToHave.slice(0, 4).map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="max-w-full break-words rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}

                      {job.bestToHave.length > 4 && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                          +{job.bestToHave.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-auto border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    View Job & Apply
                    <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* About / CTA */}
      <section id="about" className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 sm:px-10 sm:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold text-blue-300">
                YOUR CAREER STARTS HERE
              </p>

              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Ready for your next opportunity?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                Explore available jobs and take the next step in your
                professional journey.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("jobs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-blue-50"
            >
              Browse Jobs
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <span className="text-lg font-extrabold">
            Hire<span className="text-blue-600">Hub</span>
          </span>

          <p className="text-sm text-slate-500">
            Connecting talent with opportunity.
          </p>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} HireHub
          </p>
        </div>
      </footer>
    </div>
  );
};
export default UserHome;
