import React, { useState, useEffect } from "react";
//Components
import PanelContainer from "../components/Layouts/PanelContainer";
import PageTitle from "../components/Admin/PageTitle";
import Table from "../components/Table";
import Loading from "../components/Loading";
//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const APIS = { get: "/get_all_franchises" };

const FranchisesScreen = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  //Filters
  const [filteredData, setFilteredData] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState("");
  const [expenseFilter, setExpenseFilter] = useState("");

  const values = [
    {
      title: "Ad Soyad",
      value: "name",
    },
    {
      title: "Şehir",
      value: "city",
    },
    {
      title: "Telefon",
      value: "phone",
      is_phone: true,
      doe_type: "is_phone",
    },
    {
      title: "Tecrübe",
      value: "experience_id",
      is_experience: true,
      doe_type: "is_experience",
      filter: {
        title: "Tecrübe",
        state: experienceFilter,
        setState: setExperienceFilter,
        type: "choiceinput",
        options: [
          { _id: "", name: "Hepsi" },
          { _id: "2", name: "Tecrübesiz" },
          { _id: "1", name: "Tecrübeli" },
        ],
        option_title: "name",
      },
    },
    {
      title: "Detay",
      value: "details",
    },
    {
      title: "Mesaj",
      value: "message",
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
    if (experienceFilter === "" && expenseFilter === "") {
      setFilteredData(data);
    } else {
      let new_data = data;
      if (experienceFilter !== "") {
        new_data = new_data.filter((i) => i.experience_id === experienceFilter);
      }
      if (expenseFilter !== "") {
        new_data = new_data.filter((i) => i.expense_id === expenseFilter);
      }
      setFilteredData(new_data);
    }
  }, [data, experienceFilter, expenseFilter]);

  return (
    <PanelContainer data={filteredData} values={values} page_id="başvurular">
      {loading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={"Başvurular"} total={filteredData.length} />
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

export default FranchisesScreen;
