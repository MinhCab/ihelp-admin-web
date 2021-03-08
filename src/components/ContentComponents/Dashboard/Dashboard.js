import React from 'react';
import { Grid } from '@material-ui/core';

import Events from '../Events/DashboardEvents/DashboardEvents';
import Admins from '../Users/DashboardAdmins'
import Services from '../Services/DashboardServices'
// import BlogCard from '../Components/DashboardComponents/BlogCards';

// import us1 from '../assets/images/backgrounds/u1.jpg'
// import us2 from '../assets/images/backgrounds/u2.jpg'
// import us3 from '../assets/images/backgrounds/u3.jpg'
// import us4 from '../assets/images/backgrounds/u4.jpg'

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