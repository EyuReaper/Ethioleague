import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend URL

export const useLiveScores = () => {
  const [liveScores, setLiveScores] = useState([]);

  useEffect(() => {
    socket.on("liveScores", (data) => {
      setLiveScores(data);
    });

    return () => {
      socket.off("liveScores");
    };
  }, []);

  return { liveScores };
};
