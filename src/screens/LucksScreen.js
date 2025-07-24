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
  get_new: "/get_all_nlucks",
  add_new: "/add_nluck",
  delete_new: "/delete_nluck",
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNLuck, setSelectedNluck] = useState(null);
  const [dataOld, setDataOld] = useState([]);
  const [currentPageOld, setCurrentPageOld] = useState(1);
  //Discounts
  const [shown, setShown] = useState(false);
  const [newShown, setNewShown] = useState(false);
  const [branches, setBranches] = useState([]);
  const [code, setCode] = useState("");
  const [usageAmount, setUsageAmount] = useState("");
  const [usageFrequency, setUsageFrequency] = useState("");
  const [branchId, setBranchId] = useState([]);
  const [dayId, setDayId] = useState([]);
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [email, setEmail] = useState("");
  const [personel, setPersonel] = useState(false);
  const [student, setStudent] = useState(false);
  const [minPayment, setMinPayment] = useState("");
  const [discountIndex, setDiscountIndex] = useState(null);
  const [discountIndexOld, setDiscountIndexOld] = useState(null);
  const [finalDate, setFinalDate] = useState("");

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
  const [emptyLuck, setEmptyLuck] = useState(false);
  //Lucks
  const [luckType, setLuckType] = useState("0");
  const [luckAmount, setLuckAmount] = useState("");
  const [luckFrequency, setLuckfrequency] = useState("");
  const [luckOpen, setLuckOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [saveOpen, setSaveOpen] = useState(false);

  useEffect(() => {
    if (discountIndex === null) {
      setNewShown(false);
    }
  }, [discountIndex]);

  useEffect(() => {
    if (discountIndexOld === null) {
      setShown(false);
    }
  }, [discountIndexOld]);

  useEffect(() => {
    fetchDatasNew();
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

  const fetchDatasNew = async (checker) => {
    setLoading(true);
    try {
      let parameters = {};
      const response = await axiosPrivate.post(
        APIS.get_new,
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
        if (checker) {
          let new_nluck = response.data.data.filter(
            (i) => i._id.toString() === selectedNLuck._id.toString()
          )[0];
          setSelectedNluck(new_nluck);
          setDataOld(new_nluck.luck_ids);
        }
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
      title: "Tür",
      value: "luck_type",
      is_luck_type: true,
      doe_type: "is_luck_type",
    },
    {
      title: "Kullanım Sınırı",
      value: "usage_amount",
      type: "textinput",
    },
    {
      title: "Kullanım Sıklığı",
      value: "usage_frequency",
      type: "textinput",
    },
    {
      title: "Kullanıcı",
      value: "users",
      type: "textinput",
      is_discount_users: true,
      doe_type: "is_discount_users",
    },
    {
      title: "Tarih",
      value: "created_at",
      is_birth: true,
      doe_type: "is_birth",
    },
    {
      title: "Ödüller",
      value: null,
      doe_type: "not_visible",
      onPress: (val) => {
        setSelectedNluck(val);
        setDataOld(val.luck_ids);
      },
      is_show_lucks: true,
    },
    {
      title: "Sil",
      value: null,
      doe_type: "not_visible",
      is_delete: true,
    },
  ];

  const valuesOld = [
    {
      title: "İsim",
      value: "name",
    },
    {
      title: "Tür",
      value: "type",
      type: "textinput",
      is_discount_type: true,
      doe_type: "is_discount_type",
    },
    {
      title: "Kullanıcı",
      value: "users",
      type: "textinput",
      is_discount_users: true,
      doe_type: "is_discount_users",
    },
    {
      title: "Tarih",
      value: "created_at",
      is_birth: true,
      doe_type: "is_birth",
    },
    {
      title: "Sil",
      value: null,
      doe_type: "not_visible",
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
        product_ids: productId,
        empty: emptyLuck,
        nluck_id: selectedNLuck._id,
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
        fetchDatasNew(true);
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz!");
    }
  };

  const handleDoneNew = async () => {
    setLoading(true);
    try {
      let parameters = {
        name: name,
        description: description,
        filters: {
          branch_ids: branchId,
          day_id: dayId,
          start_hour: startHour,
          end_hour: endHour,
          email: email,
          personel: personel,
          student: student,
          min_payment: minPayment,
          product_ids: productId,
        },
        type: discountType,
        min_limit: minLimit,
        percent: percent,
        amount: amount,
        end_date: endDate,
        final_date: finalDate,
        max_mikel_time: endDate,
        luck_type: luckType,
        usage_amount: luckAmount,
        usage_frequency: luckFrequency,
      };
      const response = await axiosPrivate.post(
        APIS.add_new,
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
        setNewShown(false);
        fetchDatasNew();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz!");
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
        nluck_id: selectedNLuck._id,
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
        fetchDatasNew(true);
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  const deleteHandlerNew = async () => {
    setLoading(true);
    try {
      let parameters = {
        luck_id: id,
      };
      const response = await axiosPrivate.post(
        APIS.delete_new,
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
        fetchDatasNew();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  return (
    <PanelContainer
      /*
      data={selectedNLuck === null ? data : dataOld}
      values={selectedNLuck === null ? values : valuesOld}
      */
      data={data}
      values={values}
      page_id="şanslar"
    >
      {loading ? (
        <Loading />
      ) : newShown ? (
        <DiscountScreen
          isNewLuck={true}
          setShown={setNewShown}
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
          finalDate={finalDate}
          setFinalDate={setFinalDate}
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
          emptyLuck={emptyLuck}
          luckType={luckType}
          luckAmount={luckAmount}
          setLuckAmount={setLuckAmount}
          luckFrequency={luckFrequency}
          setLuckfrequency={setLuckfrequency}
          setLuckType={setLuckType}
          setEmptyLuck={setEmptyLuck}
          onDone={handleDoneNew}
        />
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
          personel={personel}
          setPersonel={setPersonel}
          student={student}
          setStudent={setStudent}
          minPayment={minPayment}
          setMinPayment={setMinPayment}
          code={code}
          setCode={setCode}
          usageAmount={usageAmount}
          setUsageAmount={setUsageAmount}
          usageFrequency={usageFrequency}
          setUsageFrequency={setUsageFrequency}
          index={discountIndexOld}
          setIndex={setDiscountIndexOld}
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
          emptyLuck={emptyLuck}
          setEmptyLuck={setEmptyLuck}
          onDone={handleDone}
        />
      ) : selectedNLuck === null ? (
        <>
          <PageTitle
            title={"Şans Oyunları"}
            luck={true}
            onPress={() => {
              setShown(false);
              setNewShown(true);
            }}
          />
          <Table
            values={values}
            data={data}
            loading={false}
            onDelete={() => deleteHandlerNew()}
            setId={setId}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <>
          <PageTitle
            title={"Şanslar"}
            luckOld={true}
            onPress={() => {
              setDiscountIndexOld(0);
              setNewShown(false);
              setShown(true);
            }}
            onBackPress={() => {
              setShown(false);
              setNewShown(false);
              setSelectedNluck(null);
            }}
          />
          <Table
            values={valuesOld}
            data={dataOld}
            loading={false}
            onDelete={() => deleteHandler()}
            setId={setId}
            currentPage={currentPageOld}
            setCurrentPage={setCurrentPageOld}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default LucksScreen;
