import Profile from "../assets/profile.png";

const Text = ({ text, sender }: { text: string; sender: string }) => {
  return (
    <div className="w-full flex items-start gap-2 mt-3">
      <img
        src={Profile}
        alt="Avatar"
        className="w-[40px] h-[40px] object-center rounded-full shadow-deep"
      />
      <div className="bg-blue-100 rounded-lg pl-2 pr-4 py-2 mr-2 shadow-deep">
        <div className="text-red-600 text-sm font-extralight">{sender}</div>
        <div className="text-black text-wrap leading-5">{text}</div>
      </div>
    </div>
  );
};

export default Text;
