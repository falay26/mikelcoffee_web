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
  get: "/get_all_stories",
  add: "/add_story",
  update: "/update_story",
  delete: "/delete_story",
  options: "/get_all_campaigns",
  options1: "/get_all_branches",
};

const StoriesScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [id, setId] = useState();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [campaign, setCampaign] = useState("");
  const [branch, setBranch] = useState("");
  const [days, setDays] = useState("");

  useEffect(() => {
    fetchDatas();
    fetchOptions();
    fetchOptions1();
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

  const fetchOptions1 = async () => {
    try {
      let parameters = {};
      const response = await axiosPrivate.post(
        APIS.options1,
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
        setOptions1(response.data.data);
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
        campaign_id: campaign,
        branch_id: branch,
        days: days,
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
        story_id: id,
        image: image,
        title: title,
        subtitle: subtitle,
        campaign_id: campaign,
        branch_id: branch,
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
        story_id: id,
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
    setCampaign(item === undefined ? "" : item.campaign_id);
  };

  const values = [
    {
      title: "Resim",
      value: "image",
      is_story: true,
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
      title: "Kampanya",
      value: "campaign_id",
      not_visible: true,
      doe_type: "not_visible",
      type: "choiceinput",
      state: campaign,
      setState: setCampaign,
      options: options,
      option_title: "title.tr",
    },
    {
      title: "Şube",
      value: "branch_id",
      not_visible: true,
      doe_type: "not_visible",
      type: "choiceinput",
      state: branch,
      setState: setBranch,
      options: options1,
      option_title: "name",
    },
    {
      title: "Süre (Gün)",
      not_visible: true,
      value: "end_date",
      doe_type: "not_visible",
      type: "textinput",
      state: days,
      setState: setDays,
    },
    {
      title: "Düzenle/Sil",
      value: null,
      doe_type: "not_visible",
      is_edit: true,
    },
  ];

  return (
    <PanelContainer data={data} values={values} page_id="hikayeler">
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
            title={"Hikayeler"}
            story={true}
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

export default StoriesScreen;
