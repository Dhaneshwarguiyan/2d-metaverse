import { useEffect, useRef, useState } from "react";
import Cancel from "../icons/Cancel";
import Button from "./ui/Button";
import { closeEnterNameDialog } from "../slices/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateSpace } from "../slices/renderSlice";
import { RootState } from "../store/store";
import { generateRandomString } from  '../utils/randomString';

//code validation to be added in here
const EnterNameDialog = () => {
  const dialogContainerRef = useRef<HTMLDivElement>(null);
  const [spaceName, setSpaceName] = useState<string>("");
  const mapId = useSelector((state:RootState)=>state.map.mapId);
  const dispatch = useDispatch();
  const createSpace = async (e: { preventDefault: () => void; }) => {
    const roomCode:string = generateRandomString(8);
    e.preventDefault();
    try {
      //use mutation func from use query to dynamically update on any changes
      await axios.post(
        `${import.meta.env.VITE_API}/api/v1/maps/spaces`,
        {
          name: spaceName,
          roomCode: roomCode, //generate a random 
          mapId: mapId,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
      );
      dispatch(updateSpace());
      closeDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const closeDialog = () => {
      dispatch(closeEnterNameDialog());
  };

  const closeOnOutsideClickDialog = (e: MouseEvent) => {
    if (
      !(
        e.target instanceof Node &&
        dialogContainerRef.current &&
        dialogContainerRef.current.contains(e.target)
      )
    ) {
      closeDialog();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", closeOnOutsideClickDialog);
    return () => {
      window.removeEventListener("mousedown", closeOnOutsideClickDialog);
    };
  }, []);

  return (
    <div className="w-screen h-screen absolute flex justify-center items-center backdrop-blur-sm z-20">
      <div
        className="w-[350px] border p-4 rounded-lg shadow-lg bg-white"
        ref={dialogContainerRef}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="font-extrabold text-lg">Enter Space Name</span>
          <span className="cursor-pointer" onClick={closeDialog}>
            <Cancel />
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="font-thin text-gray-500 w-full">Name</div>
          <form className="w-full">
          <input
            type="text"
            placeholder="Space Name"
            value={spaceName}
            onChange={(e) => {
              setSpaceName(e.target.value);
            }}
            className="border outline-none p-2 rounded-lg w-full"
            />
          <button onClick={createSpace} type="submit" className="mt-2">
            <Button text="Create" type="primary" />
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterNameDialog;
