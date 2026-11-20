"use client";
import { useState } from "react";

interface VideoLessonProps {
  videoUrl: string;
  title: string;
}

export function VideoLesson({ videoUrl, title }: VideoLessonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract embed URL from YouTube or Vimeo
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("vimeo.com/")) {
      const id = url.split("vimeo.com/")[1];
      return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const thumbnailId = embedUrl.split("/embed/")[1]?.split("?")[0];

  return (
    <div
      style={{
        margin: "24px 0",
        borderRadius: 14,
        overflow: "hidden",
        border: "2px solid #3B4D7A",
        backgroundColor: "#151B30",
        aspectRatio: "16/9"
      }}
    >
      {!isPlaying ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundImage: thumbnailId
              ? `url(https://img.youtube.com/vi/${thumbnailId}/hqdefault.jpg)`
              : undefined,
            backgroundColor: "#151B30",
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setIsPlaying(true)}
        >
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundColor: "rgba(21,27,48,0.55)"
            }}
          />

          {/* Play button */}
          <div
            style={{
              position: "relative", zIndex: 1,
              width: 72, height: 72, borderRadius: "50%",
              backgroundColor: "#F59E0B",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "transform 0.2s, background-color 0.2s",
              boxShadow: "0 8px 24px rgba(245,158,11,0.4)"
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#d97706"; (e.currentTarget as HTMLDivElement).style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#F59E0B"; (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
          >
            {/* Triangle play icon */}
            <div
              style={{
                width: 0, height: 0,
                borderTop: "11px solid transparent",
                borderBottom: "11px solid transparent",
                borderLeft: "18px solid #151B30",
                marginLeft: 4
              }}
            />
          </div>

          {/* Title overlay */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "12px 20px",
              background: "linear-gradient(0deg, rgba(21,27,48,0.95) 0%, transparent 100%)"
            }}
          >
            <p style={{ color: "#F1F4F9", fontWeight: 700, fontSize: 15, margin: 0 }}>
              ▶ {title}
            </p>
          </div>
        </div>
      ) : (
        <iframe
          src={`${embedUrl}?autoplay=1`}
          title={title}
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
