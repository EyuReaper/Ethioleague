import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFixtures = async () => {
  const { data } = await axios.get("http://localhost:5000/fixtures");
  return data;
};

export const useFixtures = () => {
  return useQuery({
    queryKey: ["fixtures"],  // Use queryKey instead of the first argument
    queryFn: fetchFixtures,   // Use queryFn instead of the second argument
    staleTime: 60 * 1000,     // Cache for 1 min
    refetchOnWindowFocus: false,
  });
};