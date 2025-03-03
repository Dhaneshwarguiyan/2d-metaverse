import { useEffect, useRef, useState } from "react";
import Text from "./Text";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import Button from "./ui/Button";

interface messageType {
  // id:number;
  message: string;
  // read:boolean;
  sender: string;
  // userId: number;
}

const Chat = ({
  socket,
  room,
  messages,
  setMessages,
}: {
  socket: WebSocket;
  room: string;
  messages: messageType[];
  setMessages: React.Dispatch<React.SetStateAction<messageType[] | undefined>>;
}) => {
  const [text, setText] = useState<string>("");
  const scollRef = useRef<HTMLDivElement>(null);
  const name = useSelector((state: RootState) => state.user.info?.username);
  // const fn = ()=>{
  //   console.log("focus")
  // }
  // const fn1 = ()=>{
  //   console.log("blur")
  // }

  // useEffect(()=>{
  //   // if(inputRef.current){
  //     inputRef.current?.addEventListener('focus',fn);
  //     inputRef.current?.addEventListener('blur',fn1);
  // },[])

  useEffect(() => {
    if (scollRef.current)
      scollRef.current.scrollTop = scollRef.current.scrollHeight;
  }, [text]);

  const handleMessage = () => {
    updateMessages();
    if (socket.readyState === WebSocket.OPEN) {
      const messageData = {
        type: "message",
        payload: {
          sender: name,
          message: text,
          room: room,
        },
      };
      socket.send(JSON.stringify(messageData));
    }
    if (name) {
      setMessages((prev) => {
        if (prev) return [...prev, { sender: name, message: text }];
        else return [{ sender: name, message: text }];
      });
    }
    setText("");
  };

  const updateMessages = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/api/v1/messages`,
        {
          message: text,
          sender: name,
          room: room,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="backdrop-blur-sm hover:duration-500 h-auto flex flex-col justify-end rounded-lg">
      <div
        className="h-[400px] overflow-y-scroll pl-2 mt-2 scrollbar"
        ref={scollRef}
      >
        {messages &&
          messages.map((data, key) => {
            return <Text text={data.message} sender={data.sender} key={key} />;
          })}
      </div>
      <div className="w-full flex gap-3 px-4 pb-4 pt-2 items-center">
        <input
          type="text"
          placeholder="message"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="px-3 py-2 rounded-lg shadow-md border-2 outline-none"
        />
        <span onClick={handleMessage}>
          <Button text="Send" type="primary" />
        </span>
      </div>
    </div>
  );
};

export default Chat;
