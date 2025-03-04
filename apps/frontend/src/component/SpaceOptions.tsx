import axios from "axios";
import Copy from "../icons/Copy";
import Delete from "../icons/Delete";
import { useDispatch } from "react-redux";
import { updateSpace } from "../slices/renderSlice";

const SpaceOptions = ({
  room,
  visitedSpaceId,
  setOptionsDialog,
  id,
  type,
  removeVisitedSpaces,
}: {
  setOptionsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  room?:number;
  id:number;
  visitedSpaceId?:number;
  type: "owner" | "guest";
  removeVisitedSpaces: (arg0: string) => void;
}) => {
  const dispatch = useDispatch();
  const deleteSpace = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/api/v1/maps/delete`,
        {
          room:room,
          mapId:id,
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
  const removeDeleteSpace = () => {
    if (type === "owner") {
      deleteSpace();
    } else {
      removeVisitedSpaces(`${visitedSpaceId}`);
    }
    closeOptions();
  };
  const closeOptions = () => {
    setOptionsDialog(false);
  };
  return (
    <div className="bg-white absolute z-10 bottom-8 right-0 shadow-md rounded-lg border p-4 text-nowrap text-sm">
      <div className="flex items-center gap-2" onClick={closeOptions}>
        <span>
          <Copy />
        </span>
        <span>Copy Space</span>
      </div>
      <div
        className="flex items-center gap-2 text-red-500 border-t-2 pt-2 mt-2"
        onClick={removeDeleteSpace}
      >
        <span>
          <Delete />
        </span>
        <span>{type === "owner" ? "Delete" : "Remove"} Space</span>
      </div>
    </div>
  );
};

export default SpaceOptions;
