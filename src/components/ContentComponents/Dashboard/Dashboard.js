import React from 'react';
import { Grid } from '@material-ui/core';

import Events from '../Events/DashboardEvents/DashboardEvents';
import Admins from '../Users/DashboardAdmins/DashboardAdmins'
import Services from '../Services/DashboardServices/DashboardServices'

const Dashboard = () => {
    return (
        <Grid container spacing={3}>
            <Grid item lg={3} md={12} xs={12}>
                <Admins />
            </Grid>
            <Grid item lg={9} md={12} xs={12}>
                <Services />
            </Grid>
            <Grid item md={12} xs={12}>
                <Events />
            </Grid>

            {/* <Grid item lg={3} md={12} xs={12}>
                <BlogCard image={us1} title="So Exited to watch" />
            </Grid>
            <Grid item lg={3} md={12} xs={12}>
                <BlogCard image={us2} title="So Exited to watch" />
            </Grid>
            <Grid item lg={3} md={12} xs={12}>
                <BlogCard image={us3} title="So Exited to watch" />
            </Grid>
            <Grid item lg={3} md={12} xs={12}>
                <BlogCard image={us4} title="So Exited to watch" />
            </Grid> */}
        </Grid>
    );
}

export default Dashboard;