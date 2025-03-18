import profile from '../assets/profile.png';
import card from '../assets/map1.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSpace } from '../slices/renderSlice';
import Delete from '../icons/Delete';
import Copy from '../icons/Copy';
import axios from 'axios';
import { parseDate } from '../utils/parseDate';
import { toast } from 'react-toastify';

  interface userType {
    firstName:string;
    lastName:string;
    username: string;
  }

  interface roomsType{
    id:number;
    name:string;
    roomCode:string;
    mapid:number;
    userId:number;
    user:userType;
    createdAt:string;
  }

  interface cardPropType {
    user:userType;
    room:roomsType;
    visitedId?:number;
    type:"guest" | "owner";
    removeVisitedSpaces: (arg0: string) => void;
  }

const Card = ({user,room, visitedId, type, removeVisitedSpaces }: cardPropType) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createdAt = parseDate(room.createdAt);
    //delete space
    const removeDeleteSpace = () => {
        if (type === "owner") {
          deleteSpace();
        } else {
          removeVisitedSpaces(`${visitedId}`);
        }
      };
    //handle space
    const handleSpace = () => {
        navigate(`/${room.roomCode}`); //check this is this the name or the id
    };
    //copy to clipboard
    const copyToClipBoard = () => {
      navigator.clipboard.writeText(room.roomCode);
      toast.success('Copied !')
    }
    //delete space
    const deleteSpace = async () => {
        try {
          await axios.post(
            `${import.meta.env.VITE_API}/api/v1/maps/delete`,
            {
              roomCode:room.roomCode, //for deleting messages
              roomId:room.id,
            },
            {
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            },
          );
          dispatch(updateSpace());
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className='bg-gray-100 p-[10px] rounded-xl tracking-normal shadow-md'>
        <img src={card} alt="" className='rounded-lg w-[280px] h-[170px] object-cover cursor-pointer' onClick={handleSpace}/>
        <div className='mt-3 px-1'>
            <div className='flex justify-between w-full'>
                <div className='flex items-center gap-2'>
                    <div className='text-[18px] font-[400]'>{room.name}</div>
                    <div className='text-[14px] text-slate-500 flex items-center cursor-pointer' onClick={copyToClipBoard}>(<Copy />{room.roomCode})</div>
                </div>
                <div onClick={removeDeleteSpace} className='text-red-500 cursor-pointer'><Delete /></div>
            </div>
            <div className='flex justify-between items-end'>
                <div className='flex gap-2 pt-2'>
                    <img src={profile} alt="profile" className='rounded-full w-[30px] h-[30px]' />
                    <div className='flex flex-col'>
                        <div className='text-[14px] font-medium text-black leading-4'>{user.firstName}</div>
                        <div className='text-[14px] text-gray-600'>@{user.username}</div>
                    </div>
                </div>
                <div className='text-gray-600 flex flex-col items-end'>
                    <div className='leading-3 text-[14px]'>created on:</div>
                    <div className='text-[14px]'>{createdAt}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card
