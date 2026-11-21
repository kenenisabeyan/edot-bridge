export default function ContactPage() {
  return (
    <div className="bg-[#151B30] min-h-screen text-[#F1F4F9]">
      {/* Header */}
      <section className="bg-[#192038] py-20 px-4 text-center border-b border-[#3B4D7A]/40">
        <div className="container mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold bg-[#151B30] border border-[#3B4D7A] text-[#0EA5E9] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
            Direct Support & Partnerships
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Get in Touch</h1>
          <p className="text-[#F1F4F9]/80 font-medium text-lg">We'd love to hear from you. Reach out for enterprise partnerships, university cohorts, or learner support.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#151B30]">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: "📧", label: "Email", value: "hello@skillbridge.com", href: "mailto:hello@skillbridge.com" },
              { icon: "🌍", label: "Headquarters", value: "Addis Ababa, Ethiopia", href: null },
              { icon: "🐦", label: "Twitter / X", value: "@SkillBridgeHQ", href: "https://x.com" },
              { icon: "💼", label: "LinkedIn", value: "SkillBridge Platform", href: "https://linkedin.com" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl bg-[#192038] border border-[#3B4D7A] shadow-md">
                <div className="w-11 h-11 rounded-xl bg-[#151B30] border border-[#3B4D7A] flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-black text-[#0EA5E9] uppercase tracking-widest mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-bold text-white hover:text-[#0EA5E9] transition-colors">{item.value}</a>
                  ) : (
                    <p className="font-bold text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="rounded-2xl bg-[#192038] border border-[#3B4D7A] shadow-lg p-7">
            <h2 className="text-xl font-extrabold text-white mb-5">Send a Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#F1F4F9] mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="Kenenisa Bekele"
                  className="w-full px-4 py-3 rounded-xl border border-[#3B4D7A] bg-[#151B30] text-[#F1F4F9] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all placeholder:text-[#3B4D7A]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#F1F4F9] mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#3B4D7A] bg-[#151B30] text-[#F1F4F9] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all placeholder:text-[#3B4D7A]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#F1F4F9] mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 rounded-xl border border-[#3B4D7A] bg-[#151B30] text-[#F1F4F9] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all placeholder:text-[#3B4D7A] resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full py-3 rounded-xl font-extrabold text-sm bg-[#F59E0B] text-[#151B30] hover:opacity-95 transition-opacity shadow-md border-none cursor-pointer"
              >
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
