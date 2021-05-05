import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  Card,
  CardContent,
  CardHeader,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import moment from "moment";

import axios from "../../../../api/axios";
import { useHistory } from "react-router-dom";

const additionalButtonTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#008c3a",
    },
    secondary: {
      main: "#039be5",
    },
  },
});

const additionalButtonTheme2 = createMuiTheme({
  palette: {
    primary: {
      main: "#4aedc4",
    },
  },
});

const columns = [
  {
    field: "createDate",
    headerName: "Create date",
    type: "dateTime",
    width: 230,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>;
    },
  },
  { field: "title", headerName: "Title", width: 250 },
  { field: "fullName", headerName: "Host name", width: 150 },
  { field: "authorEmail", headerName: "Host email", width: 180 },
  {
    field: "startDate",
    headerName: "Start date",
    width: 200,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>;
    },
  },
  {
    field: "endDate",
    headerName: "End date",
    width: 200,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>;
    },
  },
  { field: "spot", headerName: "Slots", width: 90 },
  {
    field: "onsite",
    headerName: "Type",
    width: 100,
    renderCell: (params) => {
      let showOnSite = params.value;
      if (showOnSite === true) {
        return (
          <Button variant="outlined" color="primary" size="small">
            On site
          </Button>
        );
      } else {
        return (
          <ThemeProvider theme={additionalButtonTheme}>
            <Button variant="outlined" color="secondary" size="small">
              Online
            </Button>
          </ThemeProvider>
        );
      }
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      let type = params.value;
      if (type.id === 3) {
        return (
          <ThemeProvider theme={additionalButtonTheme}>
            <Button variant="contained" color="primary" size="small">
              {type.name}
            </Button>
          </ThemeProvider>
        );
      } else if (type.id === 2) {
        return (
          <ThemeProvider theme={additionalButtonTheme}>
            <Button variant="contained" color="secondary" size="small">
              {type.name}
            </Button>
          </ThemeProvider>
        );
      } else if (type.id === 4) {
        return (
          <Button variant="contained" color="primary" size="small">
            {type.name}
          </Button>
        );
      } else if (type.id === 5) {
        return (
          <Button variant="contained" color="inherit" size="small">
            {type.name}
          </Button>
        );
      } else if (type.id === 6) {
        return (
          <Button variant="contained" color="secondary" size="small">
            {type.name}
          </Button>
        );
      } else {
        return (
          <ThemeProvider theme={additionalButtonTheme2}>
            <Button variant="contained" color="primary" size="small">
              {type.name}
            </Button>
          </ThemeProvider>
        );
      }
    },
  },
];

const JoinedEvents = (props) => {
  const history = useHistory();
  const account = props.email;
  const [events, setEvents] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const showEventDetails = (event) => {
    history.push("/home/events/details/" + event.row.id);
  };

  const pagingHandler = (params) => {
    setPage(params.page);
  };

  React.useEffect(() => {
    if (!loading) {
      setLoading(true);
      axios
        .get("/api/events/history/" + account + "?page=" + page)
        .then((res) => {
          setTotalItems(res.data.totalItems);
          setEvents(res.data.events);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [page, totalItems]);

  return (
    <>
      <Card>
        <CardHeader
          titleTypographyProps={{ variant: "h4" }}
          title="Joined Events"
          subheader="All of the joined events of this user"
        />
        <CardContent>
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={events}
              columns={columns}
              pageSize={10}
              onRowClick={(rows) => showEventDetails(rows)}
              pagination
              paginationMode="server"
              onPageChange={pagingHandler}
              rowCount={totalItems}
              autoHeight="true"
              loading={loading}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default JoinedEvents;
