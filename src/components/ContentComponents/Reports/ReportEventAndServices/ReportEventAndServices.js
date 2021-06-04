import { DataGrid } from "@material-ui/data-grid";
import axios from "../../../../api/axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import ReportDetails from "../ReportDetails/ReportDetails";
import FilterLayout from "../../../FullLayout/UI/FilterLayout/FilterLayout";

const columns = [
  {
    field: "createdDate",
    headerName: "Created Date",
    width: 250,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>;
    },
  },
  { field: "email", headerName: "Author email", width: 250 },
  { field: "comment", headerName: "Comment content", width: 960 },
];

const ReportEventAndService = (props) => {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reportDetails, setReportDetails] = useState();
  const [openReportDetails, setOpenReportDetails] = useState(false);
  const [feedbackCategory, setFeedbackCategory] = useState()

  const showReportDetails = (event) => {
    setReportDetails(event.row);
    setOpenReportDetails(true);
  };

  const closeReportDetailsHandler = () => {
    setOpenReportDetails(false);
  };

  const pagingHandler = (params) => {
    setPage(params.page);
  };

  const filterAPI = (id) => {
    setFeedbackCategory(id)
  }

  const loadReports = () => {
    setReports([])
    axios
      .get("/api/feedbacks/" + props.type + "/" + props.id + "/category/" + feedbackCategory + "?page=" + page)
      .then((res) => {
        setTotalItems(res.data.totalItems);
        setReports(res.data.feedbacks);
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      loadReports()
    }
  }, [page, totalItems, feedbackCategory]);

  let showDetails = null;
  openReportDetails
    ? (showDetails = (
        <ReportDetails
          isOpen={openReportDetails}
          close={closeReportDetailsHandler}
          details={reportDetails}
        />
      ))
    : null;

  return (
    <>
      <div style={{ height: 650, width: "100%", padding: 20 }}>
        <FilterLayout type={`report${props.type}`} loadFilter={filterAPI} />
        <br/>
        <DataGrid
          rows={reports}
          columns={columns}
          pageSize={10}
          onRowClick={(rows) => showReportDetails(rows)}
          pagination
          paginationMode="server"
          onPageChange={pagingHandler}
          rowCount={totalItems}
          loading={loading}
          autoHeight
        />
      </div>
      {showDetails}
    </>
  );
};

export default ReportEventAndService;
