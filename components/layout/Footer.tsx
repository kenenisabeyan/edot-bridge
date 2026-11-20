import Link from "next/link";

const footerLinks = {
  Platform: [
    { label: "Courses", href: "/courses" },
    { label: "Assessments", href: "/assessments" },
    { label: "Certificates", href: "/my-certificates" },
    { label: "Learning Paths", href: "/learning-paths" },
  ],
  Careers: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "For Employers", href: "/employer" },
    { label: "AI Job Match", href: "/jobs" },
    { label: "Resume Builder", href: "/resume-builder" },
  ],
  Community: [
    { label: "Forum", href: "/forum" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Blog", href: "/blog" },
    { label: "Career Coach", href: "/career-coach" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: "#0D1016",
        color: "#8C95A6",
        borderTop: "1px solid #1C202C",
      }}
    >
      <div className="container mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Socials */}
          <div className="sm:col-span-2 lg:col-span-2 max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl text-white tracking-tight">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-base font-bold shadow-sm shrink-0"
                style={{ background: "linear-gradient(135deg, #566AF6 0%, #3896E8 100%)" }}
              >
                s
              </span>
              SkillBridge
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#8C95A6]">
              Bridging the gap between knowledge and employment for learners across Africa and beyond.
            </p>
            <div className="flex items-center gap-2.5 mt-5">
              {[
                { name: "x", label: "x" },
                { name: "in", label: "in" },
                { name: "gh", label: "gh" },
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold text-[#8C95A6] bg-[#1C202C] hover:text-white hover:bg-[#252C3D] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">{section}</h3>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#8C95A6] hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8"
          style={{ borderTop: "1px solid #1C202C" }}
        >
          <p className="text-xs sm:text-sm text-[#626B7F]">
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Terms", "Privacy", "Cookies"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs sm:text-sm text-[#7E8799] hover:text-white transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
