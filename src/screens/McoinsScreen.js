import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import AddEdit from "../components/AddEdit";
import Table from "../components/Table";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = { get: "/get_all_mcoins", update: "/update_mcoin" };

const McoinsScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [id, setId] = useState();

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [mcoin, setMcoin] = useState("");
  const [general, setGeneral] = useState("");

  const values = [
    {
      title: "Minumum (≥)",
      value: "min",
      type: "textinput",
      state: min,
      setState: setMin,
    },
    {
      title: "Maximum (<)",
      value: "max",
      type: "textinput",
      state: max,
      setState: setMax,
    },
    {
      title: "Kazanç",
      value: "mcoin",
      type: "textinput",
      state: mcoin,
      setState: setMcoin,
    },
    {
      title: "Genel Değer (TL)",
      value: "general_value",
      type: "textinput",
      state: general,
      setState: setGeneral,
    },
    {
      title: "Düzenle",
      value: null,
      is_only_edit: true,
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

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let parameters = {
        mcoin_id: id,
        min: min,
        max: max,
        mcoin_to_change: mcoin,
        general_value: general,
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
      console.log(response);
      if (response.status === 200) {
        setEditOpen(false);
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
    setMin(item === undefined ? "" : item.min);
    setMax(item === undefined ? "" : item.max);
    setMcoin(item === undefined ? "" : item.mcoin);
    setGeneral(item === undefined ? "" : item.general_value);
  };

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
          onUpdatePress={handleUpdate}
        />
      ) : (
        <>
          <PageTitle title={"Mcoinler"} total={data.length} />
          <Table
            values={values}
            data={data}
            loading={false}
            onEdit={(item) => {
              resetValues(item);
              setEdit(false);
              setEditOpen(true);
            }}
            setId={setId}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default McoinsScreen;
