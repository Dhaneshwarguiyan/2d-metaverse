import { motion } from "motion/react";
import { ReactElement } from "react";

interface propType {
  icon?: ReactElement;
  text: string;
  type: "primary" | "secondary" | "cta";
}

const Button = ({ icon, text, type }: propType) => {
  return (
    <motion.div
      className={`w-fit h-fit flex justify-center shadow-md items-center  gap-2  ${type === "cta" ? "text-xl text-white bg-blue-500 rounded-lg px-7 py-3 font-medium" : "py-2 px-4 rounded-lg text-sm font-extrabold"}  ${type === "primary" && "text-white bg-blue-500"} ${type === "secondary" && "text-blue-900 bg-blue-100"} cursor-pointer`}
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        duration: 0.1,
      }}
    >
      {icon && <span>{icon}</span>}
      <span className="">{text}</span>
    </motion.div>
  );
};

export default Button;
