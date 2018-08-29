import React, { Component } from "react";
import { View } from "react-native";

import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Text } from "react-native-svg";

export default class DayGrafic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [10, 5, 15, 15, 10, 2, 6, 8, 4, 2, 10, 5, 15, 15, 10, 2, 6, 8, 4, 2, 7, 5, 6, 2];

    const CUT_OFF = 15;
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <Text key={index} x={x(index) + bandwidth / 2} y={value < CUT_OFF ? y(value) - 10 : y(value) + 15} fontSize={14} fill={value >= CUT_OFF ? "white" : "black"} alignmentBaseline={"middle"} textAnchor={"middle"}>
          {value}
        </Text>
      ));

    return (
      <View style={{ flexDirection: "column", height: 350, paddingVertical: 16, backgroundColor: "white" }}>
        <BarChart style={{ flex: 1, flexDirection: "column-reverse" }} data={data} svg={{ fill: "rgba(134, 65, 244, 0.8)" }} contentInset={{ top: 0, bottom: 10 }} spacing={0.2} gridMin={0}>
          <Grid direction={Grid.Direction.HORIZONTAL} />
          <Labels />
        </BarChart>
        <XAxis style={{ paddingLeft: 6 }} data={data} formatLabel={(value, index) => index + 1} labelStyle={{ color: "black" }} />
      </View>
    );
  }
}
