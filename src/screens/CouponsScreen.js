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
  get: "/get_all_coupons",
  add: "/add_coupon",
  delete: "/delete_coupon",
  get_products: "/get_all_products",
  get_branches: "/get_all_branches",
};

const CouponsScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
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
  const [productId, setProductId] = useState(null);

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

  const values = [
    {
      title: "Kod",
      value: "code",
      type: "textinput",
    },
    {
      title: "Kullanım Sınırı",
      value: "usage_amount",
      type: "textinput",
    },
    {
      title: "Tür",
      value: "type",
      type: "textinput",
      is_discount_type: true,
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

  const handleAdd = async () => {
    setLoading(true);
    try {
      let parameters = {
        name: name,
        code: code,
        usage_amount: usageAmount,
        usage_frequency: usageFrequency,
        branch_id: branchId,
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

  return (
    <PanelContainer>
      {loading ? (
        <Loading />
      ) : shown ? (
        <DiscountScreen
          isCoupon={true}
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
          onDone={handleAdd}
        />
      ) : (
        <>
          <PageTitle
            title={"Kuponlar"}
            total={total}
            coupon={true}
            onPress={() => setShown(true)}
          />
          <Table values={values} data={data} loading={false} />
        </>
      )}
    </PanelContainer>
  );
};

export default CouponsScreen;