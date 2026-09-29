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
    <>
      <style>{`
        .footer-link { color: hsl(220 14% 55%); transition: color 0.15s; }
        .footer-link:hover { color: white; }
        .footer-social { background: hsl(224 22% 14%); color: hsl(220 14% 60%); transition: color 0.15s, background 0.15s; }
        .footer-social:hover { background: hsl(250 100% 65% / .2); color: white; }
        .footer-legal-link { color: hsl(220 14% 45%); transition: color 0.15s; }
        .footer-legal-link:hover { color: hsl(220 14% 70%); }
      `}</style>
      <footer
        style={{
          background: "hsl(224 25% 7%)",
          color: "hsl(220 20% 80%)",
          borderTop: "1px solid hsl(224 18% 14%)",
        }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2 font-extrabold text-xl text-white">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
                  style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(174 100% 45%))" }}
                >
                  S
                </span>
                SkillBridge
              </Link>
              <p className="mt-3 text-sm leading-relaxed footer-link">
                Bridging the gap between knowledge and employment for learners across Africa and beyond.
              </p>
              <div className="flex gap-3 mt-5">
                {["𝕏", "in", "gh"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold footer-social"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-sm font-semibold text-white mb-4">{section}</h3>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="footer-link text-sm">
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
            className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-8"
            style={{ borderTop: "1px solid hsl(224 18% 14%)" }}
          >
            <p className="text-sm footer-link">
              © {new Date().getFullYear()} SkillBridge. All rights reserved.
            </p>
            <div className="flex gap-5">
              {["Terms", "Privacy", "Cookies"].map((t) => (
                <a key={t} href="#" className="footer-legal-link text-xs">
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}