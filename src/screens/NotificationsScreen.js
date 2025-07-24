import React, { useEffect, useState } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import AddEdit from "../components/AddEdit";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = {
  get: "/get_all_notifications",
  add: "/send_notifications",
  //update: "/update_notification",
  //delete: "/delete_notification",
  options: "/get_all_campaigns",
};

const NotificationsScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  //Values
  const [titleTR, setTitleTR] = useState("");
  const [titleEN, setTitleEN] = useState("");
  const [titleGR, setTitleGR] = useState("");
  const [titleAR, setTitleAR] = useState("");
  const [messageTR, setMessageTR] = useState("");
  const [messageEN, setMessageEN] = useState("");
  const [messageGR, setMessageGR] = useState("");
  const [messageAR, setMessageAR] = useState("");
  const [campaign, setCampaign] = useState("");
  //Filters
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchDatas();
    fetchOptions();
  }, [editOpen]);

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
        setFilteredData(response.data.data);
      }
    } catch (err) {
      setLoading(false);
      // TODO: Errorhandling..
    }
  };

  const fetchOptions = async () => {
    try {
      let parameters = {};
      const response = await axiosPrivate.post(
        APIS.options,
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
        setOptions(response.data.data);
      }
    } catch (err) {
      // TODO: Errorhandling..
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      let parameters = {
        title: { tr: titleTR, en: titleEN, gr: titleGR, ar: titleAR },
        message: {
          tr: messageTR,
          en: messageEN,
          gr: messageGR,
          ar: messageAR,
        },
        campaign_id: campaign,
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

  const resetValues = (item) => {
    setTitleTR(item === undefined ? "" : item.title.tr);
    setTitleEN(item === undefined ? "" : item.title.en);
    setTitleGR(item === undefined ? "" : item.title.gr);
    setTitleAR(item === undefined ? "" : item.title.ar);
    setMessageTR(item === undefined ? "" : item.message.tr);
    setMessageEN(item === undefined ? "" : item.message.en);
    setMessageGR(item === undefined ? "" : item.message.gr);
    setMessageAR(item === undefined ? "" : item.message.ar);
    setCampaign(item === undefined ? "" : item.campaign_id);
  };

  const values = [
    {
      title: "Başlık (Türkçe)",
      value: "title.tr",
      type: "textinput",
      state: titleTR,
      setState: setTitleTR,
    },
    {
      title: "Başlık (İngilizce)",
      value: "title.en",
      not_visible: true,
      type: "textinput",
      state: titleEN,
      setState: setTitleEN,
    },
    {
      title: "Başlık (Yunanca)",
      value: "title.gr",
      not_visible: true,
      type: "textinput",
      state: titleGR,
      setState: setTitleGR,
    },
    {
      title: "Başlık (Arapça)",
      value: "title.ar",
      not_visible: true,
      type: "textinput",
      state: titleAR,
      setState: setTitleAR,
    },
    {
      title: "Mesaj (Türkçe)",
      value: "message.tr",
      type: "textinput",
      state: messageTR,
      setState: setMessageTR,
    },
    {
      title: "Mesaj (İngilizce)",
      value: "message.en",
      not_visible: true,
      type: "textinput",
      state: messageEN,
      setState: setMessageEN,
    },
    {
      title: "Mesaj (Yunanca)",
      value: "message.gr",
      not_visible: true,
      type: "textinput",
      state: messageGR,
      setState: setMessageGR,
    },
    {
      title: "Mesaj (Arapça)",
      value: "message.ar",
      not_visible: true,
      type: "textinput",
      state: messageAR,
      setState: setMessageAR,
    },
    {
      title: "Kampanya",
      value: "campaign_id",
      not_visible: true,
      type: "choiceinput",
      state: campaign,
      setState: setCampaign,
      options: options,
      option_title: "title.tr",
    },
  ];

  return (
    <PanelContainer data={filteredData} values={values}>
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
        />
      ) : (
        <>
          <PageTitle
            title={"Bildirimler"}
            notification={true}
            total={filteredData.length}
            onPress={() => {
              resetValues();
              setEdit(true);
              setEditOpen(true);
            }}
          />
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

export default NotificationsScreen;
