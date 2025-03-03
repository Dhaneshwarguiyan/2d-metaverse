import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const usePlay = () => {
    const isPlay = useSelector((state:RootState)=>state.audio.play);
    return {isPlay};
}

export default usePlay
