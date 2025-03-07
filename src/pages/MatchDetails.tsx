import { useParams } from "react-router-dom";
import { useMatchDetails } from "../hooks/useMatchDetails";
import { motion } from "framer-motion";

const MatchDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useMatchDetails(id!);

  if (isLoading) return <p>Loading match details...</p>;
  if (error) return <p>Error fetching match details</p>;

  const { match, h2h, lineups } = data;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold text-center">Match Details</h1>

      {/* Match Info */}
      <motion.div 
        className="p-4 my-4 bg-gray-100 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold">
          {match.teams.home.name} vs {match.teams.away.name}
        </h2>
        <p>📍 {match.fixture.venue.name}</p>
        <p>🕒 {new Date(match.fixture.date).toLocaleString()}</p>
        <p>⚽ Score: {match.score.fulltime.home} - {match.score.fulltime.away}</p>
      </motion.div>

      {/* Head-to-Head History */}
      <h2 className="mt-6 text-2xl font-bold">Head-to-Head Results</h2>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        {h2h.map((game: any) => (
          <motion.div 
            key={game.fixture.id} 
            className="p-4 bg-blue-100 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>{game.teams.home.name} {game.score.fulltime.home} - {game.score.fulltime.away} {game.teams.away.name}</p>
            <p>📅 {new Date(game.fixture.date).toLocaleDateString()}</p>
          </motion.div>
        ))}
      </div>

      {/* Team Lineups */}
      <h2 className="mt-6 text-2xl font-bold">Lineups & Formations</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {lineups.map((team: any) => (
          <motion.div 
            key={team.team.id} 
            className="p-4 bg-green-100 rounded-lg shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold">{team.team.name}</h3>
            <p>Formation: {team.formation}</p>
            <ul className="mt-2">
              {team.startingXI.map((player: any) => (
                <li key={player.player.id}>⚽ {player.player.name} ({player.player.number})</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchDetails;
