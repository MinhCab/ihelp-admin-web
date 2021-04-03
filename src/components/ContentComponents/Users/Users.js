import { Card, CardHeader, Grid, CardContent, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router'

import axios from '../../../api/axios'
import AlertSnackbar from '../../FullLayout/UI/AlertSnackbar/AlertSnackbar'

const columns = [
    { field: 'createdDate', headerName: 'Create date', type: 'dateTime', width: 180,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'fullname', headerName: 'Name', width: 250 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'dateOfBirth', headerName: 'Birthdate', type: 'dateTime', width: 180,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    { field: 'balancePoint', headerName: 'Remaining points', width: 200 },
    { field: 'contributionPoint', headerName: 'Contribution points', width: 200 },
    { field: 'phone', headerName: 'Phone number', width: 160 },
]

const Users = () => {
    const history = useHistory()
    const [users, setUsers] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false)
    // const [page, setPage] = React.useState(0)
    // const [totalItems, setTotalItems] = React.useState(0)

    // React.useEffect(() => {
    //     axios.get('/api/services?page=' + page)
    //         .then(res => {
    //             setUsers(res.data.users)
    //             setTotalItems(res.data.totalItems)
    //             console.log(res.data)
    //         }).catch(err => {
    //             console.log(err.message)
    //         })
    // }, [page, totalItems])

    const setIdToUserList = (list) => {
        let count = 0
        const newArray = list.map(item => ({...item, id: count++}))
        console.log(newArray)
        setUsers(newArray)
    }

    const showUserDetails = (event) => {
        history.push('/home/users/' + event.row.email)
    }

    const handleCloseErrorSnackbar = () => {
        setOpenErrorSnackbar(false)
    }

    // const pagingHandler = (params) => {
    //     setPage(params.page)
    // }

    const createUserHandler = () => {
        history.push('/home/users/create')
    }

    React.useEffect(() => {
        if(!loading) {
        setLoading(true)
        axios
          .get("/accounts")
          .then((res) => {
            setIdToUserList(res.data);
            setLoading(false)
          })
          .catch((err) => {
            console.log('Cannot not get information from server, please try again later');
            setError(err.message)
            setOpenErrorSnackbar(true)
          });
        }
    }, [])

    let showErrorSnackbar = null
    openErrorSnackbar ? showErrorSnackbar = (<AlertSnackbar isOpen={openErrorSnackbar} close={handleCloseErrorSnackbar} message={error} alertType='error' />) : null

    return (
      <>
        <Card>
          <CardHeader
            title={
              <Grid container spacing={3}>
                <Grid item xs>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={createUserHandler}
                  >
                    Create
                  </Button>
                </Grid>
                <Grid item>
                  {/* <SearchBar 
                                value={search}
                                onChange={(event) => setSearch(event.value)}
                                onRequestSearch={handleSearchRequest}
                            /> */}
                </Grid>
              </Grid>
            }
          />
          <CardHeader
            titleTypographyProps={{ variant: "h4" }}
            title="Users"
            subheader="All of the users on iHelp system"
          />
          <CardContent>
            <div style={{ height: 650, width: "100%" }}>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={10}
                onRowClick={(rows) => showUserDetails(rows)}
                // pagination
                // paginationMode='server'
                // onPageChange={pagingHandler}
                // rowCount={totalItems}
                autoHeight
                loading={loading}
              />
            </div>
          </CardContent>
        </Card>
        {showErrorSnackbar}
      </>
    );
}

export default Users
