import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = { get: "/get_all_franchises" };

const values = [
  {
    title: "Ad Soyad",
    value: "name",
  },
  {
    title: "Şehir",
    value: "city",
  },
  {
    title: "Telefon",
    value: "phone",
    is_phone: true,
  },
  {
    title: "Tecrübe",
    value: "experience_id",
    is_experience: true,
  },
  {
    title: "Detay",
    value: "details",
  },
  {
    title: "Miktar",
    value: "expense_id",
    is_expense: true,
  },
  {
    title: "Mesaj",
    value: "message",
  },
];

const FranchisesScreen = () => {
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
          <PageTitle title={"Başvurular"} total={data.length} />
          <Table values={values} data={data} loading={false} />
        </>
      )}
    </PanelContainer>
  );
};

export default FranchisesScreen;
