import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      className="bg-blue-600 text-white p-10 text-center rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold">Welcome to EthioLeague</h1>
      <p className="mt-2">Your #1 source for Ethiopian Premier League updates</p>
    </motion.div>
  );
};

export default HeroSection;
