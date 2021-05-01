import React from 'react';
import { Grid } from '@material-ui/core';

import Events from '../Events/DashboardEvents/DashboardEvents';
import Services from '../Services/DashboardServices/DashboardServices'
import MonthlyStatisticChart from './MonthlyStatistic/MonthlyStatisticChart'

const Dashboard = () => {
    return (
        <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
                <MonthlyStatisticChart type='events' />
            </Grid>
            <Grid item md={12} xs={12}>
                <Events />
            </Grid>
            <Grid item md={12} xs={12}>
                <Services />
            </Grid>
        </Grid>
    );
}

export default Dashboard;