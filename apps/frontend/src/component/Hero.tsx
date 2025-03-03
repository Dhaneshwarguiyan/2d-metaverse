import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import BackgroundImages from "./ui/BackgroundImages";
import MotionHeading from "./ui/MotionHeading";
import { motion } from "motion/react";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-[100vh] flex flex-col gap-6 justify-center items-center overflow-hidden relative">
      <motion.div
        className="p-10 rounded-xl flex flex-col gap-6 justify-center items-center overflow-hidden relative z-30 backdrop-blur-sm"
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <div className="text-center  rounded-lg">
          <MotionHeading />
          <div className="text-white text-2xl">
            Welcome to the 2D Metaverse of Endless possibilities
          </div>
        </div>
        <div
          onClick={() => {
            navigate("/home");
          }}
        >
          <Button text="Explore" type="cta" />
        </div>
      </motion.div>
      <BackgroundImages />
    </div>
  );
};

export default Hero;
