import { useEffect, useState } from "react";
//Components
import SideBar from "./Sidebar";
import Navbar from "./Navbar";
import Unauthorized from "../olds/Unauthorized";
//Hooks
import useWindowSize from "../../hooks/useWindowSize";
import useAuth from "../../hooks/useAuth";
//Constants
import Roles from "../../constants/Roles";

const ViewHandler = ({ children }) => {
  const { auth } = useAuth();

  return auth.roles.includes(Roles.Admin) ? children : <Unauthorized />;
};

const PanelContainer = ({ children }) => {
  const [width] = useWindowSize();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open) {
      document.querySelector("#panel").classList.add("open");
    } else {
      document.querySelector("#panel").classList.remove("open");
    }
  }, [open]);

  useEffect(() => {
    if (width < 1000) {
      deleteAllClasses();
      document.querySelector("#panel").classList.add("small");
    } else if (width < 1400) {
      deleteAllClasses();
      document.querySelector("#panel").classList.add("medium");
    } else {
      deleteAllClasses();
      document.querySelector("#panel").classList.add("large");
    }
  }, [width]);

  const deleteAllClasses = () => {
    document.querySelector("#panel").classList.remove("large");
    document.querySelector("#panel").classList.remove("medium");
    document.querySelector("#panel").classList.remove("small");
  };

  return (
    <div className="panel_container">
      <SideBar open={open} setOpen={setOpen} />
      <div className="panel_content_container large" id="panel">
        <Navbar />
        <div className="panel_inside">
          <ViewHandler children={children} />
        </div>
      </div>
    </div>
  );
};

export default PanelContainer;
