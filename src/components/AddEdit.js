import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers";
//Firebase
import { storage } from "../constants/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ItemReturner = ({ item }) => {
  if (item.type === "textinput") {
    return (
      <TextField
        margin="dense"
        id={item.title}
        label={item.title}
        value={item.state}
        onChange={(e) => item.setState(e.target.value)}
        type="email"
        fullWidth
        variant="standard"
        multiline={item.multiline ? true : false}
      />
    );
  } else if (item.type === "working_hours") {
    let days = [
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
      "Pazar",
    ];
    return days.map((day, index) => {
      return (
        <div className="working_container">
          <TextField
            margin="dense"
            label={day + " Başlangıç"}
            value={item.states[2 * index]}
            onChange={(e) => item.setStates[2 * index](e.target.value)}
            type="email"
            variant="standard"
          />
          <TextField
            margin="dense"
            label={day + " Bitiş"}
            value={item.states[2 * index + 1]}
            onChange={(e) => item.setStates[2 * index + 1](e.target.value)}
            type="email"
            variant="standard"
          />
        </div>
      );
    });
  } else if (item.type === "choiceinput") {
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{item.title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={item.title}
          label={item.title}
          value={item.state}
          onChange={(e) => item.setState(e.target.value)}
        >
          {item.options?.map((option, index) => (
            <MenuItem key={index} value={option._id}>
              {item.option_title.includes(".")
                ? option[item.option_title.split(".")[0]][
                    item.option_title.split(".")[1]
                  ]
                : option[item.option_title]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else if (item.type === "imageinput") {
    const handleChange = (e) => {
      if (e.target.files[0]) {
        const image_name = Date.now().toString();
        const imageRef = ref(storage, image_name);
        uploadBytes(imageRef, e.target.files[0])
          .then(() => {
            getDownloadURL(imageRef)
              .then((url) => {
                item.setState(url);
              })
              .catch(() => {
                alert(
                  "Fotoğraf yüklenirken bir hata oldu. Lütfen birazdan tekrar deneyiniz."
                );
              });
          })
          .catch(() => {
            alert(
              "Fotoğraf yüklenirken bir hata oldu. Lütfen birazdan tekrar deneyiniz."
            );
          });
      }
    };

    return (
      <TextField
        margin="dense"
        id={item.title}
        label={item.title}
        onChange={handleChange}
        type="file"
        fullWidth
        variant="standard"
      />
    );
  } else if (item.type === "multichoiceinput") {
    if (item.condition) {
      return (
        <>
          <label>{item.title}</label>
          <div className="choices_container">
            {item.options?.map((option, index) => {
              let checked = item?.state?.includes(option.id);
              return (
                <div className="choice_container" key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        item.setState(e.target.checked, option.id)
                      }
                    />
                    {option.title}
                  </label>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  } else if (item.type === "checkbox") {
    return (
      <FormControlLabel
        control={
          <Checkbox
            margin="dense"
            checked={item.state}
            onChange={(e) => item.setState(e.target.checked)}
            fullWidth
            variant="standard"
          />
        }
        label={item.title}
      />
    );
  } else if (item.type === "dateselection") {
    return (
      <DatePicker
        margin="dense"
        label={item.title}
        value={item.state}
        onChange={(e) => item.setState(e)}
        fullWidth
        inputFormat="DD.MM.YYYY"
        renderInput={(params) => <TextField {...params} />}
      />
    );
  } else {
    return null;
  }
};

const AddEdit = ({ goBack, values, edit, onEditPress, onUpdatePress }) => {
  return (
    <div className="table_container">
      <img
        alt="go_back"
        className="back_image"
        src={require("../images/small_left_icon.png")}
        height="35"
        width="35"
        onClick={goBack}
      />
      {values.map((item) => (
        <ItemReturner item={item} />
      ))}
      <Button
        onClick={edit ? onEditPress : onUpdatePress}
        color="primary"
        variant="text"
      >
        {edit ? "Ekle" : "Düzenle"}
      </Button>
    </div>
  );
};

export default AddEdit;
