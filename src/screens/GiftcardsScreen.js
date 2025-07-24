/* eslint-disable react-hooks/exhaustive-deps */
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
  get: "/get_all_giftcards",
  add: "/add_giftcard",
  update: "/update_giftcard",
  delete: "/delete_giftcard",
};

const GiftcardsScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [id, setId] = useState();

  const [image, setImage] = useState("");
  const [titleTR, setTitleTR] = useState("");
  const [titleEN, setTitleEN] = useState("");
  const [titleGR, setTitleGR] = useState("");
  const [titleAR, setTitleAR] = useState("");
  const [subtitleTR, setSubtitleTR] = useState("");
  const [subtitleEN, setSubtitleEN] = useState("");
  const [subtitleGR, setSubtitleGR] = useState("");
  const [subtitleAR, setSubtitleAR] = useState("");

  useEffect(() => {
    fetchDatas();
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
        image: image,
        title: { tr: titleTR, en: titleEN, gr: titleGR, ar: titleAR },
        sub_title: {
          tr: subtitleTR,
          en: subtitleEN,
          gr: subtitleGR,
          ar: subtitleAR,
        },
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
        giftcard_id: id,
        image: image,
        title: { tr: titleTR, en: titleEN, gr: titleGR, ar: titleAR },
        sub_title: {
          tr: subtitleTR,
          en: subtitleEN,
          gr: subtitleGR,
          ar: subtitleAR,
        },
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
        giftcard_id: id,
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
    setImage(item === undefined ? "" : item.image);
    setTitleTR(item === undefined ? "" : item.title.tr);
    setTitleEN(item === undefined ? "" : item.title.en);
    setTitleGR(item === undefined ? "" : item.title.gr);
    setTitleAR(item === undefined ? "" : item.title.ar);
    setSubtitleTR(item === undefined ? "" : item.sub_title.tr);
    setSubtitleEN(item === undefined ? "" : item.sub_title.en);
    setSubtitleGR(item === undefined ? "" : item.sub_title.gr);
    setSubtitleAR(item === undefined ? "" : item.sub_title.ar);
  };

  const values = [
    {
      title: "Resim",
      value: "image",
      is_campaign: true,
      type: "imageinput",
      state: image,
      setState: setImage,
    },
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
      doe_type: "not_visible",
      type: "textinput",
      state: titleEN,
      setState: setTitleEN,
    },
    {
      title: "Başlık (Yunanca)",
      value: "title.gr",
      not_visible: true,
      doe_type: "not_visible",
      type: "textinput",
      state: titleGR,
      setState: setTitleGR,
    },
    {
      title: "Başlık (Arapça)",
      value: "title.ar",
      not_visible: true,
      doe_type: "not_visible",
      type: "textinput",
      state: titleAR,
      setState: setTitleAR,
    },
    {
      title: "Alt Başlık (Türkçe)",
      value: "sub_title.tr",
      type: "textinput",
      state: subtitleTR,
      setState: setSubtitleTR,
    },
    {
      title: "Alt Başlık (İngilizce)",
      value: "sub_title.en",
      doe_type: "not_visible",
      not_visible: true,
      type: "textinput",
      state: subtitleEN,
      setState: setSubtitleEN,
    },
    {
      title: "Alt Başlık (Yunanca)",
      value: "sub_title.gr",
      doe_type: "not_visible",
      not_visible: true,
      type: "textinput",
      state: subtitleGR,
      setState: setSubtitleGR,
    },
    {
      title: "Alt Başlık (Arapça)",
      value: "sub_title.ar",
      doe_type: "not_visible",
      not_visible: true,
      type: "textinput",
      state: subtitleAR,
      setState: setSubtitleAR,
    },
    {
      title: "Düzenle/Sil",
      value: null,
      doe_type: "not_visible",
      is_edit: true,
    },
  ];

  return (
    <PanelContainer data={data} values={values} page_id="hediye kartları">
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
            title={"Hediye Kartları"}
            giftcard={true}
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
            onDelete={deleteHandler}
            setId={setId}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default GiftcardsScreen;
