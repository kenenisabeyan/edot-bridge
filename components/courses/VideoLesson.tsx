"use client";
import { useState } from "react";

interface VideoLessonProps {
  videoUrl: string;   // YouTube or Vimeo URL
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
    return url;
  };

  return (
    <div className="my-6 aspect-video rounded-lg overflow-hidden border">
      {!isPlaying ? (
        <div 
          className="relative w-full h-full bg-cover bg-center cursor-pointer flex items-center justify-center"
          style={{ backgroundImage: `url(https://img.youtube.com/vi/${getEmbedUrl(videoUrl).split("/embed/")[1]}/0.jpg)` }}
          onClick={() => setIsPlaying(true)}
        >
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-black ml-1"></div>
            </div>
          </div>
          <p className="absolute bottom-4 left-4 text-white font-semibold drop-shadow">{title}</p>
        </div>
      ) : (
        <iframe
          src={`${getEmbedUrl(videoUrl)}?autoplay=1`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}