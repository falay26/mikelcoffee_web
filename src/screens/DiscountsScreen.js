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
  get: "/get_all_sales",
  add: "/add_sale",
  delete: "/delete_sale",
  get_products: "/get_all_products",
  get_branches: "/get_all_branches",
};

const DiscountsScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [id, setId] = useState();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  //Discounts
  const [shown, setShown] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState([]);
  const [dayId, setDayId] = useState([]);
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [email, setEmail] = useState("");
  const [personel, setPersonel] = useState(false);
  const [student, setStudent] = useState(false);
  const [minPayment, setMinPayment] = useState("");
  const [discountIndex, setDiscountIndex] = useState(null);
  const [discountUsers, setDiscountUsers] = useState([]);
  const [finalDate, setFinalDate] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [minLimit, setMinLimit] = useState("");
  const [percent, setPercent] = useState("");
  const [amount, setAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);

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
      title: "İsim",
      value: "name",
      type: "textinput",
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
        setDiscountIndex(null);
        fetchDatas();
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
        sale_id: id,
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
    <PanelContainer data={data} values={values} page_id="kampanyalar">
      {loading ? (
        <Loading />
      ) : shown ? (
        <DiscountScreen
          isDiscount={true}
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
          finalDate={finalDate}
          setFinalDate={setFinalDate}
          index={discountIndex}
          setIndex={setDiscountIndex}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
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
            title={"Kampanyalar"}
            total={total}
            discount={true}
            onPress={() => setShown(true)}
          />
          <Table
            values={values}
            data={data}
            loading={false}
            onDelete={() => deleteHandler()}
            setId={setId}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default DiscountsScreen;
