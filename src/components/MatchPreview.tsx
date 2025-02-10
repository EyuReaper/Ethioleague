import { motion } from "framer-motion";


const MatchPreview = () => {
  return (
    <motion.div
      className="bg-gray-100 p-4 rounded-lg"
      initial={{ opacity: 0, x: -50}}
      whileInView={{ opacity: 1, x: 0}}
      viewport={{once: true}}
      transition={{duration: 0.6}}
    >
      
        <h3 className="text-xl font-bold">Upcoming Match</h3>
        <p>Addis Ababa FC vs Bahir Dar City</p>
        <p>Date: Feb 10, 2025</p>
      </motion.div>
    );
  };
  
  export default MatchPreview;
  