import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'

const FilterLayout = (props) => {
    const [categories, setCategories] = useState([])

    const loadCategories = () => {
        axios.get('/api/' + props.type + '-categories')
        .then(res => {
            setCategories(res.data)
        }).catch(err => {
            console.log(err.response.data.message)
        })
    }

    const getId = (value) => {
        if(value) props.loadFilter(value.id)
        else props.loadFilter('')
    }

    useEffect(() => {
        loadCategories()
    }, [])

    return (
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => getId(value)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="outlined" />
        )}
      />
    );
}

export default FilterLayout
