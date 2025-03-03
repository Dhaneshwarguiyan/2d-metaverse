import { ReactElement } from "react";
import { logoutUser } from "../../slices/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface propType {
  icon?: ReactElement;
  text?: string;
}

const DropDownTile = ({ icon, text }: propType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    if (text === "Logout") {
      toast.success(`Logged out`);
      setTimeout(() => {
        localStorage.setItem("token", "");
        localStorage.setItem("username", "");
        navigate("/");
        dispatch(logoutUser());
      }, 1000);
    }
  };

  return (
    <div
      className={`flex gap-2 text-sm items-center text-gray-600 ${icon && "border-t pt-3"}`}
      onClick={clickHandler}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default DropDownTile;
