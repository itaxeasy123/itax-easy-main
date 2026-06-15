
'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Internship() {
  const router = useRouter();

  // =========================
  // ONLY CURRENT YEAR (AUTO)
  // =========================
  const currentYear = new Date().getFullYear();

  const roles = [
    { title: 'Full Stack Developer', skills: 'Next.js • Node • Prisma' },
    { title: 'Backend Developer', skills: 'Node.js • APIs • PostgreSQL' },
    { title: 'Frontend Developer', skills: 'React • Tailwind • UI' },
    { title: 'Server Developer', skills: 'Nginx • PM2 • Deployment' },
    { title: 'Flutter Developer', skills: 'Flutter • Bloc • Firebase' },
    { title: 'UI/UX Developer', skills: 'Figma • Design Systems' },
    { title: 'Social Media Handler', skills: 'Content • Branding • Ads' },
    { title: 'DevOps Engineer', skills: 'Docker • CI/CD • Hosting' },
  ];

  return (
    <div className="w-full overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-blue-300 via-indigo-300 to-blue-400 text-white py-20 px-4">

        {/* Background Glow */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_white,_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm mb-6">
              🚀 Internship {currentYear} – iTaxEasy
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Build Your Career with <br />
              <span className="text-yellow-300">Real Industry Exposure</span>
            </h1>

            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Join iTaxEasy Internship Program and gain practical experience in
              taxation, GST, compliance, and modern software systems used by
              real businesses across India.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'Live Industry Projects',
                'Professional Certification',
                'Mentorship by Experts',
                'Career Growth Path',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-300" size={20} />
                  <span className="text-blue-100">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push('/internship/apply')}
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              Apply Now <ArrowRight size={18} />
            </button>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-semibold mb-6">
                Who Can Apply?
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  'B.Com / M.Com',
                  'BBA / BCA',
                  'BA / B.Sc',
                  'B.Tech / M.Tech',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/20 p-4 rounded-xl text-center font-medium hover:bg-white/30 transition"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-30"></div>
          </div>

        </div>
      </section>

      {/* ================= ROLES SECTION ================= */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Internship Roles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your specialization and work on real production-level systems
              powering fintech & compliance infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {roles.map((role, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                  {role.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {role.skills}
                </p>

                <button
                  onClick={() => router.push('/internship/apply')}
                  className="text-blue-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}