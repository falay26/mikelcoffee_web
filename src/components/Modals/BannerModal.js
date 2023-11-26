import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//API
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
//Firebase
import { storage } from "../../constants/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ADD_URL = "/add_banner";

const BannerModal = ({ open, onClose, onDone }) => {
  const axiosPrivate = useAxiosPrivate();

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async () => {
    const image_name = Date.now().toString();
    const imageRef = ref(storage, image_name);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            callApi(url);
          })
          .catch(() => {
            alert("Bir hata oldu. Lütfen birazdan tekrar deneyiniz.");
          });
        setImage(null);
      })
      .catch(() => {
        alert("Bir hata oldu. Lütfen birazdan tekrar deneyiniz.");
      });
  };

  const callApi = async (url) => {
    try {
      let parameters = { image_url: url };
      const response = await axiosPrivate.post(
        ADD_URL,
        JSON.stringify(parameters),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
	  onDone();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <input type="file" onChange={handleImageChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit}>Reklam Ekle</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BannerModal;
