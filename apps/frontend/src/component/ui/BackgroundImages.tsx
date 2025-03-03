import { motion } from "motion/react";
import bg2 from "../../assets/bg2.jpg";
import bg4 from "../../assets/bg4.jpg";
import bg6 from "../../assets/bg6.png";
import bg7 from "../../assets/bg7.png";
import bg8 from "../../assets/bg8.png";
import { useEffect, useState } from "react";

const bgArray = [bg2, bg4, bg6, bg7, bg8];

const BackgroundImages = () => {
  const [bg, setBg] = useState<string>(bg2);

  useEffect(() => {
    let randomIndex = 1;
    const clock = setInterval(() => {
      setBg(bgArray[randomIndex]);
      randomIndex = (randomIndex + 1) % bgArray.length;
    }, 7000);
    return () => {
      clearInterval(clock);
    };
  }, []);

  return (
    <motion.img
      src={bg}
      alt=""
      className="absolute  w-screen h-full object-cover"
      animate={{
        scale: [1, 1.07, 1],
      }}
      transition={{
        duration: 14,
        times: [0, 0.5, 1],
        repeat: Infinity,
      }}
    />
  );
};

export default BackgroundImages;
