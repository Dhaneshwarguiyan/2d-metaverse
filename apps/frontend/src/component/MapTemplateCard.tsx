import Options from "../icons/Options";
import map from "../assets/map1.png";
import { useDispatch } from "react-redux";
import { setMapId } from "../slices/mapSlice";
import { closeCreateSpaceDialog, openEnterNameDialog } from "../slices/toggleSlice";

const MapTemplateCard = ({ name, id}: { name: string; id: number }) => {
  const dispatch = useDispatch();

  const openNameDialog = () => {
    dispatch(setMapId(id));
    dispatch(openEnterNameDialog());
    dispatch(closeCreateSpaceDialog());
  }
  return (
    <div className="w-[283px] cursor-pointer" onClick={openNameDialog}>
      <img
        src={map}
        alt="map"
        className="w-[283px] h-[170px] rounded-lg object-cover"
      />
      <div className="flex justify-between px-2 mt-2">
        <span>{name}{id}</span>
        <span>
          <Options />
        </span>
      </div>
    </div>
  );
};

export default MapTemplateCard;
