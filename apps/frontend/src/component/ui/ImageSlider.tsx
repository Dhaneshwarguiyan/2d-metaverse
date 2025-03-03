import { useEffect, useRef, useState } from "react";
import Image1 from "./Image1";
import img1 from "../../assets/bg2.jpg";
import img2 from "../../assets/bg4.jpg";
import img3 from "../../assets/bg6.png";
import img4 from "../../assets/bg7.png";
import img5 from "../../assets/bg8.png";

const ImageSlider = () => {
  const imageSliderRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<ReturnType<typeof setInterval>>();
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    clockRef.current = setInterval(() => {
      if (imageSliderRef.current) {
        if (imageSliderRef.current?.scrollLeft + 397 >= 1280) {
          imageSliderRef.current.scrollLeft = 0;
        } else imageSliderRef.current.scrollLeft += 397;
      }
    }, 4000);
    return () => clearInterval(clockRef.current);
  }, [isHover]);

  const pause = () => {
    clearInterval(clockRef.current);
  };
  const play = () => {
    setIsHover(!isHover);
  };
  return (
    <div
      className="h-[300px] w-full overflow-hidden flex gap-3 snap-x scroll-smooth no-scrollbar rounded-lg"
      ref={imageSliderRef}
      onMouseEnter={pause}
      onMouseLeave={play}
    >
      <Image1 img={img1} />
      <Image1 img={img2} />
      <Image1 img={img3} />
      <Image1 img={img4} />
      <Image1 img={img5} />
      <Image1 img={img1} />
    </div>
  );
};

export default ImageSlider;
