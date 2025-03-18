import profile from '../assets/profile.png';
import card from '../assets/map1.png';
import { useDispatch } from 'react-redux';
import { initMap } from '../slices/mapSlice';
import { useNavigate } from 'react-router-dom';
import { updateSpace } from '../slices/renderSlice';
import Delete from '../icons/Delete';
import axios from 'axios';

// interface propType {
//     room?:number;
//     visitedId?:number;
//     id: number;
//     name: string;
//     type: "owner" | "guest";
//     removeVisitedSpaces: (arg0: string) => void;
//   }

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
    console.log(user);
    //delte space
    const removeDeleteSpace = () => {
        if (type === "owner") {
          deleteSpace();
        } else {
          removeVisitedSpaces(`${visitedId}`);
        }
      };
    //handle space
    const handleSpace = () => {
        navigate(`/${room.id}`); //check this is this the name or the id
    };

    //delete space
    const deleteSpace = async () => {
        try {
          await axios.post(
            `${import.meta.env.VITE_API}/api/v1/maps/delete`,
            {
              room:room,
              mapId:room.id,
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
    <div className=' p-[5px] rounded-xl tracking-normal cursor-pointer' onClick={handleSpace}>
        <img src={card} alt="" className='rounded-lg w-[270px] h-[170px] object-cover'/>
        <div className='pt-2 px-1'>
            <div className='flex justify-between w-full'>
                <div className='flex items-center gap-2'>
                    <div className='text-[18px] font-[400]'>{name}</div>
                    <div className='text-[14px] text-slate-600'>#{id}</div>
                </div>
                <div onClick={removeDeleteSpace} className='text-red-500'><Delete /></div>
            </div>
            <div className='flex justify-between items-end px-1'>
                <div className='flex gap-2 pt-2'>
                    <img src={profile} alt="profile" className='rounded-full w-[30px] h-[30px]' />
                    <div className='flex flex-col'>
                        <div className='text-[14px] font-medium text-black leading-4'>Dhane david</div>
                        <div className='text-[14px] text-gray-600'>@tourist</div>
                    </div>
                </div>
                <div className='text-gray-600 flex flex-col items-end'>
                    <div className='leading-3 text-[14px]'>created on:</div>
                    <div className='text-[14px]'>Sept 26,2025</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card
