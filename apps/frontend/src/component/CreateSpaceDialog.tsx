import { useEffect, useRef, useState } from "react";
import Cancel from "../icons/Cancel";
import axios from "axios";
import { mapType } from "../types/types";
import MapTemplateCard from "./MapTemplateCard";
import { useDispatch } from "react-redux";
import { closeCreateSpaceDialog } from "../slices/toggleSlice";

const CreateSpaceDialog = () => {
  const [maps, setMaps] = useState<mapType[]>();
  const createSpaceContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const getMaps = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/maps/all`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
      );
      setMaps(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const closeDialog = () => {
    dispatch(closeCreateSpaceDialog());
  };
  const closeOnClickOutside = (e: MouseEvent) => {
    if (
      !(
        e.target instanceof Node &&
        createSpaceContainerRef.current &&
        createSpaceContainerRef.current.contains(e.target)
      )
    ) {
      closeDialog();
    }
  };
  const eventListener = (flag:boolean)=>{
    if(flag){
      window.addEventListener("mousedown", closeOnClickOutside);
    }else{
      window.removeEventListener("mousedown", closeOnClickOutside);
    }
  }

  useEffect(() => {
    getMaps();
    eventListener(true);
    return () => {
      eventListener(false);
    };
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center backdrop-blur-sm absolute z-20">
      <div
        className="w-[50%] h-[50%] bg-white shadow-md p-4 flex flex-col gap-3 rounded-lg"
        ref={createSpaceContainerRef}
      >
        <div className="w-full flex justify-between">
          <span className="text-xl font-extrabold">Select a Template</span>
          <span onClick={closeDialog} className="cursor-pointer">
            <Cancel />
          </span>
        </div>
        <div>
          <div className="px-4 py-2 border w-fit rounded-full bg-blue-700 text-white">
            All
          </div>
        </div>
        <div>
          {maps?.map((item, key) => {
            return <MapTemplateCard id={item.id} name={item.name} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateSpaceDialog;
