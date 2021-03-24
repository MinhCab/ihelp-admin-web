import { Dialog, DialogContentText, DialogTitle, Switch, TextField } from '@material-ui/core'
import React from 'react'

const EditEvent = (props) => {

    const [title, setTitle] = React.useState('')
    const [startDate, setStartDate] = React.useState()
    const [endDate, setEndDate] = React.useState()
    const [category, setCategory] = React.useState([])
    const [quota, setQuota] = React.useState(1)
    const [point, setPoint] = React.useState(0)
    const [onSite, setOnSite] = React.useState(true)
    const [location, setLocation] = React.useState('')
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    })
    const [description, setDescription] = React.useState('')

    return (
      <Dialog open={props.isOpen} onClose={props.close}>
        <DialogTitle>Edit events</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              variant="outlined"
              value={title}
              onChange={handleTitleInput}
              label="Title"
            />
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              minimumDate={new Date()}
              minimumLength={1}
              format="dd MMM yyyy"
              locale={enGB}
            >
              {({ startDateInputProps, endDateInputProps, focus }) => (
                <Grid
                  item
                  container
                  xs
                  spacing={3}
                  style={{ marginBottom: 20 }}
                >
                  <Grid item xs>
                    <strong>This event starts: </strong>
                    <TextField
                      required
                      className={
                        "input" + (focus === START_DATE ? " -focused" : "")
                      }
                      {...startDateInputProps}
                      label="From"
                      variant="outlined"
                    />
                    <TextField
                      required
                      className={
                        "input" + (focus === END_DATE ? " -focused" : "")
                      }
                      {...endDateInputProps}
                      label="To"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                      style={{ marginRight: 10 }}
                    >
                      <strong>Cover photo: </strong>
                    </Typography>
                    <Button
                      variant="contained"
                      component="label"
                      color="primary"
                      onClick={handleOpenPhotoUploadDialog}
                    >
                      Upload File
                    </Button>
                  </Grid>
                </Grid>
              )}
            </DateRangePicker>
            <Select
              required
              id="txtCategory"
              select="true"
              value={category}
              multiple
              onChange={handleCategoryInput}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => {
                return (
                  <div>
                    {selected.map((value) => {
                      return <Chip key={value.id} label={value.name} />;
                    })}
                  </div>
                );
              }}
            >
              {categories.map((cate) => {
                return (
                  <MenuItem key={cate.id} value={cate}>
                    {cate.name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              variant="outlined"
              value={quota}
              onChange={handleQuotaInput}
              label="Number of participants"
            />
            <TextField
              variant="outlined"
              value={point}
              onChange={handlePointInput}
              label="Points per participant"
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
}

export default EditEvent