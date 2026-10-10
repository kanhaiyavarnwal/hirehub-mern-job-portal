import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  BrainCircuit,
  Target,
  Rocket,
  Users,
  Globe2,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Innovation",
      description:
        "We use AI-driven technology to make job discovery smarter, faster, and more relevant for every candidate.",
    },
    {
      icon: Users,
      title: "People First",
      description:
        "Behind every resume is a person with ambitions. We build experiences that help candidates and employers connect.",
    },
    {
      icon: Target,
      title: "Equal Opportunities",
      description:
        "We aim to make career opportunities more accessible and help people discover roles that match their skills.",
    },
    {
      icon: Rocket,
      title: "Always Improving",
      description:
        "As a growing AI startup, we keep learning, experimenting, and improving how people find their next opportunity.",
    },
  ];

  const highlights = [
    "AI-focused approach to job discovery",
    "Simple and user-friendly job application experience",
    "Connections between talented candidates and employers",
    "A commitment to continuous innovation",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
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

            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Hire<span className="text-blue-600">Hub</span>
            </span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Jobs
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
              <Sparkles size={16} />
              The future of hiring starts here
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Connecting people with
              <span className="block text-blue-400">possibilities.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              HireHub is a growing, AI-focused startup reimagining how people
              discover jobs and how companies find talent. We combine
              technology, simplicity, and a people-first mindset to make career
              connections more meaningful.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Find Your Opportunity
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("our-mission")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-xl border border-slate-600 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Discover Our Mission
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    A smarter way to hire
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-white">
                    Your next chapter
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300">
                  <BrainCircuit size={26} />
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {[
                  {
                    title: "Discover opportunities",
                    subtitle: "Explore roles that fit your goals",
                    icon: Target,
                  },
                  {
                    title: "Showcase your talent",
                    subtitle: "Let your skills tell your story",
                    icon: Users,
                  },
                  {
                    title: "Move forward",
                    subtitle: "Take the next step in your career",
                    icon: TrendingUp,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {item.subtitle}
                        </p>
                      </div>

                      <CheckCircle2
                        className="ml-auto shrink-0 text-blue-400"
                        size={20}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-blue-600/15 p-4">
                <Sparkles className="shrink-0 text-blue-300" size={22} />
                <p className="text-sm leading-6 text-blue-100">
                  Better connections. Smarter possibilities. Brighter careers.
                </p>
              </div>
            </div>

            <div className="absolute -right-3 -top-4 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 shadow-xl sm:-right-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <BrainCircuit size={18} className="text-blue-400" />
                Built around innovation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Who We Are
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            A growing startup with a bigger vision.
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            HireHub is an emerging AI-focused hiring and career platform built
            around a simple idea: finding the right opportunity should be easier
            for everyone. We want to help job seekers explore opportunities and
            help employers discover talent through a more intuitive digital
            experience.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            With our main headquarters planned or based in the United States,
            depending on our current business setup, we aim to build a platform
            that can serve a diverse and global community. Our focus is on
            developing useful technology, improving the job search journey, and
            making every connection count.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Target size={24} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Our Mission
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Make job discovery more accessible and connect people with
              opportunities that align with their abilities and ambitions.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <Rocket size={24} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Our Vision
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Build a smarter, more inclusive hiring experience powered by
              thoughtful innovation and responsible AI.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:col-span-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <HeartHandshake size={24} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Our Promise
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Keep people at the center of technology. We strive to build a
              trustworthy, useful, and welcoming experience for both candidates
              and employers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Banner */}
      <section id="our-mission" className="bg-blue-600">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 md:py-20">
          <Sparkles className="mx-auto text-blue-100" size={34} />

          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
            Technology should open doors, not create barriers.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-blue-100">
            We are building HireHub with the belief that talent exists
            everywhere. Our goal is to use modern technology and responsible AI
            to help more people discover meaningful career opportunities.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            What Drives Us
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            The values behind HireHub
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            We believe great technology starts with understanding people and the
            challenges they face.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why HireHub */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Why HireHub?
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              More than a job board. A step toward your future.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              We are working toward a hiring experience that feels simpler, more
              relevant, and more human. From discovering a role to submitting an
              application, every step should help candidates move forward with
              confidence.
            </p>

            <div className="mt-7 space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-7 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300">
              <Globe2 size={30} />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-widest text-blue-300">
              Our Ambition
            </p>

            <h3 className="mt-3 text-3xl font-extrabold text-white">
              Built for a world of opportunity.
            </h3>

            <p className="mt-5 leading-8 text-slate-300">
              From our US headquarters to a global community of job seekers and
              employers, our ambition is to make discovering talent and
              opportunity a more connected experience.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="flex items-center gap-3 text-sm font-medium text-white">
                <Globe2 size={19} className="text-blue-400" />A global outlook
              </p>
              <p className="mt-4 flex items-center gap-3 text-sm font-medium text-white">
                <BrainCircuit size={19} className="text-blue-400" />
                An AI-first mindset
              </p>
              <p className="mt-4 flex items-center gap-3 text-sm font-medium text-white">
                <HeartHandshake size={19} className="text-blue-400" />
                People-centered experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Your next opportunity starts here.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Discover roles, explore new possibilities, and take the next step in
            your career journey with HireHub.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Explore Jobs
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} HireHub. All rights reserved.</p>

          <p>Connecting talent with opportunity.</p>
        </div>
      </footer>
    </div>
  );
};
export default About;
