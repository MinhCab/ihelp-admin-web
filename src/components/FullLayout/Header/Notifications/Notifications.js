import { Popover, makeStyles, Grid, Typography, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import { useAuth } from '../../../../hoc/StoringAuth/AuthContext';


const useStyles = makeStyles((theme) => ({
    popover: {
        padding: theme.spacing(0.3),
        margin: theme.spacing(0.3),
        maxWidth: 400,
    },

    paper: {
        margin: theme.spacing(1),
        cursor: 'pointer',
    }
}));

// let NotificationsList = [
//     { id: 1, content: 'Trải nghiệm Vinpearl Nha Trang, 2 ngày 1 đêm, ăn uống 3 bữa và vé Vinwonders', date_time: '2015-01-01 08:22:13' },
//     { id: 2, content: 'Apple đang phát triển pin sạc MagSafe cho iPhone 12, gọi là Battery Pack?', date_time: '2015-01-01 08:22:13' },
//     { id: 3, content: 'Samsung sẽ quay lại dùng Android cho 1 mẫu smartwatch mới?', date_time: '2015-01-01 08:22:13' },
//     { id: 4, content: 'Tại sao Coca ở McDonald ngon hơn?', date_time: '2015-01-01 08:22:13' },
//     { id: 5, content: 'Nvidia tung GPU để đào tiền ảo, bóp hash RTX 3060 nhưng liệu có giúp game thủ dễ mua card hơn?', date_time: '2015-01-01 08:22:13' },
//     { id: 6, content: 'Chi tiết về cảm biến OV50A 50MP của OmniVision: lấy nét đỉnh cao & quay video 8K 30fps', date_time: '2015-01-01 08:22:13' },
//     { id: 7, content: 'Chi tiết về cảm biến OV50A 50MP của OmniVision: lấy nét đỉnh cao & quay video 8K 30fps', date_time: '2015-01-01 08:22:13' },
//     { id: 8, content: 'Chi tiết về cảm biến OV50A 50MP của OmniVision: lấy nét đỉnh cao & quay video 8K 30fps', date_time: '2015-01-01 08:22:13' },
//     { id: 9, content: 'Chi tiết về cảm biến OV50A 50MP của OmniVision: lấy nét đỉnh cao & quay video 8K 30fps', date_time: '2015-01-01 08:22:13' },
//     { id: 10, content: 'Chi tiết về cảm biến OV50A 50MP của OmniVision: lấy nét đỉnh cao & quay video 8K 30fps', date_time: '2015-01-01 08:22:13' },
//     { id: 11, content: 'Chi tiết về cảm biến OV50A 50MP của OmniVision: lấy nét đỉnh cao & quay video 8K 30fps', date_time: '2015-01-01 08:22:13' },
//     { id: 12, content: 'Chi tiết về cảm biến OV50A 50MP của OmniVision: lấy nét đỉnh cao & quay video 8K 30fps', date_time: '2015-01-01 08:22:13' },
// ]

const getSelectedValue = value => {
    return console.log(value)
}

const Notifications = (props) => {
    const classes = useStyles()
    const NotificationsList = [props.list]
    return (
      <React.Fragment>
        <Popover
          open={props.opening}
          anchorEl={props.showNoti}
          onClose={props.closing}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {!NotificationsList ? NotificationsList.map((noti, index) => {
            return (
              <Paper
                className={classes.paper}
                elevation={3}
                key={noti.id}
                onClick={() => getSelectedValue(noti.id)}
              >
                <Grid
                  className={classes.popover}
                  wrap="nowrap"
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                  spacing={3}
                >
                  <Grid item zeroMinWidth xs={12}>
                    <Typography gutterBottom variant="h6" noWrap>
                      <strong>{noti.content}</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {noti.date_time}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            );
          }) : (
                <Grid
                  className={classes.popover}
                  wrap="nowrap"
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                  spacing={3}
                >
                  <Grid item zeroMinWidth xs={12}>
                    <Typography gutterBottom variant="h6" noWrap>
                      <strong>You do not have any notification yet!</strong>
                    </Typography>
                  </Grid>
                </Grid>
          )}
        </Popover>
      </React.Fragment>
    );
}

export default Notifications;