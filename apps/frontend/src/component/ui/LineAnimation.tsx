import { motion } from "motion/react";

const bannerArray = [
  "EXPLORE",
  "CREATE",
  "CONNECT",
  "PLAY",
  "CHAT",
  "ENJOY",
  "EXPLORE",
  "CREATE",
  "CONNECT",
  "PLAY",
  "CHAT",
  "ENJOY",
  "EXPLORE",
];

const LineAnimation = () => {
  return (
    <div className="w-screen h-[80px] bg-gradient-to-b from-blue-400 to-blue-700 shadow-2xl">
      <motion.div
        className="h-full flex gap-24 items-center mx-10"
        initial={{
          x: 0,
        }}
        animate={{
          x: -1900,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          type: "tween",
          damping: 0,
          stiffness: 0,
        }}
      >
        {bannerArray.map((item, key) => {
          return (
            <span key={key} className="text-7xl font-bold text-white">
              {item}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default LineAnimation;
