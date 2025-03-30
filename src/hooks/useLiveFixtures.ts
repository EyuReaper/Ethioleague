import { useState, useEffect } from "react";
import axios from "axios";

export const useLiveFixtures = () => {
  const [liveFixtures, setLiveFixtures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await axios.get(
          `https://v3.football.api-sports.io/fixtures?league=203&season=2024&upcoming=true`,
          { headers: { "x-apisports-key": "YOUR_API_KEY" } }
        );
        setLiveFixtures(response.data.response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  return { liveFixtures, isLoading, error };
};
