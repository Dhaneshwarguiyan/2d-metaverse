import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/userslice";
import EnterSpaceDialog from "../component/EnterSpaceDialog";
import { RootState } from "../store/store";
import CreateSpaceDialog from "../component/CreateSpaceDialog";
import EnterNameDialog from "../component/EnterNameDialog";

const Navigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const entryCodeDialog = useSelector(
    (state: RootState) => state.toggleDialog.entryCodeDialog,
  );
  const createSpaceDialog = useSelector(
    (state: RootState) => state.toggleDialog.createSpaceDialog,
  );
  const enterNameDialog = useSelector((state:RootState)=>state.toggleDialog.enterNameDialog);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token === "" || !token) {
      navigate("/");
    } else {
      dispatch(loginUser({ token, username }));
      navigate("/home");
    }
  }, []);

  return (
    <div className="w-[100vw] h-full overflow-hidden">
      {entryCodeDialog && <EnterSpaceDialog />}
      {createSpaceDialog && <CreateSpaceDialog />}
      {enterNameDialog && <EnterNameDialog/>}
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Navigate;
