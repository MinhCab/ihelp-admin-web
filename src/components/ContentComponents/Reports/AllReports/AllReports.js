import { DataGrid } from '@material-ui/data-grid'
import axios from '../../../../api/axios'
import React, { useState, useEffect } from 'react'
import moment from 'moment';

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
  { field: "comment", headerName: "Comment content", width: 1000 },
];

const AllReports = (props) => {
    const [reports, setReports] = useState([])
    const [page, setPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)

    const showReportDetails = (event) => {
        props.showReportDetails(event.row)
    }

    const pagingHandler = (params) => {
      setPage(params.page);
    };

    useEffect(() => {
        if (!loading) {
          setLoading(true);
          axios
            .get("/api/feedbacks?page=" + page)
            .then((res) => {
              setTotalItems(res.data.totalItems);
              setReports(res.data.feedbacks);
              setLoading(false);
              console.log(res)
            })
            .catch((err) => {
              setLoading(false);
            });
        }
      }, [page, totalItems])
  
    return (
      <div style={{ height: 650, width: "100%", padding: 20  }}>
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
    );
}

export default AllReports
