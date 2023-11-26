/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
//Components
import Pagination from "./Pagination";
import DeleteModal from "./Modals/DeleteModal";

const ItemReturner = ({ value, data, onEdit, setOpen, setId }) => {
  if (value.is_phone) {
    let formatted_phone_number =
      "+90 " +
      data[value.value].substring(0, 3) +
      " " +
      data[value.value].substring(3, 6) +
      " " +
      data[value.value].substring(6, 8) +
      " " +
      data[value.value].substring(8, 10);
    return <td>{formatted_phone_number}</td>;
  } else if (value.is_birth) {
    let formatted_date = data[value.value]?.split("T")[0];
    return <td>{formatted_date}</td>;
  } else if (value.is_gender) {
    let formatted_gender =
      data[value.value] === "0"
        ? "Bilinmiyor"
        : data[value.value] === "1"
        ? "Kadın"
        : "Erkek";
    return <td>{formatted_gender}</td>;
  } else if (value.is_image) {
    return (
      <td>
        <img
          className="product_image"
          src={data[value.value]}
          height="24"
          width="24"
        />
      </td>
    );
  } else if (value.is_category) {
    const category_returner = (id) => {
      if (id === "1") {
        return "Kahve";
      }
      if (id === "2") {
        return "İçecekler";
      }
      if (id === "3") {
        return "Atıştırmalıklar";
      }
      if (id === "4") {
        return "Tatlılar & Dondurma";
      }
      if (id === "5") {
        return "Fırın";
      }
      if (id === "6") {
        return "Barista";
      }
      if (id === "7") {
        return "Parekende";
      }
    };
    let formatted_category = category_returner(data[value.value]);
    return <td>{formatted_category}</td>;
  } else if (value.is_edit) {
    return (
      <td>
        <img
          className="edit_image"
          src={require("../images/edit_icon.png")}
          height="24"
          width="24"
          onClick={() => {
            onEdit(data);
          }}
        />
        <img
          className="delete_image"
          src={require("../images/red_trash.png")}
          height="24"
          width="24"
          onClick={() => {
            setId(data._id);
            setOpen(true);
          }}
        />
      </td>
    );
  } else if (value.is_story) {
    return (
      <td>
        <img
          className="story_image"
          src={data[value.value]}
          height="192"
          width="108"
        />
      </td>
    );
  } else if (value.is_campaign) {
    return (
      <td>
        <img
          className="campaign_image"
          src={data[value.value]}
          height="174"
          width="333"
          object-fit="contain"
        />
      </td>
    );
  } else if (value.is_active) {
    let is_past = (date) => {
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      if (date < now) {
        return true;
      } else {
        return false;
      }
    };
    let formatted_active = is_past(data[value.value]) ? "Değil" : "Aktif";
    return <td>{formatted_active}</td>;
  } else if (value.is_branch) {
    return <td>{data.branch_info[0].name}</td>;
  } else if (value.is_experience) {
    if (data[value.value] === "1") {
      return <td>Tecrübem var</td>;
    } else {
      return <td>Tecrübem yok</td>;
    }
  } else if (value.is_expense) {
    if (data[value.value] === "0") {
      return <td>6.000.000 TL</td>;
    } else  if (data[value.value] === "1") {
      return <td>10.000.000 TL</td>;
    } else {
      return <td>10.000.000 TL üstü</td>;
    }
  } else {
    return <td>{data[value.value]}</td>;
  }
};

const TableContainerUsers = ({
  values,
  data,
  loading,
  onEdit,
  onDelete,
  setId,
}) => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const data_per_page = 10;
  const indexOfLastData = currentPage * data_per_page;
  const indexOfFirstData = indexOfLastData - data_per_page;
  const currentDatas = data.slice(indexOfFirstData, indexOfLastData);

  return (
    <>
      <div className="table_container">
        {loading === true ? (
          <>Yükleniyor</>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {values.map((item) => {
                    if (item.not_visible) {
                      return null;
                    } else {
                      return <th>{item.title}</th>;
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {currentDatas.map((user) => (
                  <tr>
                    {values.map((item) => {
                      if (item.not_visible) {
                        return null;
                      } else {
                        return (
                          <ItemReturner
                            value={item}
                            data={user}
                            onEdit={onEdit}
                            setOpen={setOpen}
                            setId={setId}
                          />
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              dataPerPage={data_per_page}
              totalData={data.length}
              paginate={(index) => setCurrentPage(index)}
            />
          </>
        )}
      </div>
      <DeleteModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={() => {
          setOpen(false);
          onDelete();
        }}
      />
    </>
  );
};

export default TableContainerUsers;
