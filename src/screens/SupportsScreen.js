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
  get: "/get_all_supports",
  get_products: "/get_all_products",
  add_luck: "/add_luck_user",
};

const SupportsScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //Filters
  const [filteredData, setFilteredData] = useState([]);
  const [branchFilter, setBranchFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  //Discounts
  const [discountIndex, setDiscountIndex] = useState(null);
  const [discountUsers, setDiscountUsers] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [minLimit, setMinLimit] = useState("");
  const [percent, setPercent] = useState("");
  const [amount, setAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");

  const values = [
    {
      title: "Tarih",
      value: "created_at",
      is_birth: true,
    },
    {
      title: "Şube",
      value: "branch_id",
      is_branch: true,
      filter: {
        title: "Şube İsmi",
        state: branchFilter,
        setState: setBranchFilter,
        type: "input",
      },
    },
    {
      title: "Ad",
      value: "user_info",
      type: "textinput",
      user_title: "name",
      is_user: true,
    },
    {
      title: "Soyad",
      value: "user_info",
      type: "textinput",
      user_title: "surname",
      is_user: true,
    },
    {
      title: "Telefon",
      value: "user_info",
      type: "textinput",
      user_title: "phone",
      is_user: true,
    },
    {
      title: "Konu",
      value: "subject_id",
      is_subject: true,
      filter: {
        title: "Konu",
        state: subjectFilter,
        setState: setSubjectFilter,
        type: "choiceinput",
        options: [
          { _id: "", name: "Hepsi" },
          { _id: "0", name: "Genel" },
          { _id: "1", name: "Hizmet Kalitesi" },
          { _id: "2", name: "Mikel Mobil Uygulaması" },
          { _id: "3", name: "Mikel Websitesi" },
          { _id: "4", name: "Ürün Hakkında" },
          { _id: "5", name: "Mağaza Geribildirimi" },
        ],
        option_title: "name",
      },
    },
    {
      title: "Mesaj",
      value: "text",
    },
    {
      title: "Hediye",
      value: "",
      is_gift: true,
      onPress: (data) => {
        setDiscountType("");
        setMinLimit("");
        setPercent("");
        setAmount("");
        setEndDate("");
        setProducts([]);
        setProductId("");
        setDiscountIndex(0);
        setDiscountUsers(data.user_info[0]._id);
      },
    },
  ];

  useEffect(() => {
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
        //alert(err);
        setLoading(false);
        // TODO: Errorhandling..
      }
    };

    fetchDatas();
  }, []);

  //FilterEffect
  useEffect(() => {
    if (branchFilter === "" && subjectFilter === "") {
      setFilteredData(data);
    } else {
      let new_data = data;
      if (branchFilter !== "") {
        new_data = new_data.filter(
          (i) =>
            i?.branch_info[0]?.name
              ?.toLowerCase()
              .indexOf(branchFilter.toLowerCase()) > -1
        );
      }
      if (subjectFilter !== "") {
        new_data = new_data.filter((i) => i?.subject_id === subjectFilter);
      }
      setFilteredData(new_data);
    }
  }, [data, branchFilter, subjectFilter]);

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

  const addLuck = async () => {
    try {
      let parameters = {
        user_id: discountUsers,
        luck: {
          name: name,
          description: description,
          type: discountType,
          min_limit: minLimit,
          percent: percent,
          amount: amount,
          end_date: endDate,
          product_ids: productId,
        },
        from_admin: true,
      };
      const response = await axiosPrivate.post(
        APIS.add_luck,
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
        setDiscountIndex(null);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  return (
    <PanelContainer>
      {loading ? (
        <Loading />
      ) : discountIndex === null ? (
        <>
          <PageTitle title={"Destekler"} total={filteredData.length} />
          <Table values={values} data={filteredData} loading={false} />
        </>
      ) : (
        <DiscountScreen
          isSupport={true}
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
          onDone={addLuck}
        />
      )}
    </PanelContainer>
  );
};

export default SupportsScreen;
