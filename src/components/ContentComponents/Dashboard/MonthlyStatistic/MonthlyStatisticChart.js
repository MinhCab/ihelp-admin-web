import { Card, CardContent } from "@material-ui/core";
import React from "react";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, Stack } from "@devexpress/dx-react-chart";

import axios from "../../../../api/axios";
import { withStyles } from "@material-ui/styles";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

const MonthlyStatisticChart = (props) => {
  const [data, setData] = React.useState([]);
  const [curYear, setCurYear] = React.useState()

  const convertObject2Array = (eventObj, serviceObj) => {
    let eveNewArr = [];
    Object.keys(eventObj).map((key) => {
      eveNewArr.push({
        month: Number(key).toString(),
        events: eventObj[key],
      });
    });

    let serNewArr = [];
    Object.keys(eventObj).map((key) => {
      serNewArr.push({
        services: serviceObj[key],
      });
    });

    let copyArr = eveNewArr;
    for (let i = 0; i < copyArr.length; i++) {
      copyArr[i].services = serNewArr[i].services;
    }

    setData(copyArr)
  }

  const loadStats = () => {
    let eve = {}
    let ser = {}
    let currentYear = new Date().getFullYear()
    setCurYear(currentYear)
    axios.get("/api/events/statistic/" + currentYear).then((res) => {
      eve = res.data
      axios.get("/api/services/statistic/" + currentYear).then((res) => {
        ser = res.data
        convertObject2Array(eve, ser)
      });
    });
  };

  React.useEffect(() => {
      loadStats()
  }, []);

  return (
    <Card>
      <CardContent>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="Events"
            valueField="events"
            argumentField="month"
            color="#00bcd4"
          />
          <BarSeries
            name="Services"
            valueField="services"
            argumentField="month"
            color="#2979ff"
          />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />
          <Title text={`Monthly hosted event and service in ${curYear}`} />
          <Stack />
        </Chart>
      </CardContent>
    </Card>
  );
};

export default MonthlyStatisticChart;
