// Imports: Grouped by type (external libs, custom hooks, styles)
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define type for fixture data
interface Fixture {
  fixture: { id: number; date: string; venue: { name: string } };
  teams: { home: { name: string }; away: { name: string } };
  goals: { home: number | null; away: number | null };
  highlight?: string; // Optional, added for video support
}

// Fetch fixtures from TheSportsDB API
const fetchFixtures = async (): Promise<Fixture[]> => {
  const apiKey = "3"; // Free tier API key; replace with Patreon key for v2
  const leagueId = "4959"; // Ethiopian Premier League
  const season = "2024-2025"; // Adjust as needed
  const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsseason.php?id=${leagueId}&s=${season}`;

  const res = await axios.get(url);
  const events = res.data.events || [];

  // Map API response to Fixture interface
  return events.map((event: any) => ({
    fixture: {
      id: parseInt(event.idEvent),
      date: event.dateEvent ? `${event.dateEvent}T${event.strTime || "00:00:00"}` : new Date().toISOString(),
      venue: { name: event.strVenue || "TBD" },
    },
    teams: {
      home: { name: event.strHomeTeam || "Unknown" },
      away: { name: event.strAwayTeam || "Unknown" },
    },
    goals: {
      home: event.intHomeScore !== null ? parseInt(event.intHomeScore) : null,
      away: event.intAwayScore !== null ? parseInt(event.intAwayScore) : null,
    },
    highlight: event.strVideo || undefined, // Use video URL if available
  }));
};

// Custom hook for live fixtures (replacing useLiveFixtures)
const useLiveFixtures = () => {
  const { data, isLoading, error } = useQuery<Fixture[], Error>({
    queryKey: ["fixtures"],
    queryFn: fetchFixtures,
    refetchInterval: 60000, // Refetch every 60 seconds for live updates
  });

  return {
    liveFixtures: data || [],
    isLoading,
    error,
  };
};

// Placeholder for useLiveScores (unchanged for now)
const useLiveScores = () => {
  // TheSportsDB v1 doesn't provide reliable live scores; extend with v2 or another API if needed
  return { liveScores: [] };
};

// Component definition
const Fixtures = () => {
  const { liveFixtures, isLoading, error } = useLiveFixtures();
  const { liveScores } = useLiveScores();

  // Loading state
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-40 bg-center bg-no-repeat] bg-cover"
        style={{ backgroundImage: "url('/Animation_bounce.gif')" }}
      >
        <h1 className="text-2xl font-bold text-white">Loading Fixtures...</h1>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="flex items-center justify-center h-40 bg-center bg-cover"
        style={{ backgroundImage: "url('/error.gif')" }}
      >
        <p className="text-xl font-semibold text-white">
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
        Ethiopian Premier League Fixtures ⚽
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
              No live matches currently available.
            </p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

// Export
export default Fixtures;