/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import Loading from "../components/Loading";
import DiscountScreen from "../components/Discount/DiscountScreen";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = {
  get: "/get_orders",
  get_products: "/get_all_products",
  get_branches: "/get_all_branches",
};

const IysScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
  const [discountType, setDiscountType] = useState("");
  const [minLimit, setMinLimit] = useState("");
  const [percent, setPercent] = useState("");
  const [amount, setAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (data.length !== 0) {
      let new_total = 0;
      data.map((i) => {
        new_total += parseFloat(JSON.parse(i.check).summary.unpaid_amount);
      });
      setTotal(new_total);
    }
  }, [data]);

  useEffect(() => {
    fetchDatas();
    fetchDatas1();
  }, []);

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
        //setData(response.data.data);
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

  const values = [
    {
      title: "Tür",
      value: "user_info",
    },
    {
      title: "Başlık",
      value: "user_info",
    },
    {
      title: "İçerik",
      value: "user_info",
    },
    {
      title: "Tarih",
      value: "check",
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

  return (
    <PanelContainer data={data} values={values} page_id="ileti yonetim">
      {loading ? (
        <Loading />
      ) : shown ? (
        <DiscountScreen
          isIys={true}
          setShown={setShown}
          setFilters={setFilters}
        />
      ) : (
        <>
          <PageTitle
            title={"İletiler"}
            total={total}
            iys={true}
            onPress={() => setShown(true)}
          />
          <Table
            values={values}
            data={data}
            loading={false}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default IysScreen;
