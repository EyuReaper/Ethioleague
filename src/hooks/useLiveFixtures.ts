import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const fetchFixtures = async () => {
  const { data } = await axios.get("http://localhost:5000/fixtures");
  return data;
};

export const useLiveFixtures = () => {
  const { data, isLoading, error, refetch } = useQuery(
    ["fixtures"],
    fetchFixtures,
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  const [liveFixtures, setLiveFixtures] = useState(data || []);

  useEffect(() => {
    socket.on("fixturesUpdate", (updatedFixtures) => {
      setLiveFixtures(updatedFixtures);
    });

    return () => {
      socket.off("fixturesUpdate");
    };
  }, []);

  return { liveFixtures, isLoading, error };
};
