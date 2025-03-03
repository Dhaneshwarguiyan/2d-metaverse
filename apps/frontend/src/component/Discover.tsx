import { motion } from "motion/react";
import Button from "./ui/Button";
import ImageSlider from "./ui/ImageSlider";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] h-[70vh]  z-10 rounded-t-3xl bg-white py-10">
      <motion.div
        className="w-[1180px] h-full mx-auto flex flex-col items-center gap-4"
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <div className="w-full text-center text-4xl py-6">
          Try <span className="font-semibold text-blue-500">PixelVerse</span>{" "}
          Spaces now
        </div>
        <ImageSlider />
        <span
          className="mt-4"
          onClick={() => {
            navigate("/login");
          }}
        >
          <Button text="Explore Spaces" type="cta" />
        </span>
      </motion.div>
    </div>
  );
};

export default Discover;
