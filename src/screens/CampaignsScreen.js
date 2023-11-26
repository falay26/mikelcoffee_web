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
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [branch, setBranch] = useState("");
  const [online, setOnline] = useState(false);

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
        title: title,
        subtitle: subtitle,
        description: description,
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
        title: title,
        subtitle: subtitle,
        description: description,
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
    setTitle(item === undefined ? "" : item.title);
    setSubtitle(item === undefined ? "" : item.subtitle);
    setDescription(item === undefined ? "" : item.description);
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
      title: "Başlık",
      value: "title",
      type: "textinput",
      state: title,
      setState: setTitle,
    },
    {
      title: "Alt Başlık",
      value: "subtitle",
      not_visible: true,
      type: "textinput",
      state: subtitle,
      setState: setSubtitle,
    },
    {
      title: "İçerik",
      value: "description",
      not_visible: true,
      type: "textinput",
      state: description,
      setState: setDescription,
      multiline: true,
    },
    {
      title: "Başlangıç Tarihi",
      value: "start_date",
      is_birth: true,
      type: "dateselection",
      state: startDate,
      setState: setStartDate,
    },
    {
      title: "Bitiş Tarihi",
      value: "end_date",
      is_birth: true,
      type: "dateselection",
      state: endDate,
      setState: setEndDate,
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
            title={"Kampanyalar"}
            campaign={true}
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
          />
        </>
      )}
    </PanelContainer>
  );
};

export default CampaignsScreen;
