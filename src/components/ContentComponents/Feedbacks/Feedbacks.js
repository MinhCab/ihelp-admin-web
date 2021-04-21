import { makeStyles } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'

import axios from '../../../api/axios'
import { useAuth } from '../../../hoc/StoringAuth/AuthContext'
import { RejectReasonDialog } from '../../FullLayout/UI/AlertDialog/AlertDialog'
import AlertSnackbar from '../../FullLayout/UI/AlertSnackbar/AlertSnackbar'
import FeedbackDetails from './FeedbackDetails/FeedbackDetails'

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
    {
        field: 'status', headerName: 'Status', width: 100,
        renderCell: (params) => {
            return <p>{params.value.name}</p>;
        }
    },
]

// const feedbacks = [
//   {
//     id: "F_001",
//     createdDate: "10/10/2020",
//     email: "minhcab19345@gmail.com",
//     comment:
//       "Đây là review về Tai nghe tws Baseus Encok W09 đỏ của mình. Mình mua nó với giá 375000. Hi vọng phần review sẽ hữu ích cho bạn nào muốn mua nhé, nếu bạn có câu hỏi gì thì hãy comment vô bài này nha.",
//     rating: 5,
//     status: {
//       id: 2,
//       name: "Pending",
//     },
//   },
//   {
//     id: "F_002",
//     createdDate: "10/10/2020",
//     email: "minhcab19345@gmail.com",
//     comment:
//       "Đây là review về Tai nghe tws Baseus Encok W09 đỏ của mình. Mình mua nó với giá 375000. Hi vọng phần review sẽ hữu ích cho bạn nào muốn mua nhé, nếu bạn có câu hỏi gì thì hãy comment vô bài này nha.",
//     rating: 3,
//     status: {
//       id: 2,
//       name: "Pending",
//     },
//   },
//   {
//     id: "F_003",
//     createdDate: "10/10/2020",
//     email: "minhcab19345@gmail.com",
//     comment:
//       "Đây là review về Tai nghe tws Baseus Encok W09 đỏ của mình. Mình mua nó với giá 375000. Hi vọng phần review sẽ hữu ích cho bạn nào muốn mua nhé, nếu bạn có câu hỏi gì thì hãy comment vô bài này nha.",
//     rating: 5,
//     status: {
//       id: 2,
//       name: "Pending",
//     },
//   },
//   {
//     id: "F_004",
//     createdDate: "10/10/2020",
//     email: "minhcab19345@gmail.com",
//     comment:
//       "Đây là review về Tai nghe tws Baseus Encok W09 đỏ của mình. Mình mua nó với giá 375000. Hi vọng phần review sẽ hữu ích cho bạn nào muốn mua nhé, nếu bạn có câu hỏi gì thì hãy comment vô bài này nha.",
//     rating: 5,
//     status: {
//       id: 2,
//       name: "Pending",
//     },
//   },
// ];

const Feedbacks = (props) => {
    const classes = useStyles()
    const { user } = useAuth()
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [openAlertSnackbar, setOpenAlertSnackbar] = useState(false);
    const [alertType, setAlertType] = useState('')
    const [openFeedbackDetails, setOpenFeedbackDetails] = useState(false)
    const [feedbackDetails, setFeedbackDetails] = useState({})
    const [openRejectReasonDialog, setOpenRejectReasonDialog] = useState(false)
    const [page, setPage] = useState(0)
    const [totalItems, setTotalItems] = React.useState(0);

    const handleFeedbackClicked = (event) => {
        setFeedbackDetails(event.row)
        setOpenFeedbackDetails(true)
    }

    const handleCloseFeedbackDetails = () => {
        setFeedbackDetails(null);
        setOpenFeedbackDetails(false);
    };

    const handleCloseErrorSnackbar = () => {
        setOpenAlertSnackbar(false)
    }

    const pagingHandler = (params) => {
      setPage(params.page);
    };

    const loadAllFeedback = () => {
        if (!loading) {
            setLoading(true);
            axios.get("/api/feedbacks/" + props.type + "/" + props.id + "?page=" + page)
                .then(res => {
                    setFeedbacks(res.data.feedbacks)
                    setTotalItems(res.data.totalItems)
                    setLoading(false)
                }).catch(err => {
                    setLoading(false)
                })
        }
    }

    const handleApproveFeedback = (feedbackId) => {
        axios.put('/api/feedbacks/' + user.email + '/approve/' + feedbackId)
            .then(res => {
                setMessage(res.data)
                setAlertType('success')
                setOpenAlertSnackbar(true)
                setOpenFeedbackDetails(false)
                loadAllFeedback()
            }).catch(error => {
                setMessage(error.data)
                setAlertType('error')
                setOpenAlertSnackbar(true)
            })
    }

    const submitRejected = (reason, feedbackId) => {
        const rejectObject = {
            feedbackId: feedbackId,
            managerEmail: user.email,
            reason: reason
        };
        axios
            .put("/api/feedbacks/reject", rejectObject)
            .then((res) => {
                setMessage(res.data)
                setAlertType('success')
                setOpenAlertSnackbar(true)
                setOpenRejectReasonDialog(false)
                setOpenFeedbackDetails(false)
                loadAllFeedback()
            })
            .catch((error) => {
                setMessage(error.response.data.error);
                setAlertType("error");
                setOpenAlertSnackbar(true);
            });
    }

    const handleRejectFeedback = () => {
        setOpenRejectReasonDialog(true)
    }
    
    const handleCloseRejectReasonDialog = () => {
        setOpenRejectReasonDialog(false)
    }

    useEffect(() => {
        loadAllFeedback()
    }, [])

    let showErrorSnackbar = null
    if (openAlertSnackbar) {
        showErrorSnackbar = (<AlertSnackbar
            isOpen={openAlertSnackbar}
            close={handleCloseErrorSnackbar}
            alertType={alertType}
            message={message}
        />);
    }

    let showFeedbackDetails = null
    if (openFeedbackDetails) {
        showFeedbackDetails = (
            <FeedbackDetails
                isOpen={openFeedbackDetails}
                close={handleCloseFeedbackDetails}
                details={feedbackDetails}
                approveFeedback={handleApproveFeedback}
                rejectFeedback={handleRejectFeedback}
            />
        );
    }

    let showRejectReasonDialog = null
    if (openRejectReasonDialog) {
        showRejectReasonDialog = (<RejectReasonDialog 
            isOpen={openRejectReasonDialog}
            closing={handleCloseRejectReasonDialog}
            rejected={submitRejected}
            id={feedbackDetails.id}
        />)
    }

    return (
        <div className={classes.root}>
            <DataGrid
                rows={feedbacks}
                columns={columns}
                pageSize={10}
                onRowClick={(rows) => handleFeedbackClicked(rows)}
                pagination
                paginationMode="server"
                onPageChange={pagingHandler}
                rowCount={totalItems}
                autoHeight
                loading={loading}
            />
            {showErrorSnackbar}
            {showFeedbackDetails}
            {showRejectReasonDialog}
        </div>
    )
}

export default Feedbacks
