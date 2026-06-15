import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Learn.<span className="text-primary"> Certify.</span> Get Hired.
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            SkillBridge bridges the gap between knowledge and employment.
            AI-powered translation, verified certificates, portfolio builder, and job matching – all in one platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/courses">Start Learning →</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/assessments">Test Your Skills</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Learners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">1,200+</div>
            <div className="text-sm text-muted-foreground">Certificates Issued</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">300+</div>
            <div className="text-sm text-muted-foreground">Hired Graduates</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How SkillBridge Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: "1", title: "Learn", desc: "Access courses in your language with AI translation." },
              { step: "2", title: "Practice", desc: "Build real projects and take quizzes." },
              { step: "3", title: "Assess", desc: "Pass skill assessments to prove your knowledge." },
              { step: "4", title: "Certify", desc: "Earn verifiable digital certificates." },
              { step: "5", title: "Get Hired", desc: "Match with employers and start your career." }
            ].map((item) => (
              <Card key={item.step} className="text-center p-4">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">{item.step}</div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* You can reuse CourseCard component here with mockCourses.slice(0,3) */}
            <div className="border rounded-lg p-4 text-center">
              <h3 className="font-semibold">Frontend Development</h3>
              <p className="text-sm">React, Tailwind, TypeScript</p>
              <Button asChild variant="link" className="mt-2"><Link href="/courses/1">View →</Link></Button>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <h3 className="font-semibold">Python for Data Science</h3>
              <p className="text-sm">Pandas, NumPy, Matplotlib</p>
              <Button asChild variant="link" className="mt-2"><Link href="/courses/2">View →</Link></Button>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <h3 className="font-semibold">JavaScript Mastery</h3>
              <p className="text-sm">ES6, Async, APIs</p>
              <Button asChild variant="link" className="mt-2"><Link href="/courses/3">View →</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <p className="italic">"SkillBridge helped me learn React in Afaan Oromo. I got a job within 3 months!"</p>
                <p className="font-semibold mt-2">— Almaz, Addis Ababa</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="italic">"The certificate and portfolio builder made me stand out to employers."</p>
                <p className="font-semibold mt-2">— Tewodros, Remote</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to bridge your skills to employment?</h2>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link href="/register">Join SkillBridge – Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}