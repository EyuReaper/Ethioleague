import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStandings = async () => {
  const { data } = await axios.get("http://localhost:5000/standings");
  return data;
};

export const useStandings = () => {
  return useQuery(["standings"], fetchStandings, {
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
