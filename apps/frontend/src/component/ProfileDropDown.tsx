import DropDownTile from "./ui/DropDownTile";
import Logout from "../icons/Logout";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProfileDropDown = () => {
  const username = useSelector((state:RootState)=>state.user.info?.username);
  const dropItems = [
    { text: `Welcome ${username}`},
    { text: "Logout", icon: <Logout /> },
  ];
  return (
    <div className="border px-2 py-3 w-[250px] flex flex-col gap-2 cursor-pointer bg-white rounded-lg shadow-lg">
      {username && dropItems.map((items, key) => {
        return <DropDownTile text={items.text} icon={items.icon} key={key} />;
      })}
    </div>
  );
};

export default ProfileDropDown;
