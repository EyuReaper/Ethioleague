import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define type for team data
interface Team {
  id: string;
  name: string;
  logo: string;
}

// Fetch teams from TheSportsDB
const fetchTeams = async (): Promise<Team[]> => {
  const apiKey = "3"; // Free tier API key
  const leagueId = "4959"; // Ethiopian Premier League

  const res = await axios.get(
    `https://www.thesportsdb.com/api/v1/json/${apiKey}/lookup_all_teams.php?id=${leagueId}`
  );
  const teams = res.data.teams || [];

  // Map to simplified team object
  return teams.map((team: any) => ({
    id: team.idTeam,
    name: team.strTeam || "Unknown Team",
    logo: team.strTeamBadge || "/default_team_logo.png",
  }));
};

const Teams = () => {
  const { data: teams, isLoading, error } = useQuery<Team[], Error>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Teams</h1>
        <div className="flex items-center justify-center h-40">
          <div
            className="flex items-center justify-center w-full h-full bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('/animation_bounce.gif')" }}
          >
            <h3 className="px-4 py-2 text-2xl font-bold text-white bg-black bg-opacity-50 rounded">
              Loading Teams...
            </h3>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Teams</h1>
        <div className="flex items-center justify-center h-40">
          <div
            className="flex items-center justify-center w-full h-full bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('/error_gif.gif')" }}
          >
            <p className="px-4 py-2 text-xl font-semibold text-white bg-black bg-opacity-50 rounded">
              ❌ Error fetching teams: {error.message || "Unknown error"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No teams state
  if (!teams || teams.length === 0) {
    return (
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Teams</h1>
        <div className="p-4 text-center bg-gray-100 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-500">
            No teams found for the league.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="flex items-center mb-6 text-3xl font-bold text-blue-700">
        <span className="mr-2">🏆</span> Ethiopian Premier League Teams
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="flex items-center p-4 space-x-3 transition-all bg-gray-100 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-xl"
          >
            {team.logo ? (
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="object-contain w-12 h-12 rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 text-gray-600 bg-gray-300 rounded-full">
                ?
              </div>
            )}
            <span className="text-lg font-semibold text-gray-800">{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;