import { notFound } from "next/navigation";
import { mockUsers } from "@/lib/mock-data/users";
import { mockCertificates } from "@/lib/mock-data/certificates";

export default async function PortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = mockUsers.find(u => u.name?.toLowerCase().replace(/\s/g, "") === username);
  if (!user) return notFound();

  const userCerts = mockCertificates.filter(c => c.userId === user.id);

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">{user.bio || "No bio yet"}</p>
        <p className="text-sm">{user.location}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {user.skills?.map(skill => (
            <span key={skill} className="bg-primary/10 px-3 py-1 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Certificates</h2>
        {userCerts.length === 0 ? (
          <p className="text-muted-foreground">No certificates yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {userCerts.map(cert => (
              <li key={cert.id} className="border-l-4 border-primary pl-4">
                {cert.skillName} – Score {cert.score}%
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}