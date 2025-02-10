import { useFixtures } from "../hooks/useFixtures";
import { motion } from "framer-motion";

const Fixtures = () => {
  const { data, isLoading, error } = useFixtures();

  if (isLoading) return <p>Loading fixtures...</p>;
  if (error) return <p>Error fetching fixtures</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Upcoming Fixtures</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.map((fixture: any) => (
          <motion.div
            key={fixture.fixture.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold">{fixture.teams.home.name} vs {fixture.teams.away.name}</h2>
            <p>Date: {new Date(fixture.fixture.date).toLocaleDateString()}</p>
            <p>Time: {new Date(fixture.fixture.date).toLocaleTimeString()}</p>
            <p>Venue: {fixture.fixture.venue.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures;
