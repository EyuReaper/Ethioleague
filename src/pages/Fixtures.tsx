// Imports: Grouped by type (external libs, custom hooks, styles)
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useLiveFixtures } from "../hooks/useLiveFixtures";
import { useLiveScores } from "../hooks/useLiveScores";

// Define type for fixture data
interface Fixture {
  fixture: { id: number; date: string; venue: { name: string } };
  teams: { home: { name: string }; away: { name: string } };
  goals: { home: number | null; away: number | null };
  highlight?: string; // Optional, added for video support
}

// Component definition
const Fixtures = () => {
  const { liveFixtures, isLoading, error } = useLiveFixtures();
  const { liveScores } = useLiveScores();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <motion.div
          className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="text-xl font-semibold text-red-500">
          ❌ Error fetching fixtures: {error.message || "Unknown error"}
        </p>
      </div>
    );
  }

  // No fixtures state
  if (liveFixtures.length === 0) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="text-xl font-semibold text-gray-500">
          ⚽ No upcoming fixtures available.
        </p>
      </div>
    );
  }

  // Main render with Swiper
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold text-center text-blue-700">
        Upcoming Fixtures (Live Updates) ⚽
      </h1>
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
        {/* Upcoming Fixtures */}
        {liveFixtures.map((fixture: Fixture) => (
          <SwiperSlide key={fixture.fixture.id}>
            <motion.div
              className="p-4 transition-all bg-gray-100 border-l-4 border-blue-500 rounded-lg shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold">
                {fixture.teams.home.name} 🆚 {fixture.teams.away.name}
              </h2>
              <p className="text-gray-600">
                📍 {fixture.fixture.venue.name || "TBD"}
              </p>
              <p className="text-gray-600">
                🕒 {new Date(fixture.fixture.date).toLocaleString()}
              </p>
              {/* Video highlights if available */}
              {fixture.highlight && (
                <motion.video
                  controls
                  className="w-full mt-3 rounded-lg shadow-md"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <source src={fixture.highlight} type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              )}
            </motion.div>
          </SwiperSlide>
        ))}

        {/* Live Scores */}
        {liveScores.length > 0 ? (
          liveScores.map((fixture: Fixture) => (
            <SwiperSlide key={fixture.fixture.id}>
              <motion.div
                className="p-4 transition-all bg-gray-100 border-l-4 border-blue-500 rounded-lg shadow-md hover:shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold">
                  {fixture.teams.home.name} 🆚 {fixture.teams.away.name}
                </h2>
                <p className="text-gray-600">
                  📍 {fixture.fixture.venue.name || "TBD"}
                </p>
                <p className="text-gray-600">
                  🕒 {new Date(fixture.fixture.date).toLocaleString()}
                </p>
                <p className="mt-2 text-xl font-bold text-green-600">
                  🟢 {fixture.goals.home ?? 0} - {fixture.goals.away ?? 0}
                </p>
              </motion.div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-lg text-center text-gray-500">
              No live matches currently availble.
            </p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

// Export
export default Fixtures;