/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
//Components
import Pagination from "./Pagination";
import DeleteModal from "./Modals/DeleteModal";
//Helpers
import DataFormatter from "../helpers/DataFormatter";

const ItemReturner = ({ value, data, onEdit, setOpen, setId }) => {
  if (value.is_phone) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_birth) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_gender) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
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
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
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
  } else if (value.is_delete) {
    return (
      <td>
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
  } else if (value.is_show_lucks) {
    return (
      <td>
        <Button
          onClick={() => value.onPress(data)}
          color="primary"
          variant="outlined"
        >
          {"Ödülleri Gör"}
        </Button>
      </td>
    );
  } else if (value.is_only_edit) {
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
    return <td>{DataFormatter(data, value.doe_type)}</td>;
  } else if (value.is_experience) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_expense) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_subject) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_user) {
    return (
      <td>
        {DataFormatter(data[value.value], value.doe_type, value.user_title)}
      </td>
    );
  } else if (value.is_check_price) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_check_date) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_payment_type) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_gift) {
    if (data[value.value] === undefined || data[value.value] === "") {
      return (
        <td>
          <Button
            onClick={() => value.onPress(data)}
            color="primary"
            variant="outlined"
          >
            {"Hediye Gönder"}
          </Button>
        </td>
      );
    } else {
      return <td>{data[value.value]}</td>;
    }
  } else if (value.is_personel) {
    if (data[value.value]) {
      return (
        <td>
          <Button
            onClick={() => value.onPress(data)}
            color="primary"
            variant="outlined"
          >
            {"Kaldır"}
          </Button>
        </td>
      );
    } else {
      return (
        <td>
          <Button
            onClick={() => value.onPress(data)}
            color="primary"
            variant="outlined"
          >
            {"Ekle"}
          </Button>
        </td>
      );
    }
  } else if (value.is_discount_type) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_discount_users) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else if (value.is_luck) {
    if (data[value.condition]) {
      return <td>Boş Ödül</td>;
    } else {
      return <td>{data[value.value]}</td>;
    }
  } else if (value.is_luck_type) {
    return <td>{DataFormatter(data[value.value], value.doe_type)}</td>;
  } else {
    return <td>{DataFormatter(data, value.doe_type, null, value.value)}</td>;
  }
};

const FilterReturner = ({ filter }) => {
  if (filter?.type === "input") {
    return (
      <th>
        <TextField
          placeholder={filter.title}
          value={filter.state}
          onChange={(e) => filter.setState(e.target.value)}
          variant="standard"
        />
      </th>
    );
  } else if (filter?.type === "ages") {
    return (
      <th>
        <th>
          <TextField
            placeholder={filter.title}
            value={filter.state}
            onChange={(e) => filter.setState(e.target.value)}
            variant="standard"
          />
        </th>
        <th>
          <TextField
            placeholder={filter.title1}
            value={filter.state1}
            onChange={(e) => filter.setState1(e.target.value)}
            variant="standard"
          />
        </th>
      </th>
    );
  } else if (filter?.type === "choiceinput") {
    return (
      <th>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{filter.title}</InputLabel>
          <Select
            id={filter.title}
            label={filter.title}
            value={filter.state}
            onChange={(e) => filter.setState(e.target.value)}
          >
            {filter.options?.map((option, index) => (
              <MenuItem key={index} value={option._id}>
                {option[filter.option_title]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </th>
    );
  } else {
    return null;
  }
};

const TableContainerUsers = ({
  values,
  data,
  loading,
  onEdit,
  onDelete,
  setId,
  currentPage,
  setCurrentPage,
}) => {
  const [open, setOpen] = useState(false);

  const data_per_page = 10;
  const indexOfLastData = currentPage * data_per_page;
  const indexOfFirstData = indexOfLastData - data_per_page;
  const currentDatas = data.slice(indexOfFirstData, indexOfLastData);
  const has_filter = values.filter((i) => i?.filter !== undefined).length > 0;

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
                  {has_filter &&
                    values.map((item) => {
                      if (item?.filter === undefined && !item.not_visible) {
                        return <th></th>;
                      } else {
                        return <FilterReturner filter={item.filter} />;
                      }
                    })}
                </tr>
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
              currentPage={currentPage}
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
