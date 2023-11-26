import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
//Modals
import LoginModal from "../components/Modals/LoginModal";
//Hooks
import useInput from "../hooks/useInput";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LOGIN_URL = "/login";

const Panel = ({ language }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = "/panel";

  const [open, setOpen] = useState(true);
  const [username, setUsername, userAttributes] = useInput("user", "");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    try {
      let parameters = { email: username, pwd: password };
      const response = await axiosPrivate.post(
        LOGIN_URL,
        JSON.stringify(parameters),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setAuth(response.data.user);
        setUsername();
        setPassword("");
        navigate(from, { replace: true });
      }
    } catch (err) {
      //alert(err);
      // TODO: Errorhandling..
      if (!err?.response) {
        //setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        //setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        //setErrMsg("Unauthorized");
      } else {
        //setErrMsg("Login Failed");
      }
      //errRef.current.focus();
    }
  };

  return (
    <div className="login_container">
      <Button onClick={handleLoginClick} color="primary" variant="text">
        Giriş Yap
      </Button>
      <LoginModal
        open={open}
        onClose={closeModal}
        password={password}
        setPassword={(e) => setPassword(e.target.value)}
        onSubmit={() => onSubmit()}
        userAttributes={userAttributes}
        language={language}
      />
    </div>
  );
};

export default Panel;
