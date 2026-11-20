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
    <div style={{ backgroundColor: "#F1F4F9", minHeight: "100vh", padding: "0 0 64px 0" }}>
      {/* Hero Header */}
      <div style={{ backgroundColor: "#151B30", padding: "56px 24px 48px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          {/* Avatar */}
          <div
            style={{
              width: 96, height: 96, borderRadius: "50%",
              backgroundColor: "#0EA5E9", color: "#151B30",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36, fontWeight: 800, margin: "0 auto 20px"
            }}
          >
            {initials}
          </div>
          <h1 style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, margin: "0 0 10px" }}>
            {user.name}
          </h1>
          <p style={{ color: "#F1F4F9", fontSize: 16, margin: "0 0 8px", opacity: 0.85 }}>
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
            backgroundColor: "#FFFFFF", borderRadius: 16,
            padding: "28px 28px", marginBottom: 24,
            border: "1px solid #3B4D7A"
          }}
        >
          <h2 style={{ color: "#151B30", fontSize: 20, fontWeight: 700, margin: "0 0 16px" }}>
            🛠 Skills
          </h2>
          {user.skills && user.skills.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {user.skills.map((skill: string) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: "#FFFFFF", border: "1.5px solid #3B4D7A",
                    color: "#151B30", borderRadius: 999,
                    padding: "6px 16px", fontSize: 13, fontWeight: 600
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: "#3B4D7A", fontSize: 14 }}>No skills listed yet.</p>
          )}
        </div>

        {/* Certificates Section */}
        <div
          style={{
            backgroundColor: "#FFFFFF", borderRadius: 16,
            padding: "28px 28px", marginBottom: 24,
            border: "1px solid #3B4D7A"
          }}
        >
          <h2 style={{ color: "#151B30", fontSize: 20, fontWeight: 700, margin: "0 0 16px" }}>
            🏆 Certificates
          </h2>
          {userCerts.length === 0 ? (
            <p style={{ color: "#3B4D7A", fontSize: 14 }}>No certificates earned yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {userCerts.map(cert => (
                <div
                  key={cert.id}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    backgroundColor: "#F1F4F9", borderRadius: 10,
                    padding: "14px 18px", border: "1px solid #3B4D7A"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 40, height: 40, borderRadius: "50%",
                        border: "2px solid #F59E0B",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18
                      }}
                    >
                      🎓
                    </div>
                    <span style={{ color: "#151B30", fontWeight: 700, fontSize: 15 }}>
                      {cert.skillName}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        color: "#0EA5E9", fontWeight: 800, fontSize: 18
                      }}
                    >
                      {cert.score}%
                    </span>
                    <p style={{ color: "#3B4D7A", fontSize: 11, margin: "2px 0 0" }}>Score</p>
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
              backgroundColor: "#151B30", color: "#F1F4F9",
              borderRadius: 999, padding: "8px 20px", fontSize: 13, fontWeight: 600
            }}
          >
            Verified on SkillBridge
          </span>
        </div>
      </div>
    </div>
  );
}
