import { motion } from "motion/react";
import img from "../assets/discover.png";

const Help = () => {
  return (
    <div className="w-screen bg-blue-100 pt-10">
      <motion.div
        className="w-[1180px] mx-auto"
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          staggerChildren: 0.3,
        }}
      >
        <motion.div className="text-center font-bold text-2xl">
          Need a Personal Space Creator ?
        </motion.div>
        <motion.div className="text-center text-gray-500 ">
          You can entrust us with personal space production, if you need some
          help
        </motion.div>
        <motion.div className="w-full flex justify-center mt-10">
          <motion.img
            src={img}
            alt="img"
            className="w-[200px]"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              times: [0.3, 0.6, 0.9],
              repeat: Infinity,
              delay: 0,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Help;
