import Discover from "../component/Discover";
import Footer from "../component/Footer";
import Help from "../component/Help";
import Hero from "../component/Hero";
import Tutorial from "../component/Tutorial";
import LineAnimation from "../component/ui/LineAnimation";

const LandingPage = () => {
  return (
    <div className="h-screen w-screen mx-auto overflow-x-hidden bg-black scrollbar">
      <Hero />
      <Discover />
      <LineAnimation />
      <Tutorial />
      <Help />
      <Footer />
    </div>
  );
};

export default LandingPage;
