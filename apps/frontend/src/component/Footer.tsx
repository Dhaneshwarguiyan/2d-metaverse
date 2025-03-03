import { useState } from "react";
import Button from "./ui/Button";
import axios from "axios";

const Footer = () => {
  const [feedback, setFeedback] = useState<string>("");
  const submitFeedback = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/feedback`,
        {
          feedback,
        },
      );
      setFeedback("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen bg-black text-blue-50">
      <div className="w-[1180px] mx-auto p-10 flex justify-center gap-20">
        <div className="flex gap-10">
          <div>
            <div className="text-xl font-bold mb-4">PixelVerse</div>
            {/* <Tile text={"About"} /> */}
          </div>
          <div>
            <div className="text-xl font-bold mb-4">Contact</div>
            <a href="https://github.com/Dhaneshwarguiyan" target="_blank">
              <Tile text={"Github"} />
            </a>
            <a href="https://x.com/Dhane_4651" target="_blank">
              <Tile text={"Twitter"} />
            </a>
            <a
              href="https://www.linkedin.com/in/dhaneshwarguiyan"
              target="_blank"
            >
              <Tile text={"LinkedIn"} />
            </a>
          </div>
        </div>
        <div>
          <div className="text-xl font-bold">Feedback</div>
          <div className="text-gray-400 text-sm mb-2">
            Your Feedback is valuable
          </div>
          <textarea
            name="feedback"
            value={feedback}
            id="feedback"
            placeholder="feedback"
            className="bg-white outline-none w-[300px] h-[100px] rounded-lg p-2 px-3 text-sm text-black"
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          ></textarea>
          <span onClick={submitFeedback}>
            <Button text="Submit" type="secondary" />
          </span>
        </div>
      </div>
      <div className="text-center pb-5 text-gray-300">Made by Dhaneshwar</div>
    </div>
  );
};

export default Footer;

const Tile = ({ text }: { text: string }) => {
  return (
    <div className="text-gray-400 hover:underline cursor-pointer">{text}</div>
  );
};
