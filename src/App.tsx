import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";
import Home from "./pages/Home";
import Fixtures from "./pages/Fixtures";
import News from "./pages/News";
import Results from "./pages/Results";
import Table from "./pages/Table";
import Team from "./pages/Teams";
import Videos from  "./pages/Videos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MatchDetails from "./pages/MatchDetails";
import Standings from "./pages/Standings";
import "./index.css";

const queryClient = new QueryClient();
const socket = io("http://localhost:5000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/news" element={<News />} />
          <Route path="/result" element={<Results />} />
          <Route path="/table" element={<Table />} />
          <Route path="/team" element={<Team />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
        <Footer />
      </Router> 
    </QueryClientProvider>
  );
}

export default App;