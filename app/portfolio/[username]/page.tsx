import { notFound } from "next/navigation";
import { mockUsers } from "@/lib/mock-data/users";
import { mockCertificates } from "@/lib/mock-data/certificates";

export default async function PortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = mockUsers.find(u => u.name?.toLowerCase().replace(/\s/g, "") === username);
  if (!user) return notFound();

  const userCerts = mockCertificates.filter(c => c.userId === user.id);

  const initials = user.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div style={{ backgroundColor: "#151B30", minHeight: "100vh", padding: "0 0 64px 0", color: "#F1F4F9" }}>
      {/* Hero Header */}
      <div style={{ backgroundColor: "#192038", padding: "56px 24px 48px", borderBottom: "1px solid #3B4D7A" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          {/* Avatar */}
          <div
            style={{
              width: 96, height: 96, borderRadius: "50%",
              backgroundColor: "#0EA5E9", color: "#151B30",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36, fontWeight: 800, margin: "0 auto 20px",
              boxShadow: "0 0 24px rgba(14, 165, 233, 0.3)"
            }}
          >
            {initials}
          </div>
          <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, margin: "0 0 10px" }}>
            {user.name}
          </h1>
          <p style={{ color: "#F1F4F9", fontSize: 16, margin: "0 0 8px", opacity: 0.9 }}>
            {user.bio || "No bio yet"}
          </p>
          {user.location && (
            <p style={{ color: "#0EA5E9", fontSize: 14, fontWeight: 600 }}>
              📍 {user.location}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px 0" }}>

        {/* Skills Section */}
        <div
          style={{
            backgroundColor: "#192038", borderRadius: 16,
            padding: "28px 28px", marginBottom: 24,
            border: "1px solid #3B4D7A"
          }}
        >
          <h2 style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <span>🛠</span> Verified Skills
          </h2>
          {user.skills && user.skills.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {user.skills.map((skill: string) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: "#151B30", border: "1.5px solid #3B4D7A",
                    color: "#0EA5E9", borderRadius: 999,
                    padding: "6px 16px", fontSize: 13, fontWeight: 600
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: "#F1F4F9", opacity: 0.7, fontSize: 14 }}>No skills listed yet.</p>
          )}
        </div>

        {/* Certificates Section */}
        <div
          style={{
            backgroundColor: "#192038", borderRadius: 16,
            padding: "28px 28px", marginBottom: 24,
            border: "1px solid #3B4D7A"
          }}
        >
          <h2 style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <span>🏆</span> Earned Certificates
          </h2>
          {userCerts.length === 0 ? (
            <p style={{ color: "#F1F4F9", opacity: 0.7, fontSize: 14 }}>No certificates earned yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {userCerts.map(cert => (
                <div
                  key={cert.id}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    backgroundColor: "#151B30", borderRadius: 12,
                    padding: "16px 20px", border: "1px solid #3B4D7A"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: "50%",
                        border: "2px solid #F59E0B", backgroundColor: "rgba(245, 158, 11, 0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 20
                      }}
                    >
                      🎓
                    </div>
                    <div>
                      <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 15, display: "block" }}>
                        {cert.skillName}
                      </span>
                      <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 600 }}>
                        Credential ID: SB-{cert.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        color: "#F59E0B", fontWeight: 800, fontSize: 20
                      }}
                    >
                      {cert.score}%
                    </span>
                    <p style={{ color: "#F1F4F9", opacity: 0.7, fontSize: 11, margin: "2px 0 0" }}>Score</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer badge */}
        <div style={{ textAlign: "center", paddingTop: 8 }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#192038", color: "#F1F4F9",
              borderRadius: 999, padding: "10px 24px", fontSize: 13, fontWeight: 700,
              border: "1px solid #3B4D7A", boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
            }}
          >
            🛡️ Verified on SkillBridge Global Registry
          </span>
        </div>
      </div>
    </div>
  );
}
