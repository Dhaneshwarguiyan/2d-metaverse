import { motion } from "motion/react";
import { useEffect, useState } from "react";

const headingText = [
  "Explore. Connect. Create",
  "Talk. Play. Chat",
  "Your Playground, Your Metaverse.",
];

const MotionHeading = () => {
  const [currText, setCurrText] = useState<string>(headingText[0]);

  useEffect(() => {
    let currIndex = 1;
    const clock = setInterval(() => {
      setCurrText(headingText[currIndex]);
      currIndex = (currIndex + 1) % headingText.length;
    }, 4000);
    return () => clearInterval(clock);
  }, []);
  return (
    <div className="h-fit overflow-hidden ">
      <motion.div
        className="text-7xl font-extrabold text-white mb-2"
        animate={{
          translateY: [100, 0, 0, -100],
        }}
        transition={{
          duration: 4,
          times: [0, 0.1, 0.9, 1],
          ease: "backInOut",
          repeat: Infinity,
          delay: 0,
        }}
      >
        {currText}
      </motion.div>
    </div>
  );
};

export default MotionHeading;
