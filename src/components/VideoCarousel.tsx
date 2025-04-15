import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Define type for video highlight
interface VideoHighlight {
  title: string;
  date: string;
  embed: string; // ScoreBat provides embed code, but we’ll extract URL
  videoUrl: string; // Parsed video URL for <video> tag
}

// Fetch video highlights from ScoreBat API
const fetchVideos = async (): Promise<VideoHighlight[]> => {
  const apiKey = process.env.REACT_APP_SCOREBAT_API_KEY;
  if (!apiKey) {
    throw new Error("ScoreBat API key is missing. Please set REACT_APP_SCOREBAT_API_KEY in .env");
  }
  const url = `https://www.scorebat.com/video-api/v3/feed?token=${apiKey}`;
  
  const res = await axios.get(url);
  const videos = res.data.response || [];
  
  return videos
    .filter((video: any) => video.videos && video.videos.length > 0) // Ensure videos exist
    .slice(0, 10) // Limit to 10 recent highlights
    .map((video: any) => {
      const embed = video.videos[0]?.embed || "";
      // Extract video URL from embed code (simplified; assumes YouTube or direct MP4)
      const videoUrlMatch = embed.match(/src=["'](.*?)["']/);
      const videoUrl = videoUrlMatch ? videoUrlMatch[1] : "";
      return {
        title: video.title || "Untitled Highlight",
        date: video.date || new Date().toISOString(),
        embed: embed,
        videoUrl: videoUrl || "https://example.com/fallback_video.mp4", // Fallback
      };
    });
};

// VideoCarousel component
const VideoCarousel = () => {
  const { data: videos, isLoading, error } = useQuery<VideoHighlight[], Error>({
    queryKey: ["videos"],
    queryFn: fetchVideos,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div
          className="flex items-center justify-center w-full h-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: "url('/animation_bounce.gif')" }}
        >
          <h3 className="px-4 py-2 text-2xl font-bold text-white bg-black bg-opacity-50 rounded">
            Loading Highlights...
          </h3>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-40">
        <div
          className="flex items-center justify-center w-full h-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: "url('/error_gif.gif')" }}
        >
          <p className="px-4 py-2 text-xl font-semibold text-white bg-black bg-opacity-50 rounded">
            ❌ Error fetching highlights: {error.message || "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  // No videos state
  if (!videos || videos.length === 0) {
    return (
      <div className="p-4 text-center rounded-lg shadow-md bg-gray-50">
        <p className="text-xl font-semibold text-gray-500">
          🎥 No recent football highlights available.
        </p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      spaceBetween={10}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      effect="fade"
      className="rounded-lg shadow-lg"
    >
      {videos.map((video, index) => (
        <SwiperSlide key={`${video.videoUrl}-${index}`}>
          <div className="p-4 text-center text-gray-800 border-l-4 border-blue-500 rounded-lg bg-gray-50">
            <h3 className="mb-2 text-xl font-semibold">{video.title}</h3>
            <p className="mb-3 text-sm text-gray-600">
              {new Date(video.date).toLocaleDateString()}
            </p>
            <video controls className="object-contain w-full h-64 rounded-md">
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideoCarousel;