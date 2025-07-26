/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = {
  get: "/get_orders",
};

const OrdersScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  //Filters
  const [filteredData, setFilteredData] = useState([]);
  const [branchFilter, setBranchFilter] = useState("");
  const [ageFilter0, setAgeFilter0] = useState("");
  const [ageFilter1, setAgeFilter1] = useState("");
  const [payFilter, setPayFilter] = useState("");

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
  }, []);

  //FilterEffect
  useEffect(() => {
    if (
      branchFilter === "" &&
      ageFilter0 === "" &&
      ageFilter1 === "" &&
      payFilter === ""
    ) {
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
      if (ageFilter0 !== "" && ageFilter0.length === 10) {
        new_data = new_data.filter((i) => {
          const businessDate = JSON.parse(i.check)?.business_date;

          const businessDateParsed = new Date(businessDate);
          const ageFilterDate = new Date(ageFilter0);

          return businessDateParsed >= ageFilterDate;
        });
      }
      if (ageFilter1 !== "" && ageFilter1.length === 10) {
        new_data = new_data.filter((i) => {
          const businessDate = JSON.parse(i.check)?.business_date;

          const businessDateParsed = new Date(businessDate);
          const ageFilterDate = new Date(ageFilter1);

          return businessDateParsed <= ageFilterDate;
        });
      }
      if (payFilter !== "") {
        new_data = new_data.filter((i) => i.paid_with === payFilter);
      }
      if (new_data.length / 10 < currentPage) {
        setCurrentPage(1);
      }
      setFilteredData(new_data);
    }
  }, [data, branchFilter, ageFilter0, ageFilter1, payFilter]);

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

  const values = [
    {
      title: "Ad",
      value: "user_info",
      type: "textinput",
      user_title: "name",
      is_user: true,
      doe_type: "is_user",
    },
    {
      title: "Soyad",
      value: "user_info",
      type: "textinput",
      user_title: "surname",
      is_user: true,
      doe_type: "is_user",
    },
    {
      title: "Email",
      value: "user_info",
      type: "textinput",
      user_title: "email",
      is_user: true,
      doe_type: "is_user",
    },
    {
      title: "Şube",
      value: "branch_id",
      is_branch: true,
      doe_type: "is_branch",
      filter: {
        title: "Şube İsmi",
        state: branchFilter,
        setState: setBranchFilter,
        type: "input",
      },
    },
    {
      title: "Miktar",
      value: "check",
      type: "textinput",
      is_check_price: true,
      doe_type: "is_check_price",
    },
    {
      title: "Zaman",
      value: "check",
      type: "textinput",
      is_check_date: true,
      doe_type: "is_check_date",
      filter: {
        title: "Min Zaman",
        title1: "Max Zaman",
        state: ageFilter0,
        setState: setAgeFilter0,
        state1: ageFilter1,
        setState1: setAgeFilter1,
        type: "ages",
      },
    },
    {
      title: "Ödeme Türü",
      value: "paid_with",
      type: "textinput",
      is_payment_type: true,
      doe_type: "is_payment_type",
      filter: {
        title: "Ödeme Türü",
        state: payFilter,
        setState: setPayFilter,
        type: "choiceinput",
        options: [
          { _id: "", name: "Hepsi" },
          { _id: "cash", name: "Uygulama" },
          { _id: "mcoin", name: "Mikel Cup" },
          //{ _id: "balance", name: "Bakiye Yüklemesi" },
          { _id: "register", name: "Kasa" },
        ],
        option_title: "name",
      },
    },
  ];

  return (
    <PanelContainer data={filteredData} values={values} page_id="siparişler">
      {loading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={"Siparişler"} total={filteredData.length} />
          <Table
            values={values}
            data={filteredData}
            loading={false}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default OrdersScreen;
