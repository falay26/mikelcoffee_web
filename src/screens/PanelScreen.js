import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = { get: "/get_all_users" };

const values = [
  {
    title: "Ad",
    value: "name",
  },
  {
    title: "Soyad",
    value: "surname",
  },
  {
    title: "Email",
    value: "email",
  },
  {
    title: "Telefon",
    value: "phone",
    is_phone: true,
  },
  {
    title: "Doğum Tarihi",
    value: "birth_date",
    is_birth: true,
  },
  {
    title: "Cinsiyet",
    value: "gender_id",
    is_gender: true,
  },
];

const PanelScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <PanelContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={"Üyeler"} total={data.length} />
          <Table values={values} data={data} loading={false} />
        </>
      )}
    </PanelContainer>
  );
};

export default PanelScreen;
