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
  get: "/get_all_campaigns",
  add: "/add_campaign",
  update: "/update_campaign",
  delete: "/delete_campaign",
  options: "/get_all_branches",
};

const CampaignsScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const [descriptionTR, setDescriptionTR] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [descriptionGR, setDescriptionGR] = useState("");
  const [descriptionAR, setDescriptionAR] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [branch, setBranch] = useState("");
  const [online, setOnline] = useState(false);
  //Filters
  const [filteredData, setFilteredData] = useState([]);
  const [startFilter, setStartFilter] = useState("");
  const [endFilter, setEndFilter] = useState("");

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
        image: image,
        title: { tr: titleTR, en: titleEN, gr: titleGR, ar: titleAR },
        subtitle: {
          tr: subtitleTR,
          en: subtitleEN,
          gr: subtitleGR,
          ar: subtitleAR,
        },
        description: {
          tr: descriptionTR,
          en: descriptionEN,
          gr: descriptionGR,
          ar: descriptionAR,
        },
        start_date: startDate,
        end_date: endDate,
        branch_id: branch,
        online: online,
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
        campaign_id: id,
        image: image,
        title: { tr: titleTR, en: titleEN, gr: titleGR, ar: titleAR },
        subtitle: {
          tr: subtitleTR,
          en: subtitleEN,
          gr: subtitleGR,
          ar: subtitleAR,
        },
        description: {
          tr: descriptionTR,
          en: descriptionEN,
          gr: descriptionGR,
          ar: descriptionAR,
        },
        start_date: startDate,
        end_date: endDate,
        branch_id: branch,
        online: online,
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
        campaign_id: id,
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
    setSubtitleTR(item === undefined ? "" : item.subtitle.tr);
    setSubtitleEN(item === undefined ? "" : item.subtitle.en);
    setSubtitleGR(item === undefined ? "" : item.subtitle.gr);
    setSubtitleAR(item === undefined ? "" : item.subtitle.ar);
    setDescriptionTR(item === undefined ? "" : item.description.tr);
    setDescriptionEN(item === undefined ? "" : item.description.en);
    setDescriptionGR(item === undefined ? "" : item.description.gr);
    setDescriptionAR(item === undefined ? "" : item.description.ar);
    setStartDate(item === undefined ? "" : item.start_date);
    setEndDate(item === undefined ? "" : item.end_date);
    setBranch(item === undefined ? "" : item.branch_id);
    setOnline(item === undefined ? false : item.online);
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
      title: "Alt Başlık (Türkçe)",
      value: "subtitle.tr",
      not_visible: true,
      type: "textinput",
      state: subtitleTR,
      setState: setSubtitleTR,
    },
    {
      title: "Alt Başlık (İngilizce)",
      value: "subtitle.en",
      not_visible: true,
      type: "textinput",
      state: subtitleEN,
      setState: setSubtitleEN,
    },
    {
      title: "Alt Başlık (Yunanca)",
      value: "subtitle.gr",
      not_visible: true,
      type: "textinput",
      state: subtitleGR,
      setState: setSubtitleGR,
    },
    {
      title: "Alt Başlık (Arapça)",
      value: "subtitle.ar",
      not_visible: true,
      type: "textinput",
      state: subtitleAR,
      setState: setSubtitleAR,
    },
    {
      title: "İçerik (Türkçe)",
      value: "description.tr",
      not_visible: true,
      type: "textinput",
      state: descriptionTR,
      setState: setDescriptionTR,
      multiline: true,
    },
    {
      title: "İçerik (İngilizce)",
      value: "description.en",
      not_visible: true,
      type: "textinput",
      state: descriptionEN,
      setState: setDescriptionEN,
      multiline: true,
    },
    {
      title: "İçerik (Yunanca)",
      value: "description.gr",
      not_visible: true,
      type: "textinput",
      state: descriptionGR,
      setState: setDescriptionGR,
      multiline: true,
    },
    {
      title: "İçerik (Arapça)",
      value: "description.ar",
      not_visible: true,
      type: "textinput",
      state: descriptionAR,
      setState: setDescriptionAR,
      multiline: true,
    },
    {
      title: "Başlangıç Tarihi",
      value: "start_date",
      is_birth: true,
      type: "dateselection",
      state: startDate,
      setState: setStartDate,
      filter: {
        title: "Başlangıç",
        state: startFilter,
        setState: setStartFilter,
        type: "input",
      },
    },
    {
      title: "Bitiş Tarihi",
      value: "end_date",
      is_birth: true,
      type: "dateselection",
      state: endDate,
      setState: setEndDate,
      filter: {
        title: "Son",
        state: endFilter,
        setState: setEndFilter,
        type: "input",
      },
    },
    {
      title: "Şube",
      value: "branch_id",
      not_visible: true,
      type: "choiceinput",
      state: branch,
      setState: setBranch,
      options: options,
      option_title: "name",
    },
    {
      title: "Getir Ve Yemeksepeti Linkleri",
      value: "online",
      not_visible: true,
      type: "checkbox",
      state: online,
      setState: setOnline,
    },
    {
      title: "Düzenle/Sil",
      value: null,
      is_edit: true,
    },
  ];

  //FilterEffect
  useEffect(() => {
    if (startFilter === "" && endFilter === "") {
      setFilteredData(data);
    } else {
      let new_data = data;
      if (startFilter !== "") {
        new_data = new_data.filter((i) => {
          var myDate = i.start_date?.split("T")[0];
          myDate = myDate?.split("-");
          var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
          var myDate0 = startFilter?.split("-");
          var newDate0 = new Date(myDate0[0], myDate0[1] - 1, myDate0[2]);
          return newDate >= newDate0;
        });
      }
      if (endFilter !== "") {
        new_data = new_data.filter((i) => {
          var myDate = i.end_date?.split("T")[0];
          myDate = myDate?.split("-");
          var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
          var myDate0 = endFilter?.split("-");
          var newDate0 = new Date(myDate0[0], myDate0[1] - 1, myDate0[2]);
          return newDate <= newDate0;
        });
      }
      setFilteredData(new_data);
    }
  }, [data, startFilter, endFilter]);

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
            title={"Postlar"}
            campaign={true}
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
            onEdit={(item) => {
              resetValues(item);
              setEdit(false);
              setEditOpen(true);
            }}
            onDelete={deleteHandler}
            setId={setId}
          />
        </>
      )}
    </PanelContainer>
  );
};

export default CampaignsScreen;
