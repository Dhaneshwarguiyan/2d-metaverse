import { useEffect, useRef, useState } from "react";
import Cancel from "../icons/Cancel";
import Button from "./ui/Button";
import { useDispatch } from "react-redux";
import { closeEntryCodeDialog } from "../slices/toggleSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { initMap } from "../slices/mapSlice";
import { toast } from "react-toastify";

//code validation to be added in here
const EnterSpaceDialog = () => {
  const dialogContainerRef = useRef<HTMLDivElement>(null);
  const [roomCode, setRoomCode] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getSpace = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/maps/space/get/${roomCode}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.message) {
        addVisitedSpaces(roomCode);
        dispatch(initMap(roomCode));
        navigate(`/${roomCode}`);
        closeDialog();
      } else {
        toast.error("No room exists")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addVisitedSpaces = async (id:string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/visitedSpaces/visitSpace/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const closeDialog = () => {
    dispatch(closeEntryCodeDialog());
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
        className="w-[350px] border p-4 rounded-lg shadow-lg"
        ref={dialogContainerRef}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="font-extrabold text-lg">Enter with Code</span>
          <span onClick={closeDialog} className="cursor-pointer">
            <Cancel />
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="font-thin text-gray-700 w-full">Entry Code</div>
          <input
            type="text"
            placeholder="Your Entry Code"
            value={roomCode}
            onChange={(e) => {
              setRoomCode(e.target.value);
            }}
            className="border outline-none p-2 rounded-lg w-full"
          />
          <span onClick={getSpace}>
            <Button text="Enter" type="primary" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnterSpaceDialog;
