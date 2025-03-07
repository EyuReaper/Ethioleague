import { useQuery } from "@tanstack/react-query"
import axios from "axios";

const fetchMatchDetails = async (matchId: string) => {
    const { data } = await axios.get(`http://localhost:5000/match/${matchId}`);
    return data;
};

export const useMatchDetails = (matchId: string) => {
    return useQuery(["matchDetails", matchId], () => fetchMatchDetails(matchId), {
      enabled: !!matchId,
    });
  };