/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import Loading from "../components/Loading";
import DiscountScreen from "../components/Discount/DiscountScreen";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = {
  get: "/get_all_lucks",
  add: "/add_luck",
  delete: "/delete_luck",
  get_products: "/get_all_products",
  get_branches: "/get_all_branches",
  get_admin: "/get_admin_controls",
  update_admin: "/update_admin_controls",
};

const LucksScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [id, setId] = useState();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //Discounts
  const [shown, setShown] = useState(false);
  const [branches, setBranches] = useState([]);
  const [code, setCode] = useState("");
  const [usageAmount, setUsageAmount] = useState("");
  const [usageFrequency, setUsageFrequency] = useState("");
  const [branchId, setBranchId] = useState("");
  const [dayId, setDayId] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [email, setEmail] = useState("");
  const [minPayment, setMinPayment] = useState("");
  const [discountIndex, setDiscountIndex] = useState(null);
  const [discountUsers, setDiscountUsers] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [chance, setChance] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [minLimit, setMinLimit] = useState("");
  const [percent, setPercent] = useState("");
  const [amount, setAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);
  //Lucks
  const [settingsOpen, setSettingOpen] = useState(true);
  const [luckType, setLuckType] = useState("0");
  const [luckFrequency, setLuckfrequency] = useState("");
  const [luckOpen, setLuckOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [saveOpen, setSaveOpen] = useState(false);

  useEffect(() => {
    if (discountIndex === null) {
      setShown(false);
    }
  }, [discountIndex]);

  useEffect(() => {
    fetchDatas();
    fetchDatas1();
    fetchDatas2();
  }, []);

  useEffect(() => {
    if (admin !== null) {
      let result =
        luckType === admin.luck_type &&
        luckFrequency === admin.luck_frequency &&
        luckOpen === admin.luck_open;
      setSaveOpen(!result);
    }
  }, [luckType, luckFrequency, luckOpen, admin]);

  const fetchDatas = async () => {
    setLoading(true);
    try {
      let parameters = {};
      const response = await axiosPrivate.post(
        APIS.get,
        JSON.stringify(parameters),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (err) {
      setLoading(false);
      // TODO: Errorhandling..
    }
  };

  const fetchDatas1 = async () => {
    setLoading(true);
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
      setLoading(false);
      if (response.status === 200) {
        setBranches(response.data.data);
      }
    } catch (err) {
      setLoading(false);
      // TODO: Errorhandling..
    }
  };

  const fetchDatas2 = async () => {
    setLoading(true);
    try {
      let parameters = {};
      const response = await axiosPrivate.post(
        APIS.get_admin,
        JSON.stringify(parameters),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      if (response.status === 200) {
        setLuckType(response.data.data.luck_type);
        setLuckfrequency(response.data.data.luck_frequency);
        setLuckOpen(response.data.data.luck_open);
        setAdmin(response.data.data);
      }
    } catch (err) {
      setLoading(false);
      // TODO: Errorhandling..
    }
  };

  const values = [
    {
      title: "Ad",
      value: "name",
      type: "textinput",
    },
    {
      title: "Sil",
      value: null,
      is_delete: true,
    },
  ];

  const getProducts = async () => {
    setProductsLoading(true);
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
      setProductsLoading(false);
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (err) {
      //alert(err);
      setProductsLoading(false);
      // TODO: Errorhandling..
    }
  };

  const handleDone = async () => {
    setLoading(true);
    try {
      let parameters = {
        name: name,
        description: description,
        chance: chance,
        filters: {
          branch_id: branchId,
          day_id: dayId,
          start_hour: startHour,
          end_hour: endHour,
          email: email,
          min_payment: minPayment,
        },
        type: discountType,
        min_limit: minLimit,
        percent: percent,
        amount: amount,
        end_date: endDate,
        product_id: productId,
      };
      const response = await axiosPrivate.post(
        APIS.add,
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
        setShown(false);
        fetchDatas();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let parameters = {
        luck_type: luckType,
        luck_frequency: luckFrequency,
        luck_open: luckOpen,
      };
      const response = await axiosPrivate.post(
        APIS.update_admin,
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
        fetchDatas2();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  const deleteHandler = async () => {
    setLoading(true);
    try {
      let parameters = {
        luck_id: id,
      };
      const response = await axiosPrivate.post(
        APIS.delete,
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
        fetchDatas();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  return (
    <PanelContainer>
      {loading ? (
        <Loading />
      ) : settingsOpen ? (
        <div className="discount_container">
          <div>
            <div className="filter_row">
              <Button
                fullWidth
                onClick={() => setLuckType("1")}
                color="primary"
                variant={luckType === "1" ? "outlined" : "text"}
              >
                Kazı Kazan
              </Button>
              <Button
                fullWidth
                onClick={() => setLuckType("2")}
                color="primary"
                variant={luckType === "2" ? "outlined" : "text"}
              >
                Çark
              </Button>
              <Button
                fullWidth
                onClick={() => setLuckType("3")}
                color="primary"
                variant={luckType === "3" ? "outlined" : "text"}
              >
                Salla Kazan
              </Button>
            </div>
            <p>Lütfen oyunanabilme sıklığı giriniz.</p>
            <TextField
              margin="none"
              label={"Sıklık (Gün)"}
              value={luckFrequency}
              onChange={(e) => setLuckfrequency(e.target.value)}
              type="number"
              fullWidth
              variant="standard"
              multiline={false}
            />
            <FormControlLabel
              control={
                <Checkbox
                  margin="dense"
                  checked={luckOpen}
                  onChange={(e) => setLuckOpen(e.target.checked)}
                  fullWidth
                  variant="standard"
                />
              }
              label={"Açık/Kapalı"}
            />
            {saveOpen && (
              <Button
                onClick={handleUpdate}
                color="primary"
                variant="contained"
              >
                Kaydet
              </Button>
            )}
          </div>
          <Button
            onClick={() => setSettingOpen(false)}
            color="primary"
            variant="contained"
          >
            Bütün ödülleri gör
          </Button>
        </div>
      ) : shown ? (
        <DiscountScreen
          isLuck={true}
          setShown={setShown}
          branches={branches}
          branchId={branchId}
          setBranchId={setBranchId}
          dayId={dayId}
          setDayId={setDayId}
          startHour={startHour}
          setStartHour={setStartHour}
          endHour={endHour}
          setEndHour={setEndHour}
          email={email}
          setEmail={setEmail}
          minPayment={minPayment}
          setMinPayment={setMinPayment}
          code={code}
          setCode={setCode}
          usageAmount={usageAmount}
          setUsageAmount={setUsageAmount}
          usageFrequency={usageFrequency}
          setUsageFrequency={setUsageFrequency}
          index={discountIndex}
          setIndex={setDiscountIndex}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          chance={chance}
          setChance={setChance}
          discountType={discountType}
          setDiscountType={setDiscountType}
          minLimit={minLimit}
          setMinLimit={setMinLimit}
          percent={percent}
          setPercent={setPercent}
          amount={amount}
          setAmount={setAmount}
          endDate={endDate}
          setEndDate={setEndDate}
          productsLoading={productsLoading}
          products={products}
          productId={productId}
          setProductId={setProductId}
          onProductsSelected={getProducts}
          onDone={handleDone}
        />
      ) : (
        <>
          <PageTitle
            title={"Şanslar"}
            luck={true}
            onLuckPress={() => setSettingOpen(true)}
            onPress={() => {
              setShown(true);
              setDiscountIndex(0);
            }}
          />
          <Table
            values={values}
            data={data}
            loading={false}
            onDelete={() => deleteHandler()}
            setId={setId}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default LucksScreen;
