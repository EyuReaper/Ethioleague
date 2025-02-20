import { useLiveFixtures } from "../hooks/useLiveFixtures";
import { motion } from "framer-motion";

const Fixtures = () => {
  const { liveFixtures, isLoading, error } = useLiveFixtures();

  if (isLoading) return <p>Loading fixtures...</p>;
  if (error) return <p>Error fetching fixtures</p>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold">Upcoming Fixtures (Live Updates) ⚽</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {liveFixtures.map((fixture: any) => (
          <motion.div
            key={fixture.fixture.id}
            className="p-4 bg-gray-100 border-l-4 border-blue-500 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold">
              {fixture.teams.home.name} vs {fixture.teams.away.name}
            </h2>
            <p>📍 {fixture.fixture.venue.name}</p>
            <p>🕒 {new Date(fixture.fixture.date).toLocaleString()}</p>
            {fixture.highlight && (
              <video controls className="mt-3 rounded-lg shadow">
                <source src={fixture.highlight} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures;
