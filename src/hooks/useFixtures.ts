import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the expected shape of a fixture (adjust based on your API)
interface Fixture {
  fixture: {
    id: number;
    date: string;
    venue: { name: string };
  };
  teams: {
    home: { name: string };
    away: { name: string };
  };
  highlight?: string; // Optional video URL
}

// Fetch function with proper error handling
const fetchFixtures = async (): Promise<Fixture[]> => {
  try {
    const { data } = await axios.get("http://localhost:5000/fixtures");
    return data; // Assumes API returns Fixture[]
  } catch (error) {
    // Throw a meaningful error for useQuery to catch
    throw new Error(
      axios.isAxiosError(error) ? error.message : "Failed to fetch fixtures"
    );
  }
};

export const useFixtures = () => {
  return useQuery({
    queryKey: ["fixtures"], // Unique key for caching
    queryFn: fetchFixtures, // Function to fetch data
    staleTime: 60 * 1000, // 1 minute cache
    refetchOnWindowFocus: false, // No refetch on tab focus
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // 1 second delay between retries
  });
};