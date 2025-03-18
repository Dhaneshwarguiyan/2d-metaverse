import NavPanel from "../component/NavPanel";
import Card from "../component/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateSpace } from "../slices/renderSlice";

// const maps = [{thumbnail:map,name:"My Map 1"}]
interface userType {
  firstName:string;
  lastName:string;
  username: string;
}
interface roomsType{
  id:number;
  room:string;
  mapid:number;
  userId:number;
  user:userType;
  createdAt:string;
}
interface visitedMapsType {
  id:number;
  room:roomsType;
  user:userType;
}

const Space = () => {

  const [maps, setMap] = useState<roomsType[]>();
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
      console.log(response.data);
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
        <div className="flex flex-wrap gap-x-5 gap-y-5">
          {maps ?
            maps.map((map, key) => {
              return (
                <Card
                  user={map.user}
                  room={map}
                  //user
                  type="owner"
                  removeVisitedSpaces={removeVisitedSpaces}
                  key={key}
                />
              );
            })
            :
            <div className="flex items-center justify-center">Loading ...</div>
            }
        </div>
      ) : (
        //not completed
        <div className="flex flex-wrap ">
          {visitedMaps &&
            visitedMaps.map((rooms, key) => {
              return (
                <Card
                  //room id
                  user={rooms.user}
                  room={rooms.room}
                  //visited room id
                  visitedId={rooms.id}
                  //room changed to name
                  type="guest"
                  removeVisitedSpaces={removeVisitedSpaces}
                  key={key}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};



export default Space;
