import { useEffect, useState } from "react";
import Game from "../phaser/Game";
// import Chat from "../component/Chat";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser } from "../slices/userslice";
import { mapType } from "../types/types";
import { spriteType } from "../types/types";
import { spriteAssetsType } from "../types/types";
import axios from "axios";
import Sidebar from "../component/Sidebar";

const Metaverse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { room } = useParams();
  const token = localStorage.getItem("token");
  const [mapData, setMapData] = useState<mapType>();
  const [socket, setSocket] = useState<WebSocket>();
  const [sprites, setSprites] = useState<spriteType[]>();
  const [spritesAssets, setSpritesAssets] = useState<spriteAssetsType[]>();

  const getMapDetails = async () => {
    try {
      //importing map data
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/maps/space/${room}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      setMapData(response.data);
      //getting sprite data
      const sprites = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/sprites/get/sprites`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      setSprites(sprites.data);
      //getting sprite assets
      const spritesAssets = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/sprites/get/assets`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      setSpritesAssets(spritesAssets.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token === "" || !token) {
      navigate("/login");
    } else {
      dispatch(loginUser({ token, username }));
    }
    getMapDetails();
    const wss = new WebSocket("ws://localhost:8080");
    wss.onopen = () => {
      console.log("socket is opened");
      setSocket(wss);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative bg-slate-700">
      {socket && mapData && sprites && spritesAssets && room && (
        <div>
          <Game
            socket={socket}
            mapData={mapData}
            room={room}
            sprites={sprites}
            spritesAssets={spritesAssets}
          />
          <div className="bottom-0">
            <Sidebar socket={socket} room={room} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Metaverse;
