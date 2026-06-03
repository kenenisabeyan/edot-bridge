import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold">Bridge Skills to Employment</h1>
      <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
        Learn in your language, prove your skills, and land your dream job.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/courses">Start Learning</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/jobs">Find Jobs</Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/assessments">Test Your Skills</Link>
        </Button>
      </div>
    </main>
  );
}