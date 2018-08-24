import React from "react";
import { Text, View, Image, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";

import { DatePicker, Container, Content, Icon, Item, Row } from "native-base";
import { Card, Header, Divider } from "react-native-elements";

import DateTimePicker from "react-native-modal-datetime-picker";
import { material, systemWeights } from "react-native-typography";

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      chosenDate: new Date(),
      startHour: new Date(),
      endHour: new Date(),
      isDateTimePickerVisibleStartHour: false,
      isDateTimePickerVisibleEndHour: false
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate = newDate => {
    this.setState({ chosenDate: newDate });
  };

  /** Inicio del trabajo */
  _showDateTimePickerStartHour = () => this.setState({ isDateTimePickerVisibleStartHour: true });
  _hideDateTimePickerStartHour = () => this.setState({ isDateTimePickerVisibleStartHour: false });

  /** Final del trabajo */
  _showDateTimePickerEndHour = () => this.setState({ isDateTimePickerVisibleEndHour: true });
  _hideDateTimePickerEndtHour = () => this.setState({ isDateTimePickerVisibleEndHour: false });

  _handleStartHour = hour => {
    this.setState({
      startHour: hour
    });
    this._hideDateTimePickerStartHour();
  };

  _handleEndHour = hour => {
    this.setState(
      {
        endHour: hour
      },
      () => this.diferenciaHoras()
    );
    this._hideDateTimePickerEndtHour();
  };

  diferenciaHoras = () => {
    const start = this.state.startHour.toString().substr(16, 5);
    const end = this.state.endHour.toString().substr(16, 5);
    console.log("startDate ", start);
    console.log("enddate ", end);

    let startHour = start.substr(0, 2);
    let startMinutes = start.substr(3, 5);

    let endHour = end.substr(0, 2);
    let endMinutes = end.substr(3, 5);

    let diferenciaHoras = parseInt(endHour - startHour);
    let diferenciaMinutos = parseInt(endMinutes - startMinutes);

    console.log("Horas ", diferenciaHoras);
    console.log("Minutos ", diferenciaMinutos);
  };

  render() {
    return (
      <Container>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} centerComponent={{ text: "Seleccione las horas", style: { color: "#fff" } }} rightComponent={{ icon: "home", color: "#fff" }} />
        <Content contentContainerStyle={styles.container}>
          <DatePicker defaultDate={new Date(2018, 4, 4)} minimumDate={new Date(2018, 1, 1)} maximumDate={new Date(2018, 12, 31)} locale={"es"} timeZoneOffsetInMinutes={undefined} modalTransparent={true} animationType={"fade"} androidMode={"default"} placeHolderText="Selecciona una fecha" textStyle={{ color: "green" }} placeHolderTextStyle={{ color: "#d3d3d3" }} onDateChange={this.setDate} />
          <View style={styles.timeContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>Hora de inicio</Text>
              <TouchableOpacity onPress={this._showDateTimePickerStartHour}>
                <Icon name="add-circle" style={styles.titleIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>{this.state.startHour.toString().substr(16, 5)}</Text>
          </View>
          <DateTimePicker mode="time" titleIOS="Selecciona hora de inicio" isVisible={this.state.isDateTimePickerVisibleStartHour} onConfirm={this._handleStartHour} onCancel={this._hideDateTimePickerStartHour} />
          <Divider />
          <View style={styles.timeContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>Hora de salida</Text>
              <TouchableOpacity onPress={this._showDateTimePickerEndHour}>
                <Icon name="add-circle" style={styles.titleIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>{this.state.endHour.toString().substr(16, 5)}</Text>
          </View>
          <DateTimePicker mode="time" titleIOS="Selecciona hora de inicio" isVisible={this.state.isDateTimePickerVisibleEndHour} onConfirm={this._handleEndHour} onCancel={this._hideDateTimePickerEndtHour} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingTop: 10
  },
  picker: {
    backgroundColor: "#E5E5E5"
  },
  title: {
    ...systemWeights.thin,
    fontSize: 28
  },
  text: {
    ...systemWeights.light,
    fontSize: 28,
    paddingRight: 15
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleIcon: {
    ...systemWeights.thin,
    paddingLeft: 5,
    fontSize: 20,
    paddingTop: 10
  }
});
