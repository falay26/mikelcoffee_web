import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import Loading from "../components/Loading";
import DeleteModal1 from "../components/Modals/DeleteModal1";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = { get: "/get_all_users", change: "/change_personel" };

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
  const [personelFilter, setPersonelFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [open, setOpen] = useState("");

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
    {
      title: "Personel",
      value: "is_personel",
      is_personel: true,
      filter: {
        title: "Personel",
        state: personelFilter,
        setState: setPersonelFilter,
        type: "choiceinput",
        options: [
          { _id: "", name: "Hepsi" },
          { _id: true, name: "Personel" },
          { _id: false, name: "Değil" },
        ],
        option_title: "name",
      },
      onPress: (data) => {
        setOpen(true);
        setSelectedUser(data);
      },
    },
  ];

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
      //alert(err);
      setLoading(false);
      // TODO: Errorhandling..
    }
  };

  const handlePersonel = async () => {
    setLoading(true);
    try {
      let parameters = {
        user_id: selectedUser._id,
        personel: selectedUser.is_personel === true ? false : true,
      };
      const response = await axiosPrivate.post(
        APIS.change,
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
        setOpen(false);
        fetchDatas();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  //FilterEffect
  useEffect(() => {
    if (
      emailFilter === "" &&
      ageFilter0 === "" &&
      ageFilter1 === "" &&
      genderFilter === "" &&
      personelFilter === ""
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
      if (personelFilter !== "") {
        new_data = new_data.filter((i) => i.is_personel === personelFilter);
      }
      setFilteredData(new_data);
    }
  }, [data, emailFilter, ageFilter0, ageFilter1, genderFilter, personelFilter]);

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
      <DeleteModal1
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={() => {
          setOpen(false);
          handlePersonel();
        }}
      />
    </PanelContainer>
  );
};

export default PanelScreen;
