import { useNavigate } from "react-router-dom";
import img from "../assets/bg2.jpg";
import { motion } from "motion/react";
import RightArrow from "../icons/RightArrow";

const Tutorial = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen bg-white py-20">
      <motion.div
        className="w-[1180px] mx-auto flex flex-col gap-4"
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
        <motion.div className="text-center text-5xl">
          Easily Create <span className="text-blue-500 font-bold">Spaces</span>{" "}
          With Prebuilt Templates
        </motion.div>
        <motion.div className="w-full shadow-all rounded-lg p-14 mt-8">
          <div className="text-3xl text-gray-700 font-[550]">
            Start with <span>Free Template</span>
          </div>
          <div className="text-gray-500">
            Check out our templates, which include Spaces for offices, events,
            and community gatherings.
          </div>
          <div
            className="text-blue-500 font-semibold mt-6 cursor-pointer flex gap-2 mb-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            <span>Try it Now</span>
            <RightArrow />
          </div>
          <img src={img} alt="" className="object-contain rounded-lg" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tutorial;
