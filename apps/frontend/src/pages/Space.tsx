import NavPanel from "../component/NavPanel";
import Map from "../component/Map";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateSpace } from "../slices/renderSlice";

// const maps = [{thumbnail:map,name:"My Map 1"}]
interface mapType {
  room: string;
  id: number;
  mapId: number;
  userId: number;
}
interface roomsType{
  id:number;
  room:string;
  mapid:number;
  userId:number;
}
interface visitedMapsType {
  id:number;
  room:roomsType;
  roomId:number;
  userId:number;
}

const Space = () => {

  const [maps, setMap] = useState<mapType[]>();
  const [visitedMaps,setVisitedMaps] = useState<visitedMapsType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("My Space");
  const space = useSelector((state: RootState) => state.render.spaces);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const getSpaces = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/maps/spaces/all`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      setMap(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getVisitedSpaces = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/visitedSpaces/all`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      setVisitedMaps(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const removeVisitedSpaces = async (id:string) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API}/api/v1/visitedSpaces/removeSpace/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      dispatch(updateSpace())
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSpaces();
    getVisitedSpaces();
  }, [space]);

  return (
    <div className="w-[1180px] mx-auto">
      <NavPanel setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === "My Space" ? (
        <div className="flex flex-wrap gap-4">
          {maps &&
            maps.map((map, key) => {
              return (
                <Map
                  room={map.id}
                  name={map.room}
                  id={map.id}
                  key={key}
                  type="owner"
                  removeVisitedSpaces={removeVisitedSpaces}
                />
              );
            })}
        </div>
      ) : (
        //not completed
        <div className="flex flex-wrap gap-4">
          {visitedMaps &&
            visitedMaps.map((rooms, key) => {
              return (
                <Map
                  id={rooms.room.id}
                  visitedId={rooms.id}
                  name={rooms.room.room}
                  key={key}
                  type="guest"
                  removeVisitedSpaces={removeVisitedSpaces}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Space;
