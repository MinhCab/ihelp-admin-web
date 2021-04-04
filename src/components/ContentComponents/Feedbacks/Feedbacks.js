import { makeStyles } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'

import axios from '../../../api/axios'
import AlertSnackbar from '../../FullLayout/UI/AlertSnackbar/AlertSnackbar'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: 20,
    }
}))

const columns = [
    { field: 'createdDate', headerName: 'Created from', width: 150 },
    { field: 'email', headerName: 'Author email', width: 250 },
    { field: 'comment', headerName: 'Feedback content', width: 800 },
    { field: 'rating', headerName: 'Rating', width: 150 },
    { field: 'status', headerName: 'Status', width: 100,
        renderCell: (params) => {
          return <p>{params.value.name}</p>;
        }
    },
]

// const feedbacks = [
//   {
//     id: 'F_001',
//     createDate: "10/10/2020",
//     email: "minhcab19345@gmail.com",
//     content:
//       "Đây là review về Tai nghe tws Baseus Encok W09 đỏ của mình. Mình mua nó với giá 375000. Hi vọng phần review sẽ hữu ích cho bạn nào muốn mua nhé, nếu bạn có câu hỏi gì thì hãy comment vô bài này nha.",
//     status: {
//       id: 1,
//       name: "Pending",
//     },
//   },
//   {
//     id: 'F_002',
//     createDate: "10/10/2020",
//     email: "minhcab19345@gmail.com",
//     content:
//       "Đây là review về Tai nghe tws Baseus Encok W09 đỏ của mình. Mình mua nó với giá 375000. Hi vọng phần review sẽ hữu ích cho bạn nào muốn mua nhé, nếu bạn có câu hỏi gì thì hãy comment vô bài này nha.",
//     status: {
//       id: 1,
//       name: "Pending",
//     },
//   },
//   {
//     id: 'F_003',
//     createDate: "10/10/2020",
//     email: "minhcab19345@gmail.com",
//     content:
//       "Đây là review về Tai nghe tws Baseus Encok W09 đỏ của mình. Mình mua nó với giá 375000. Hi vọng phần review sẽ hữu ích cho bạn nào muốn mua nhé, nếu bạn có câu hỏi gì thì hãy comment vô bài này nha.",
//     status: {
//       id: 1,
//       name: "Pending",
//     },
//   },
//   {
//     id: 'F_004',
//     createDate: "10/10/2020",
//     email: "minhcab19345@gmail.com",
//     content:
//       "Đây là review về Tai nghe tws Baseus Encok W09 đỏ của mình. Mình mua nó với giá 375000. Hi vọng phần review sẽ hữu ích cho bạn nào muốn mua nhé, nếu bạn có câu hỏi gì thì hãy comment vô bài này nha.",
//     status: {
//       id: 1,
//       name: "Pending",
//     },
//   },
// ];

const Feedbacks = (props) => {
    const classes = useStyles()
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const handleFeedbackClicked = (event) => {
      props.feedbackDetails(event.row)
    }

    const handleCloseErrorSnackbar = () => {
        setOpenErrorSnackbar(false)
    }

    useEffect(() => {
        if (!loading) {
            setLoading(true);
            axios.get("/api/feedbacks/" + props.type + "/" + props.id)
            .then(res => {
                console.log(res.data)
                setFeedbacks(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err.message)
                setError('Feedbacks error: Cannot get information from server, please try again later')
                setOpenErrorSnackbar(true)
                setLoading(false)
            })
        }
    }, [])

    let showErrorSnackbar = null
    if(openErrorSnackbar) {
        <AlertSnackbar
          isOpen={openErrorSnackbar}
          close={handleCloseErrorSnackbar}
          alertType="error"
          message={error}
        />;
    }

    return (
        <div className={classes.root}>
            <DataGrid
              rows={feedbacks}
              columns={columns}
              pageSize={10}
              autoHeight
              loading={loading}
              onRowClick={(rows) => handleFeedbackClicked(rows)}
            />
            {showErrorSnackbar}
        </div>
    )
}

export default Feedbacks
