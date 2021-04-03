import { Button, Card, CardContent, CardHeader, createMuiTheme, Grid, ThemeProvider } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router'
// import SearchBar from "material-ui-search-bar";

import axios from '../../../api/axios'


const buttonTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#76ff03',
        },
        inherit: {
            main: '#7c4dff',
        },
        secondary: {
            main: '#2979ff',
        },
        default: {
            main: '#ff1744',
        }
    }
})

const columns = [
    {
        field: 'createDate', headerName: 'Create date', type: 'dateTime', width: 180,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    { field: 'title', headerName: 'Title', width: 300 },
    // {
    //   field: 'serviceType', headerName: 'Service Type', width: 150,
    //   renderCell: (params) => {
    //     return <p>{params.value.name}</p>
    //   }
    // },
    { field: 'accountEmail', headerName: 'Host email', width: 230 },
    { field: 'fullName', headerName: 'Host name', width: 200 },
    {
        field: 'startDate', headerName: 'Start date', width: 180,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    {
        field: 'endDate', headerName: 'End date', width: 180,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    { field: 'spot', headerName: 'Slots', width: 100 },
    {
        field: 'status', headerName: 'Status', width: 120,
        renderCell: (params) => {
            let stats = params.value;
            let color = 'default'
            if (stats.id === 1) {
                color = 'secondary'
            } else if (stats.id === 2) {
                color = 'inherit'
            } else if (stats.id === 3) {
                color = 'primary'
            }
            return (
                <ThemeProvider theme={buttonTheme}>
                    <Button variant="contained" color={color} size="small">
                        {stats.name}
                    </Button>
                </ThemeProvider>

            );
        }
    }
]

const Services = () => {
    const history = useHistory()
    const [services, setServices] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [totalItems, setTotalItems] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if(!loading) {
            setLoading(true)
        axios.get('/api/services?page=' + page)
            .then(res => {
                setServices(res.data.services)
                setTotalItems(res.data.totalItems)
                console.log(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err.message)
                setLoading(false)
            })
        }
    }, [page, totalItems])

    const showServiceDetails = (event) => {
        history.push('/home/services/' + event.row.id)
    }

    const pagingHandler = (params) => {
        setPage(params.page)
    }

    const createServiceHandler = () => {
        history.push('/home/services/create')
    }

    return (
        <Card>
            <CardHeader
                title={
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Button color='primary' variant='contained' onClick={createServiceHandler}>Create</Button>
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
            <CardHeader titleTypographyProps={{ variant: 'h4' }} title="Services" subheader="Services on iHelp system" />
            <CardContent>
                <div style={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={services}
                        columns={columns}
                        pageSize={10}
                        onRowClick={(rows) => showServiceDetails(rows)}
                        pagination
                        paginationMode='server'
                        onPageChange={pagingHandler}
                        rowCount={totalItems}
                        autoHeight
                        loading={loading}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default Services