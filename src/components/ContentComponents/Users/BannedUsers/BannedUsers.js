import { Card, CardHeader, Grid, CardContent, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router'
import ClearIcon from '@material-ui/icons/Clear';

import axios from '../../../../api/axios'
import AlertSnackbar from '../../../FullLayout/UI/AlertSnackbar/AlertSnackbar'

const columns = [
    { field: 'createdDate', headerName: 'Create date', type: 'dateTime', width: 160,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'fullName', headerName: 'Name', width: 230 },
    { field: 'gender', headerName: 'Gender', width: 120, 
      renderCell: (params) => {
        if(params.value) {
          return <p>Male</p>
        } else {
          return <p>Female</p>
        }
      }
    },
    { field: 'dateOfBirth', headerName: 'Birthdate', type: 'dateTime', width: 170,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        } 
    },
    { field: 'balancePoint', headerName: 'Remaining points', width: 170 },
    { field: 'contributionPoint', headerName: 'Contribution points', width: 170 },
    { field: 'phone', headerName: 'Phone number', width: 160 },
    { field: 'role', headerName: 'Role', width: 120,
      renderCell: (params) => {
        if(params.value.id === 'admin') {
          return (<Button variant='contained' color='primary'>Admin</Button>)
        } else if(params.value.id === 'user') {
          return (<Button variant='outlined' color='primary'>User</Button>)
        } else {
          return (<Button variant='contained' color='secondary'>Manager</Button>)
        }
      }
    }
]

const BannedUsers = () => {
    const history = useHistory()
    const [users, setUsers] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false)
    const [alertType, setAlertType] = React.useState('')
    const [page, setPage] = React.useState(0)
    const [totalItems, setTotalItems] = React.useState(0)
    const [search, setSearch] = React.useState('')
  
    const setIdToUserList = (list) => {
        let count = 0
        const newArray = list.map(item => ({...item, id: count++}))
        setUsers(newArray)
    }

    const showUserDetails = (event) => {
        history.push('/home/users/' + event.row.email)
    }

    const redirectToActiveUserPage = () => {
        history.goBack()
    }

    const handleCloseAlertSnackbar = () => {
        setOpenAlertSnackbar(false)
    }

    const pagingHandler = (params) => {
        setPage(params.page)
    }

    const searchHandler = (event) => {
      setSearch(event.target.value)
    }

    const clearSearchHandler = () => {
      setSearch('')
    }

    const searchAPI = () => {
      axios.get('/accounts/full_name/' + search + '?page=' + page + '&statusId=2')
      .then((res) => {
        setTotalItems(res.data.totalItems);
        setIdToUserList(res.data.accounts);
        setLoading(false)
      }).catch(err => {
        setUsers([])
        setLoading(false)
      });
    }

    const confirmSearchHandler = (event) => {
      event.preventDefault()
      setPage(0)
      searchAPI()
    }

    const loadUserList = () => {
      axios
          .get("/accounts?page=" + page + "&statusId=2")
          .then((res) => {
            setTotalItems(res.data.totalItems);
            setIdToUserList(res.data.accounts);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
          });
    }
    
    React.useEffect(() => {
      if (!loading) {
        setLoading(true);
        if(search.length <= 0) {
          loadUserList()
        } else {
          searchAPI()
        }
      }
  }, [page, totalItems, search])

    let showAlertSnackbar = null
    openAlertSnackbar ? showAlertSnackbar = (<AlertSnackbar isOpen={openAlertSnackbar} close={handleCloseAlertSnackbar} message={message} alertType={alertType} />) : null
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
                    onClick={redirectToActiveUserPage}
                  >
                    Active Users
                  </Button>{" "}
                </Grid>
                <Grid item>
                  <form onSubmit={confirmSearchHandler}>
                    <FormControl variant="outlined">
                      <InputLabel>Search</InputLabel>
                      <OutlinedInput
                        value={search}
                        onChange={searchHandler}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={clearSearchHandler} edge="end">
                              {search.length > 0 ? <ClearIcon /> : null}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                    </FormControl>
                  </form>
                </Grid>
              </Grid>
            }
          />
          <CardHeader
            titleTypographyProps={{ variant: "h4" }}
            title="Banned Users"
            subheader="All of the banned users on iHelp system"
          />
          <CardContent>
            <div style={{ height: 650, width: "100%" }}>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={10}
                onRowClick={(rows) => showUserDetails(rows)}
                pagination
                paginationMode="server"
                onPageChange={pagingHandler}
                rowCount={totalItems}
                autoHeight
                loading={loading}
              />
            </div>
          </CardContent>
        </Card>
        {showAlertSnackbar}
      </>
    );
}

export default BannedUsers
