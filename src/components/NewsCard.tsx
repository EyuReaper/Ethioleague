import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";

// Define type for news article
interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}

// Fetch news from NewsAPI
const fetchNews = async (): Promise<NewsArticle[]> => {
  const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
  if (!apiKey) {
    throw new Error("NewsAPI key is missing. Please set REACT_APP_NEWSAPI_KEY in .env");
  }
  const url = `https://newsapi.org/v2/everything?q=Ethiopian+football&apiKey=${apiKey}&sortBy=publishedAt&language=en`;

  const res = await axios.get(url);
  return res.data.articles || [];
};

// NewsCard component
const NewsCard = () => {
  const { data: newsArticles, isLoading, error } = useQuery<NewsArticle[], Error>({
    queryKey: ["news"],
    queryFn: fetchNews,
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
          <h1 className="px-4 py-2 text-2xl font-bold text-white bg-black bg-opacity-50 rounded">
            Loading News...
          </h1>
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
            ❌ Error fetching news: {error.message || "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  // No news state
  if (!newsArticles || newsArticles.length === 0) {
    return (
      <div className="p-4 text-center bg-white rounded-lg shadow-md">
        <p className="text-xl font-semibold text-gray-500">
          📰 No recent Ethiopian football news available.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 mb-6 bg-white shadow-lg rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="flex items-center mb-4 text-2xl font-bold text-blue-700">
        <span className="mr-2">📰</span> Latest Ethiopian Football News
      </h3>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000 }}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {newsArticles.slice(0, 10).map((article, index) => (
          <SwiperSlide key={`${article.url}-${index}`}>
            <motion.div
              className="flex flex-col h-full p-4 transition-all border-l-4 border-blue-500 rounded-lg shadow-md bg-gray-50 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              custom={index}
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="object-cover w-full h-40 mb-3 rounded-md"
                  onError={(e) => (e.currentTarget.src = "/fallback_news.jpg")} // Fallback image
                />
              )}
              <h4 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {article.title}
              </h4>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {article.description || "No description available."}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()} • {article.source.name}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  aria-label={`Read more about ${article.title}`}
                >
                  Read More
                </a>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default NewsCard;