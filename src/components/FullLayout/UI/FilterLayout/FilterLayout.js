import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";

const reportEventCateList = [
  { id: 3, name: "Report event" },
  { id: 1, name: "Report reject event" },
];

const reportServiceCateList = [
  { id: 4, name: "Report service" },
  { id: 2, name: "Report reject service" },
];

const FilterLayout = (props) => {
  const [categories, setCategories] = useState([]);

  const loadCategoriesForEventsAndServices = () => {
    axios
      .get("/api/" + props.type + "-categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const getId = (value) => {
    if (value) props.loadFilter(value.id);
    else props.loadFilter("");
  };

  useEffect(() => {
    if (props.type === "event" || props.type === "service") {
      loadCategoriesForEventsAndServices();
    } else if (props.type === "reportevent") {
      setCategories(reportEventCateList);
    } else if (props.type === "reportservice") {
      setCategories(reportServiceCateList);
    }
  }, []);

  let showComboBox = null;

  if (props.type === "event" || props.type === "service") {
    showComboBox = (
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => getId(value)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="outlined" />
        )}
      />
    );
  } else if (props.type === "reportevent") {
    showComboBox = (
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => getId(value)}
        defaultValue={{ id: 3, name: "Report event" }}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="outlined" />
        )}
      />
    );
  } else if (props.type === "reportservice") {
    showComboBox = (
      <Autocomplete
        options={categories}
        defaultValue={categories[0]}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => getId(value)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="outlined" />
        )}
      />
    );
  }

  return <>{showComboBox}</>;
};

export default FilterLayout;
