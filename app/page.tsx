import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tight">
          Learn. <span className="text-primary">Certify.</span> Get Hired.
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          SkillBridge bridges the gap between knowledge and employment.
          Translate courses into your language, prove your skills, and connect with employers – all in one platform.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/courses">Start Learning →</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/jobs">Find Jobs</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 rounded-lg border">
          <h3 className="text-xl font-semibold">🌍 AI Translation</h3>
          <p className="mt-2 text-muted-foreground">Learn in Afaan Oromo, Amharic, Somali, Swahili, and more.</p>
        </div>
        <div className="text-center p-6 rounded-lg border">
          <h3 className="text-xl font-semibold">📜 Verified Certificates</h3>
          <p className="mt-2 text-muted-foreground">Earn blockchain‑verifiable credentials that employers trust.</p>
        </div>
        <div className="text-center p-6 rounded-lg border">
          <h3 className="text-xl font-semibold">💼 Job Matching</h3>
          <p className="mt-2 text-muted-foreground">Get matched with employers based on your verified skills.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 text-center bg-primary/5 py-16 rounded-2xl">
        <h2 className="text-3xl font-bold">Ready to bridge your skills to employment?</h2>
        <Button asChild size="lg" className="mt-6">
          <Link href="/register">Join SkillBridge – Free</Link>
        </Button>
      </section>
    </div>
  );
}