const SquadTable = () => {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-bold">League Standings</h3>
        <table className="w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Team</th>
              <th className="border p-2">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Addis Ababa FC</td>
              <td className="border p-2">30</td>
            </tr>
            <tr>
              <td className="border p-2">Bahir Dar City</td>
              <td className="border p-2">27</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SquadTable;
  