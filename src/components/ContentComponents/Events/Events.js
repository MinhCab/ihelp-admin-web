import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import axios from '../../../api/axios'

const columns = [
    {
        field: 'createDate', headerName: 'Create date', type: 'dateTime', width: 230,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    { field: 'title', headerName: 'Title', width: 250 },
    // {
    //     field: 'category', headerName: 'Category', width: 150,
    //     renderCell: (params) => {
    //         return <p>{params.value.name}</p>
    //     }
    // },
    { field: 'authorFullName', headerName: 'Host name', width: 150 },
    { field: 'authorEmail', headerName: 'Host email', width: 180 },
    {
        field: 'startDate', headerName: 'Start date', width: 200,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    {
        field: 'endDate', headerName: 'End date', width: 200,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    { field: 'spot', headerName: 'Slots', width: 90 },
    {
        field: 'onsite', headerName: 'Type', width: 100,
        renderCell: (params) => {
            let showOnSite = params.value
            if (showOnSite === true) {
                return (<Button variant="outlined" color='primary' size="small">
                    On site
                </Button>)
            } else {
                return (<Button variant="outlined" color='secondary' size="small">
                    Online
                </Button>)
            }
        }
    },
    {
        field: 'status', headerName: 'Status', width: 120,
        renderCell: (params) => {
            let color = 'primary';
            let type = params.value;
            if (type.id === 2 || type.id === 5) {
                color = 'secondary'
            }
            return (
                <Button variant="contained" color={color} size="small">
                    {type.name}
                </Button>
            );
        }
    }
]

const Events = () => {
    const history = useHistory()
    const [events, setEvents] = useState([])
    const [page, setPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [search, setSearch] = useState(null)

    const createEventHandler = () => {
        history.push('/home/events/create')
    }

    const showEventDetails = (event) => {
        history.push('/home/events/details/' + event.row.id)
    }

    const pagingHandler = (params) => {
        setPage(params.page)
    }

    const handleSearchRequest = () => {
        setPage(0)
        axios.get('/api/events/title/' + search + '?page=' + page)
            .then(res => {
                setEvents(res.data.events)
                setTotalItems(res.data.totalItems)
            }).catch(err => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        axios.get('/api/events?page=' + page)
            .then(res => {
                setEvents(res.data.events)
                setTotalItems(res.data.totalItems)
                console.log(res.data.events)
            }).catch(error => {
                console.log(error.message)
            })
    }, [page, totalItems])

    return (
        <Card>
            <CardHeader
                title={
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Button color='primary' variant='contained' onClick={createEventHandler}>Create</Button>
                        </Grid>
                        <Grid item>
                            <form>
                                <TextField id='search-bar' label='Search' onSubmit={handleSearchRequest} variant='outlined'/>
                            </form>
                            
                        </Grid>
                    </Grid>
                }
            />
            <CardHeader titleTypographyProps={{ variant: 'h4' }} title="Events" subheader="Events from the iHelp volunteers" />
            <CardContent>
                <div style={{ height: 650, width: '100%' }}>
                    <DataGrid 
                        rows={events} 
                        columns={columns} 
                        pageSize={10} 
                        onRowClick={(rows) => showEventDetails(rows)} 
                        pagination 
                        onPageChange={pagingHandler}
                        paginationMode='server'
                        rowCount={totalItems}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Events