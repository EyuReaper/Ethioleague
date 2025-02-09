import HeroSection from "../components/HeroSection";
import MatchPreview from "../components/MatchPreview";
import NewsCard from "../components/NewsCard";
import VideoCard from "../components/VideoCard";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <HeroSection />
      <h2 className="text-2xl font-bold my-4">Latest Matches</h2>
      <MatchPreview />
      <h2 className="text-2xl font-bold my-4">Latest News</h2>
      <NewsCard />
      <h2 className="text-2xl font-bold my-4">Latest Videos</h2>
      <VideoCard />
    </div>
  );
};

export default Home;
