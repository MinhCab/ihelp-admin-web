import { Button, createMuiTheme, List, ListItem, ListItemIcon, ListItemText, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from '../../../../../api/axios';

const statusColor = createMuiTheme({
    palette: {
      primary: {
        main: '#00d700',
      }
    },
  });

const EvaluationHistory = (props) => {
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(0)
    
    const [list, setList] = useState([])

    const style = {
        cursor: 'pointer',
    }

    const pagingHandler = () => {
        setPage(page + 1)
    }
    
    const addToList = (data) => {
        let dataList = []
        dataList = list
        dataList.push(...data)
        setList(dataList) 
    }  

    const loadEvaluationHistory = () => {
        console.log('vô!')
        axios.get('/api/points/event/' + props.id + '?page=' + page)
        .then(res => {
          console.log(res)
            setTotalPages(res.data.totalPages)
            setPage(0)
            addToList(res.data.points)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
      console.log('vô lần nữa!')
        loadEvaluationHistory()
    }, [page, setTotalPages])

    let showShowMoreButton = null
    if(totalPages >> 1) {
        showShowMoreButton = (
            <Button fullWidth onClick={pagingHandler}>Show more</Button>
        )
    }
    return (
      <>
        {list.length > 0 ? (
          <>
            <List style={{ marginLeft: "20%", marginRight: "20%" }}>
              { list.map(item => {
                return (
                  <ListItem key={item.email} style={style}>
                    <ListItemText
                      primary={item.email}
                      secondary={`Rating: ${item.rating}`}
                    />
                    <ThemeProvider theme={statusColor}>
                      <ListItemIcon>{item.point == 0 ? <RemoveCircleIcon color='secondary'/> : <AddCircleIcon color='primary'/>}</ListItemIcon>
                    </ThemeProvider>
                  </ListItem>
                );
              })}
            </List>
            {showShowMoreButton}
          </>
        ) : <p style={{magrin: '50%'}}>This event has not been evaluated</p>}
      </>
    );
}

export default EvaluationHistory
