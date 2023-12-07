import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = { get: "/get_all_supports" };

const SupportsScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //Filters
  const [filteredData, setFilteredData] = useState([]);
  const [branchFilter, setBranchFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const values = [
    {
      title: "Şube",
      value: "branch_id",
      is_branch: true,
      filter: {
        title: "Şube İsmi",
        state: branchFilter,
        setState: setBranchFilter,
        type: "input",
      },
    },
    {
      title: "Konu",
      value: "subject_id",
      is_subject: true,
      filter: {
        title: "Konu",
        state: subjectFilter,
        setState: setSubjectFilter,
        type: "choiceinput",
        options: [
          { _id: "", name: "Hepsi" },
          { _id: "0", name: "Genel" },
          { _id: "1", name: "Hizmet Kalitesi" },
          { _id: "2", name: "Mikel Mobil Uygulaması" },
          { _id: "3", name: "Mikel Websitesi" },
          { _id: "4", name: "Ürün Hakkında" },
          { _id: "5", name: "Mağaza Geribildirimi" },
        ],
        option_title: "name",
      },
    },
    {
      title: "Mesaj",
      value: "text",
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
    if (branchFilter === "" && subjectFilter === "") {
      setFilteredData(data);
    } else {
      let new_data = data;
      if (branchFilter !== "") {
        new_data = new_data.filter(
          (i) =>
            i?.branch_info[0]?.name
              ?.toLowerCase()
              .indexOf(branchFilter.toLowerCase()) > -1
        );
      }
      if (subjectFilter !== "") {
        new_data = new_data.filter((i) => i?.subject_id === subjectFilter);
      }
      setFilteredData(new_data);
    }
  }, [data, branchFilter, subjectFilter]);

  return (
    <PanelContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={"Destekler"} total={filteredData.length} />
          <Table values={values} data={filteredData} loading={false} />
        </>
      )}
    </PanelContainer>
  );
};

export default SupportsScreen;
