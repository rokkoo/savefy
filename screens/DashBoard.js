import React from "react";
import { Text, View, Image, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";

import moment from "moment";

import { Container, Content, Icon } from "native-base";
import { Header } from "react-native-elements";

import DateTimePicker from "react-native-modal-datetime-picker";
import { material, systemWeights } from "react-native-typography";

//Components
import { DayCalendar } from "../components";

moment.locale("es");
export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      isDateTimePickerVisibleStartHour: false,
      isDateTimePickerVisibleEndHour: false,
      startHour: new Date(),
      endHour: new Date()
    };
  }

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
          <View style={styles.calendar}>
            <DayCalendar />
          </View>
          <View style={styles.timeContainer}>
            {/* Hora de inicio */}
            <View style={{ flexDirection: "column", width: 120 }}>
              <TouchableOpacity onPress={this._showDateTimePickerStartHour}>
                <Text style={styles.title}>Inicio</Text>
                {/* <Icon name="add-circle" style={styles.titleIcon} /> */}
              </TouchableOpacity>
              <Text style={styles.text}>{this.state.startHour.toString().substr(16, 5)}</Text>
              <DateTimePicker mode="time" titleIOS="Selecciona hora de inicio" isVisible={this.state.isDateTimePickerVisibleStartHour} onConfirm={this._handleStartHour} onCancel={this._hideDateTimePickerStartHour} />
            </View>
            <Icon name="ios-arrow-forward-outline" style={styles.titleIcon} />
            {/* Hora de salda */}
            <View style={{ flexDirection: "column", width: 120, alignContent: "center" }}>
              <TouchableOpacity onPress={this._showDateTimePickerEndHour}>
                <Text style={styles.title}>Salida</Text>
                {/* <Icon name="add-circle" style={styles.titleIcon} /> */}
              </TouchableOpacity>
              <Text style={styles.text}>{this.state.endHour.toString().substr(16, 5)}</Text>
              <DateTimePicker mode="time" titleIOS="Selecciona hora de inicio" isVisible={this.state.isDateTimePickerVisibleEndHour} onConfirm={this._handleEndHour} onCancel={this._hideDateTimePickerEndtHour} />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1
  },
  picker: {
    backgroundColor: "#E5E5E5"
  },
  title: {
    ...systemWeights.light,
    fontSize: 22,
    paddingLeft: 10,
    alignSelf: "flex-start",
    color: "#30384C",
    opacity: 0.6
  },
  text: {
    ...systemWeights.light,
    fontSize: 28,
    paddingRight: 15,
    alignSelf: "flex-end"
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "rgb(234,239,243)",
    borderTopWidth: 1.5,
    width: "100%",
    height: 90,
    position: "absolute",
    bottom: 0
  },
  titleIcon: {
    ...systemWeights.thin,
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center"
  },
  calendar: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0
  }
});
