import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import {
  User,
  Mail,
  LockKeyhole,
  ShieldCheck,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Send OTP to email
  const handleSendOTP = async () => {
    const email = formData.email.trim().toLowerCase();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setOtpLoading(true);
      console.log("url : ", backendUrl);
      const response = await axios.post(`${backendUrl}/user/send-otp`, {
        email,
      });

      if (response.data.success) {
        toast.success("OTP sent successfully!");
        //  console.log(response)
        setOtpSent(true);
        setFormData((prev) => ({
          ...prev,
          otp: "",
        }));
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Unable to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  // Create account
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.otp.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!otpSent) {
      toast.error("Please verify your email using OTP");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${backendUrl}/user/signup`, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        otp: formData.otp.trim(),
      });
      // console.log("sign up res:: ",response)
      if (response.data.success) {
        toast.success("Account created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          otp: "",
        });
        setOtpSent(false);
        navigate("/login");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to create your account",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-2">
          {/* Left section */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

            <Link to="/" className="relative flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-2.5">
                <BriefcaseBusiness size={26} />
              </div>
              <span className="text-2xl font-bold tracking-tight">HireHub</span>
            </Link>

            <div className="relative max-w-md">
              <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-indigo-100">
                YOUR CAREER STARTS HERE
              </span>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Discover opportunities.
                <span className="mt-2 block text-indigo-300">
                  Build your future.
                </span>
              </h1>

              <p className="mt-6 leading-7 text-indigo-100/80">
                Create your account and take the next step toward finding a job
                that matches your skills and ambitions.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Explore opportunities that fit your goals",
                  "Apply for jobs with ease",
                  "Manage your career journey in one place",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-indigo-50"
                  >
                    <ShieldCheck
                      size={19}
                      className="shrink-0 text-indigo-300"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="relative text-xs text-indigo-200/70">
              © {new Date().getFullYear()} HireHub. All rights reserved.
            </p>
          </div>

          {/* Signup form */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 text-xl font-bold text-indigo-700 lg:hidden"
              >
                <BriefcaseBusiness size={25} />
                HireHub
              </Link>

              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                  Get started today
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Join HireHub and start exploring new career opportunities.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Email and Send OTP */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                      <Mail
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => {
                          handleChange(e);
                          setOtpSent(false);
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                            otp: "",
                          }));
                        }}
                        className={inputClass}
                        required
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={otpLoading || !formData.email.trim()}
                      className="shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {otpLoading
                        ? "Sending..."
                        : otpSent
                          ? "Resend OTP"
                          : "Send OTP"}
                    </button>
                  </div>

                  {otpSent && (
                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      OTP sent. Please check your email.
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`${inputClass} pr-12`}
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* OTP */}
                <div>
                  <label
                    htmlFor="otp"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email verification OTP
                  </label>

                  <div className="relative">
                    <ShieldCheck
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="Enter your 6-digit OTP"
                      value={formData.otp}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,6}$/.test(value)) {
                          setFormData((prev) => ({
                            ...prev,
                            otp: value,
                          }));
                        }
                      }}
                      maxLength={6}
                      className={inputClass}
                      required
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Send an OTP to your email before creating your account.
                  </p>
                </div>

                {/* Create account */}
                <button
                  type="submit"
                  disabled={loading || !otpSent}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Create account"}
                  {!loading && (
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">
                  ALREADY A MEMBER?
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-800"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-indigo-600">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline hover:text-indigo-600">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
