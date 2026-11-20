export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Hero */}
      <section className="bg-[#151B30] py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold bg-[#FFFFFF]/10 border border-[#3B4D7A]/40 text-[#F1F4F9] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
            Our Story
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            About <span className="text-[#0EA5E9]">SkillBridge</span>
          </h1>
          <p className="text-xl text-[#F1F4F9] font-medium max-w-2xl mx-auto leading-relaxed">
            An AI-powered platform that bridges the gap between learning and employment — built for every learner, in every language, in every country.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-[#FFFFFF]">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-1 rounded-full bg-[#0EA5E9] mb-6" />
              <h2 className="text-3xl font-extrabold text-[#151B30] mb-4">Our Mission</h2>
              <p className="text-[#3B4D7A] font-medium leading-relaxed text-lg">
                Enable anyone — regardless of language, location, or economic background — to acquire marketable skills, prove competency, and access meaningful employment through an integrated ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌍", label: "50+ Languages", desc: "AI-translated lessons in your mother tongue" },
                { icon: "🏆", label: "Verified Certs", desc: "Tamper-proof certificates employers trust" },
                { icon: "💼", label: "Smart Matching", desc: "AI connects your skills to live jobs" },
                { icon: "🤖", label: "AI Coaching", desc: "Personal guidance for your career path" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-[#F1F4F9] border border-[#3B4D7A]/20 shadow-sm">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="font-extrabold text-sm text-[#151B30]">{item.label}</p>
                  <p className="text-xs text-[#3B4D7A] font-medium mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-[#F1F4F9] border-y border-[#3B4D7A]/20">
        <div className="container mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10,000+", label: "Active Learners" },
            { value: "500+", label: "Courses" },
            { value: "1,200+", label: "Certificates Issued" },
            { value: "300+", label: "Hired This Year" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-[#151B30]">{s.value}</div>
              <div className="text-sm text-[#3B4D7A] font-semibold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 px-4 bg-[#FFFFFF]">
        <div className="container mx-auto max-w-4xl">
          <div className="w-12 h-1 rounded-full bg-[#F59E0B] mb-6" />
          <h2 className="text-3xl font-extrabold text-[#151B30] mb-10">Our Founder</h2>
          <div className="flex flex-col sm:flex-row items-start gap-8 p-8 rounded-3xl bg-[#151B30] border border-[#3B4D7A]/40">
            <div className="w-20 h-20 rounded-2xl bg-[#0EA5E9] flex items-center justify-center text-[#151B30] text-3xl font-black shrink-0">
              KB
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1">Kenenisa Beyan</h3>
              <p className="text-[#0EA5E9] font-bold text-sm mb-4">Software Engineer · Product Builder · Technology Founder</p>
              <p className="text-[#F1F4F9] font-medium leading-relaxed">
                Kenenisa built SkillBridge to solve a problem he witnessed firsthand — talented people in Africa and emerging markets unable to access quality education, prove their skills, or connect with global employers. SkillBridge is his answer: a fully integrated, AI-powered learning-to-employment platform built for the next billion learners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#F1F4F9] text-center border-t border-[#3B4D7A]/20">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold text-[#151B30] mb-4">Ready to start your journey?</h2>
          <p className="text-[#3B4D7A] font-medium mb-8">Join thousands of learners bridging their skills to employment.</p>
          <a
            href="/register"
            className="inline-flex items-center px-8 py-3.5 rounded-xl font-extrabold text-base bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-md"
          >
            Get Started Free →
          </a>
        </div>
      </section>
    </div>
  );
}
