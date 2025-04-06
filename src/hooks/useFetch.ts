import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetch fixtures example
const fetchFixtures = async () => {
  const { data } = await axios.get("https://www.thesportsdb.com/league/4959-Ethiopian-Premier-League");
  return data;
};

// Custom hook for fetching fixtures
export const useFixtures = () => {
  return useQuery({ queryKey: ["fixtures"], queryFn: fetchFixtures });
};
