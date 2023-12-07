import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = { get: "/get_all_users" };

const PanelScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //Filters
  const [filteredData, setFilteredData] = useState([]);
  const [emailFilter, setEmailFilter] = useState("");
  const [ageFilter0, setAgeFilter0] = useState("");
  const [ageFilter1, setAgeFilter1] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

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
      filter: {
        title: "Email",
        state: emailFilter,
        setState: setEmailFilter,
        type: "input",
      },
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
      filter: {
        title: "Min Yaş",
        title1: "Max Yaş",
        state: ageFilter0,
        setState: setAgeFilter0,
        state1: ageFilter1,
        setState1: setAgeFilter1,
        type: "ages",
      },
    },
    {
      title: "Cinsiyet",
      value: "gender_id",
      is_gender: true,
      filter: {
        title: "Cinsiyet",
        state: genderFilter,
        setState: setGenderFilter,
        type: "choiceinput",
        options: [
          { _id: "", name: "Hepsi" },
          { _id: "0", name: "Bilinmiyor" },
          { _id: "1", name: "Kadın" },
          { _id: "2", name: "Erkek" },
        ],
        option_title: "name",
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
    if (
      emailFilter === "" &&
      ageFilter0 === "" &&
      ageFilter1 === "" &&
      genderFilter === ""
    ) {
      setFilteredData(data);
    } else {
      let new_data = data;
      if (emailFilter !== "") {
        new_data = new_data.filter(
          (i) => i.email.toLowerCase().indexOf(emailFilter.toLowerCase()) > -1
        );
      }
      if (ageFilter0 !== "") {
        new_data = new_data.filter(
          (i) =>
            parseInt(i.birth_date.split("-")[0]) <
            parseInt(new Date().getFullYear()) - parseInt(ageFilter0)
        );
      }
      if (ageFilter1 !== "") {
        new_data = new_data.filter(
          (i) =>
            parseInt(i.birth_date.split("-")[0]) >
            parseInt(new Date().getFullYear()) - parseInt(ageFilter1)
        );
      }
      if (genderFilter !== "") {
        new_data = new_data.filter((i) => i.gender_id === genderFilter);
      }
      setFilteredData(new_data);
    }
  }, [data, emailFilter, ageFilter0, ageFilter1, genderFilter]);

  return (
    <PanelContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={"Üyeler"} total={filteredData.length} />
          <Table values={values} data={filteredData} loading={false} />
        </>
      )}
    </PanelContainer>
  );
};

export default PanelScreen;
