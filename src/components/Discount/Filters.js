import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//Constants
import Cities from "../../constants/Cities";
//API
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const APIS = {
  get: "/get_orders",
  get_products: "/get_all_products",
  get_branches: "/get_all_branches",
};

const genders = [
  { _id: "", name: "Hepsi" },
  { _id: "0", name: "Bilinmiyor" },
  { _id: "1", name: "Kadın" },
  { _id: "2", name: "Erkek" },
];

const Filters = ({ onClose, setIndex, setFilters, children }) => {
  const axiosPrivate = useAxiosPrivate();

  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState("");
  const [lastXMonths, setLastXMonths] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [gifter, setGifter] = useState("");
  const [supporter, setSupporter] = useState("");
  const [francher, setFrancher] = useState("");
  const [userDate, setUserDate] = useState("");
  const [userEndDate, setUserEndDate] = useState("");
  const [city, setCity] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProducts();
    getBranches();
  }, []);

  const getBranches = async () => {
    try {
      let parameters = {};
      const response = await axiosPrivate.post(
        APIS.get_branches,
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
        setBranches(response.data.data);
      }
    } catch (err) {
      // TODO: Errorhandling..
    }
  };

  const getProducts = async () => {
    try {
      let parameters = {};
      const response = await axiosPrivate.post(
        APIS.get_products,
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
        setProducts(response.data.data);
      }
    } catch (err) {
      //alert(err);
      // TODO: Errorhandling..
    }
  };

  const handleDone = () => {
    const filters = {
      min_age: minAge,
      max_age: maxAge,
      gender: gender,
      last_x_months: lastXMonths,
      min_amount: minAmount,
      branch_id: selectedBranch,
      gifter: gifter,
      supporter: supporter,
      francher: francher,
      user_date: userDate,
      user_end_date: userEndDate,
      city: city,
      product_id: selectedProduct,
    };
    setFilters(filters);
    setOpen(true);
  };

  return open ? (
    children
  ) : (
    <div className="discount_container">
      <div>
        <div className="discount_image_container">
          <img
            src={require("../../images/close_icon.png")}
            height="24"
            width="24"
            onClick={onClose}
          />
        </div>
        <p>Lütfen alt ve üst yaş giriniz.</p>
        <div className="filter_row">
          <TextField
            margin="none"
            label={"Alt yaş"}
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            type="number"
            fullWidth
            variant="standard"
            multiline={false}
          />
          <TextField
            margin="none"
            label={"Üst yaş"}
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            type="number"
            fullWidth
            variant="standard"
            multiline={false}
          />
        </div>
        <p>Lütfen Cinsiyet seçiniz.</p>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {"Cinsiyet seçiniz"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={"gender"}
            label={"Cinsiyet"}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            {genders?.map((gender, index) => (
              <MenuItem key={index} value={gender._id}>
                {gender?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <p>Lütfen son ay bilgisi giriniz.</p>
        <TextField
          margin="none"
          label={"Son X Ay"}
          value={lastXMonths}
          onChange={(e) => setLastXMonths(e.target.value)}
          type="number"
          fullWidth
          variant="standard"
          multiline={false}
        />
        <p>Lütfen minimum alışveriş bilgisi giriniz.</p>
        <TextField
          margin="none"
          label={"Minumum Alışveriş"}
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          type="number"
          fullWidth
          variant="standard"
          multiline={false}
        />
        <p>Lütfen şube seçiniz.</p>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {"Şube seçiniz"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={"Branch"}
            label={"Şube"}
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            {branches?.map((branch, index) => (
              <MenuItem key={index} value={branch._id}>
                {branch?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              margin="dense"
              checked={gifter}
              onChange={(e) => setGifter(e.target.checked)}
              fullWidth
              variant="standard"
            />
          }
          label={"Hediye gönderen ve alanlar"}
        />
        <FormControlLabel
          control={
            <Checkbox
              margin="dense"
              checked={supporter}
              onChange={(e) => setSupporter(e.target.checked)}
              fullWidth
              variant="standard"
            />
          }
          label={"Destek/Geri Bildirim gönderenler"}
        />
        <FormControlLabel
          control={
            <Checkbox
              margin="dense"
              checked={francher}
              onChange={(e) => setFrancher(e.target.checked)}
              fullWidth
              variant="standard"
            />
          }
          label={"Franchise başvuru yapanlar"}
        />
        <p>Lütfen üyelik tarihi giriniz.</p>
        <div className="filter_row">
          <TextField
            margin="none"
            label={"Aralık başlangıcı (YYYY-MM-DD)"}
            value={userDate}
            onChange={(e) => setUserDate(e.target.value)}
            type="email"
            fullWidth
            variant="standard"
            multiline={false}
          />
          <TextField
            margin="none"
            label={"Aralık bitişi (YYYY-MM-DD)"}
            value={userEndDate}
            onChange={(e) => setUserEndDate(e.target.value)}
            type="email"
            fullWidth
            variant="standard"
            multiline={false}
          />
        </div>
        <p>Lütfen şehir seçiniz.</p>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {"Şehir seçiniz"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={"City"}
            label={"Şehir"}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {Cities?.map((city, index) => (
              <MenuItem key={index} value={city.id}>
                {city?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <p>Lütfen ürün seçiniz.</p>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {"Ürün seçiniz"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={"Product"}
            label={"Ürün"}
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            {products?.map((product, index) => (
              <MenuItem key={index} value={product._id}>
                {product?.title?.tr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button onClick={handleDone} color="primary" variant="contained">
        Sıradaki
      </Button>
    </div>
  );
};

export default Filters;
