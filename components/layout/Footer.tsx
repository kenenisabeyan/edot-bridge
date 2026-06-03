import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-8 bg-muted/20">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SkillBridge. Bridging learning to earning.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}