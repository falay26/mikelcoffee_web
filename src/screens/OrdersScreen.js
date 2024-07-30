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
    },
    {
      title: "Soyad",
      value: "user_info",
      type: "textinput",
      user_title: "surname",
      is_user: true,
    },
    {
      title: "Email",
      value: "user_info",
      type: "textinput",
      user_title: "email",
      is_user: true,
    },
    {
      title: "Miktar",
      value: "check",
      type: "textinput",
      is_check_price: true,
    },
    {
      title: "Zaman",
      value: "check",
      type: "textinput",
      is_check_date: true,
    },
    {
      title: "Ödeme Türü",
      value: "paid_with",
      type: "textinput",
      is_payment_type: true,
    },
  ];

  return (
    <PanelContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={"Siparişler"} is_orders={true} total={total} />
          <Table values={values} data={data} loading={false} />
        </>
      )}
    </PanelContainer>
  );
};

export default OrdersScreen;
