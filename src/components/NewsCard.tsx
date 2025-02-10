import { motion } from "framer-motion";

const NewsCard = () => {
  return (
      <motion.div className="bg-white p-4 shadow-md rounded-lg"
      whileHover={{scale: 1.05}}
      transition={{duration: 0.3}}
    >
        <h3 className="text-xl font-bold">Latest News</h3>
        <p>Breaking news about Ethiopian football...</p>
        </motion.div>
      );
  };
  
  export default NewsCard;
  