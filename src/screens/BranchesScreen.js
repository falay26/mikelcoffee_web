import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import AddEdit from "../components/AddEdit";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = {
  get: "/get_all_branches",
  add: "/add_branch",
  update: "/update_branch",
  delete: "/delete_branch",
};

const BranchesScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [workingHours00, setWorkingHours00] = useState();
  const [workingHours01, setWorkingHours01] = useState();
  const [workingHours10, setWorkingHours10] = useState();
  const [workingHours11, setWorkingHours11] = useState();
  const [workingHours20, setWorkingHours20] = useState();
  const [workingHours21, setWorkingHours21] = useState();
  const [workingHours30, setWorkingHours30] = useState();
  const [workingHours31, setWorkingHours31] = useState();
  const [workingHours40, setWorkingHours40] = useState();
  const [workingHours41, setWorkingHours41] = useState();
  const [workingHours50, setWorkingHours50] = useState();
  const [workingHours51, setWorkingHours51] = useState();
  const [workingHours60, setWorkingHours60] = useState();
  const [workingHours61, setWorkingHours61] = useState();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [getir, setGetir] = useState("");
  const [yemek, setYemek] = useState("");
  const [token, setToken] = useState("");

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

  const handleAdd = async () => {
    setLoading(true);
    try {
      let parameters = {
        name: name,
        address: address,
        city: city,
        phone: phone,
        working_hours: [
          workingHours00,
          workingHours01,
          workingHours10,
          workingHours11,
          workingHours20,
          workingHours21,
          workingHours30,
          workingHours31,
          workingHours40,
          workingHours41,
          workingHours50,
          workingHours51,
          workingHours60,
          workingHours61,
        ],
        latitude: latitude,
        longitude: longitude,
        getir: getir,
        yemek: yemek,
        token: token,
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
        setEditOpen(false);
        fetchDatas();
      }
    } catch (err) {
      setLoading(false);
      alert("Bir sorun oluştu, lütfen tekrar deneyiniz.");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let parameters = {
        branch_id: id,
        name: name,
        address: address,
        city: city,
        phone: phone,
        working_hours: [
          workingHours00,
          workingHours01,
          workingHours10,
          workingHours11,
          workingHours20,
          workingHours21,
          workingHours30,
          workingHours31,
          workingHours40,
          workingHours41,
          workingHours50,
          workingHours51,
          workingHours60,
          workingHours61,
        ],
        latitude: latitude,
        longitude: longitude,
        getir: getir,
        yemek: yemek,
        token: token,
      };
      const response = await axiosPrivate.post(
        APIS.update,
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
        setEditOpen(false);
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
        branch_id: id,
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

  const resetValues = (item) => {
    if (item !== undefined) {
      setId(item._id);
    }
    setName(item === undefined ? "" : item.name);
    setAddress(item === undefined ? "" : item.address);
    setCity(item === undefined ? "" : item.city);
    setPhone(item === undefined ? "" : item.phone);
    setWorkingHours00(item === undefined ? "" : item.working_hours[0]);
    setWorkingHours01(item === undefined ? "" : item.working_hours[1]);
    setWorkingHours10(item === undefined ? "" : item.working_hours[2]);
    setWorkingHours11(item === undefined ? "" : item.working_hours[3]);
    setWorkingHours20(item === undefined ? "" : item.working_hours[4]);
    setWorkingHours21(item === undefined ? "" : item.working_hours[5]);
    setWorkingHours30(item === undefined ? "" : item.working_hours[6]);
    setWorkingHours31(item === undefined ? "" : item.working_hours[7]);
    setWorkingHours40(item === undefined ? "" : item.working_hours[8]);
    setWorkingHours41(item === undefined ? "" : item.working_hours[9]);
    setWorkingHours50(item === undefined ? "" : item.working_hours[10]);
    setWorkingHours51(item === undefined ? "" : item.working_hours[11]);
    setWorkingHours60(item === undefined ? "" : item.working_hours[12]);
    setWorkingHours61(item === undefined ? "" : item.working_hours[13]);
    setLatitude(item === undefined ? "" : item.latitude);
    setLongitude(item === undefined ? "" : item.longitude);
    setGetir(item === undefined ? "" : item.getir);
    setYemek(item === undefined ? "" : item.yemek);
    setToken(item === undefined ? "" : item.token);
  };

  const values = [
    {
      title: "İsim",
      value: "name",
      type: "textinput",
      state: name,
      setState: setName,
    },
    {
      title: "Adres",
      value: "address",
      type: "textinput",
      state: address,
      setState: setAddress,
    },
    {
      title: "Şehir",
      value: "city",
      type: "textinput",
      not_visible: true,
      state: city,
      setState: setCity,
    },
    {
      title: "Telefon",
      value: "phone",
      is_phone: true,
      type: "textinput",
      state: phone,
      setState: setPhone,
    },
    {
      title: "Çalışma Saateri",
      value: "working_hours",
      type: "working_hours",
      not_visible: true,
      states: [
        workingHours00,
        workingHours01,
        workingHours10,
        workingHours11,
        workingHours20,
        workingHours21,
        workingHours30,
        workingHours31,
        workingHours40,
        workingHours41,
        workingHours50,
        workingHours51,
        workingHours60,
        workingHours61,
      ],
      setStates: [
        setWorkingHours00,
        setWorkingHours01,
        setWorkingHours10,
        setWorkingHours11,
        setWorkingHours20,
        setWorkingHours21,
        setWorkingHours30,
        setWorkingHours31,
        setWorkingHours40,
        setWorkingHours41,
        setWorkingHours50,
        setWorkingHours51,
        setWorkingHours60,
        setWorkingHours61,
      ],
    },
    {
      title: "Enlem",
      value: "latitude",
      type: "textinput",
      state: latitude,
      setState: setLatitude,
    },
    {
      title: "Boylam",
      value: "longitude",
      type: "textinput",
      state: longitude,
      setState: setLongitude,
    },
    {
      title: "Getir Linki",
      value: "getir",
      type: "textinput",
      not_visible: true,
      state: getir,
      setState: setGetir,
    },
    {
      title: "Yemeksepeti Linki",
      value: "yemek",
      type: "textinput",
      not_visible: true,
      state: yemek,
      setState: setYemek,
    },
    {
      title: "Simpra Token",
      value: "token",
      type: "textinput",
      not_visible: true,
      state: token,
      setState: setToken,
    },
    {
      title: "Düzenle/Sil",
      value: null,
      is_edit: true,
    },
  ];

  return (
    <PanelContainer>
      {loading ? (
        <Loading />
      ) : editOpen ? (
        <AddEdit
          goBack={() => {
            setEditOpen(false);
          }}
          values={values}
          edit={edit}
          onEditPress={handleAdd}
          onUpdatePress={handleUpdate}
        />
      ) : (
        <>
          <PageTitle
            title={"Şubeler"}
            branch={true}
            total={data.length}
            onPress={() => {
              resetValues();
              setEdit(true);
              setEditOpen(true);
            }}
          />
          <Table
            values={values}
            data={data}
            loading={false}
            onEdit={(item) => {
              resetValues(item);
              setEdit(false);
              setEditOpen(true);
            }}
            onDelete={() => deleteHandler()}
            setId={setId}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default BranchesScreen;
