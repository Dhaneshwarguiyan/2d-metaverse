import { useNavigate } from "react-router-dom";
import Exit from "../icons/Exit";
import Message from "../icons/Message";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Pause from "../icons/Pause";
import Play from "../icons/Play";
import { toggleAudio } from "../slices/audioSlice";
import bgMusic from '../assets/background.mp3';

interface messageType {
  message: string;
  sender: string;
}

const Sidebar = ({ socket, room }: { socket: WebSocket; room: string }) => {
  const [messageDialog, setMessageDialog] = useState<boolean>(false);
  const [messages, setMessages] = useState<messageType[]>();
  const [newMessages, setNewMessages] = useState<number>(0);

  const isPlay = useSelector((state:RootState)=>state.audio.play);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllMessages = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/messages/room`,
        {
          room,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
      );
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages();
    const messageEvent = (event: { data: string }) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData && parsedData.type === "message") {
        const { sender, message } = parsedData.payload;
        setMessages((prev) => {
          if (prev) return [...prev, { sender, message }];
          else return [{ sender, message }];
        });
      }
    };
    if (socket.readyState === WebSocket.OPEN) {
      socket.addEventListener("message", messageEvent);
    } else {
      console.log("Socket not ready");
    }
    return () => {
      socket.removeEventListener("message", messageEvent);
    };
  }, [socket]);

  const newAudio = new Audio(bgMusic);
  useEffect(()=>{
    if(isPlay){
      newAudio.play();
    }else{
      newAudio.pause();
    }
    return ()=>{
      newAudio.pause();
    }
  },[isPlay])

  return (
    <div className="w-screen absolute bottom-0 backdrop-blur-sm bg-[rgba(10,10,10,0.4)] flex justify-center p-3 py-3 gap-4">
        <span
        className="rounded-full flex justify-center items-center w-[50px] h-[50px] shadow-deep cursor-pointer text-blue-600 bg-white"
        onClick={() => {
          dispatch(toggleAudio());
        }}
      >
        {isPlay ? 
        <Play />:
        <Pause />  
      }
      </span>
      <span
        className="rounded-full flex justify-center items-center w-[50px] h-[50px]  shadow-deep cursor-pointer text-blue-600 relative bg-white"
        onClick={() => {
          setMessageDialog(!messageDialog);
          setNewMessages(0);
        }}
      >
        <Message />
        {newMessages !== 0 && (
          <span className="text-white text-sm bg-red-500 font-extrabold  rounded-full w-[25px] h-[25px] flex justify-center items-center absolute bottom-8 left-7">
            {newMessages}
          </span>
        )}
      </span>
      <span
        className="rounded-full flex justify-center items-center w-[50px] h-[50px] shadow-deep cursor-pointer text-blue-600 bg-white"
        onClick={() => {
          socket.close();
          navigate("/home");
        }}
      >
        <Exit />
      </span>
      {messageDialog && (
        <span className="absolute left-2 bottom-20">
          <Chat
            socket={socket}
            room={room}
            messages={messages}
            setMessages={setMessages}
          />
        </span>
      )}
    </div>
  );
};

export default Sidebar;
