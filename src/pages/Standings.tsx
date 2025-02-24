import { useStandings } from "../hooks/useStandings";

const Standings = () => {
    const { data, isLoading, error } = useStandings();

    if (isLoading) return <p>Loading standings...</p>;
    if (error) return <p>Error fetching standings</p>;

    return (
        <div className="container p-4 mx-auto">
            <h1 className="text-3xl font-bold">League Standings</h1>
            <table className="w-full mt-2 border border-collapse border-gray-300 table-auto">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((team: any, index: number) => (
                        <tr key={team.team.id}>
                            <td>{index + 1}</td>
                            <td>{team.team.name}</td>
                            <td>{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default Standings;

