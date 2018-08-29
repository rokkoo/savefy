import React, { Component } from "react";
import { View, Text } from "react-native";

import { DatePicker, Container, Content, Icon, Item, Row } from "native-base";
import { Header } from "react-native-elements";

import { DayGrafic } from "./../components";

export default class Grafics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} centerComponent={{ text: "Seleccione las horas", style: { color: "#fff" } }} rightComponent={{ icon: "home", color: "#fff" }} />
        <Content>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ fontSize: 25 }}>Gráficos del més</Text>
            <DayGrafic />
          </View>
        </Content>
      </Container>
    );
  }
}
