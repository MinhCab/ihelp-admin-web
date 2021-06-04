import { CardContent, makeStyles } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { Dialog } from '@material-ui/core'
import { DialogContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'


const useStyles = makeStyles(theme => ({
    buttonProgress: {
      color: "#039be5",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    }
}))

const Requirements = (props) => {
    const classes = useStyles()
    const reqs = props.requirements
    const [reqList, setReqList] = useState([])

    const convertStringToList = (str) => {
        if (str) {
            let list = str.split('/n')
            setReqList(list)
        }
    }

    useEffect(() => {
        convertStringToList(reqs)
    }, [])

    return (
        <Dialog open={props.isOpen} onClose={props.close} fullWidth maxWidth='md'>
            {props.isLoading && (
                <CircularProgress size={60} className={classes.buttonProgress} />
            )}
            <DialogTitle>
                <strong style={{ fontSize: 20 }}>
                    Requirements
                </strong>
            </DialogTitle>
            <DialogContent>
                {reqList.map((req, index) => {
                    return (
                        <Card>
                            <CardContent>
                                <strong>Requirement {index + 1}: </strong> {req}
                            </CardContent>
                        </Card>
                    )
                })}
            </DialogContent>
        </Dialog>
    )
}

export default Requirements
