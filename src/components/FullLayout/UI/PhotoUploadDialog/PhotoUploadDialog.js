import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'

const useStyles = makeStyles(theme => ({
    previewRoot: {
        textAlign: 'center',
        padding: theme.spacing(0.5)
    },

    imagePreview: {
        width: 800,
        height: 600,
    }
}))

const PhotoUploadDialog = (props) => {
    const classes = useStyles()
    const [imageFile, setImageFile] = React.useState(null)
    const [imgURL, setImgURL] = React.useState('')

    const loadPreviewImage = (event) => {
        let file = event.target.files[0]
        loadImageFromFile(file)
    }

    const loadImageFromFile = (file) => {
        if (file) {
            let reader = new FileReader()
            reader.onloadend = () => {
                setImageFile(file)
                setImgURL(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const confirmUpload = () => {
        props.confirm(imageFile)
    }

    const clearImageHandler = () => {
        setImageFile(null)
        setImgURL(null)
        props.confirm(null)
    }

    let showImage = null;
    let clearImage = null
    if (props.image !== null) {
        useEffect(() => {
            loadImageFromFile(props.image)
        }, [])
        showImage = (<img className={classes.imagePreview} src={imgURL} alt="Preview"/>)
        clearImage = (<Button color="secondary" variant="contained" onClick={clearImageHandler}>Clear Image</Button>)
    }
    if (imageFile !== null) {
        showImage = (<img className={classes.imagePreview} src={imgURL} alt="Preview"/>)
        clearImage = (<Button color="secondary" variant="contained" onClick={clearImageHandler}>Clear Image</Button>)
    } else {
        showImage = (<p>Please select new image</p>)
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.cancel}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>
                <Grid container xs item>
                    <Grid item xs>
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                        >
                            Upload photo
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                multiple
                                onChange={(event) => loadPreviewImage(event)}
                            />
                        </Button>
                    </Grid>
                    <Grid item>
                        {clearImage}
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent className={classes.previewRoot}>
                {showImage}
            </DialogContent>
            <hr />
            <DialogActions>
                <Button onClick={confirmUpload} variant='outlined' color='primary'>Confirm</Button>
                <Button onClick={props.cancel} variant='outlined' color='secondary'>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PhotoUploadDialog