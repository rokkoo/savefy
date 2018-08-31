import React from "react";
import { Text, View, Image, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";
import Dimensions from "Dimensions";

import moment from "moment";

import { Container, Content, Icon } from "native-base";
import { Header, Button } from "react-native-elements";

import DateTimePicker from "react-native-modal-datetime-picker";
import { material, systemWeights } from "react-native-typography";

//Components
import { DayCalendar } from "../components";

//redux
import { connect } from "react-redux";

//Dimensions
const SCREEN_WIDTH = Dimensions.get("window").width;

moment.locale("es");
class DashBoard extends React.Component {
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

  textCapitalice = props => `${props.charAt(0).toUpperCase()}${props.slice(1)}`;

  render() {
    const { date } = this.props;
    return (
      <Container>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} centerComponent={{ text: "Seleccione las horas", style: { color: "#fff" } }} rightComponent={{ icon: "home", color: "#fff" }} />
        <Content contentContainerStyle={[styles.container, { marginRight: 10 }]}>
          <View style={styles.calendar}>
            <DayCalendar />
          </View>
          <View style={styles.clock}>{/* <Icon name="ios-timer-outline" style={{ fontSize: 44 }} /> */}</View>
          <View style={styles.timeContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10, marginBottom: 20 }}>
              {/* Hora de inicio */}
              <TouchableOpacity style={[styles.touchableTime, {}]} onPress={this._showDateTimePickerStartHour}>
                {/* <Icon name="add-circle" style={styles.titleIcon} /> */}
                <Text style={{ fontSize: 24 }}>{this.textCapitalice(date)}</Text>
                <Text style={styles.text}>{this.state.startHour.toString().substr(16, 5)}</Text>
                <DateTimePicker mode="time" titleIOS="Selecciona hora de inicio" isVisible={this.state.isDateTimePickerVisibleStartHour} onConfirm={this._handleStartHour} onCancel={this._hideDateTimePickerStartHour} />
                {/* <Text style={styles.title}>Inicio</Text> */}
              </TouchableOpacity>
              {/* <Icon name="ios-arrow-forward-outline" style={styles.titleIcon} /> */}
              <Icon name="md-arrow-dropright" style={styles.titleIcon} />
              {/* Hora de salda */}
              <TouchableOpacity style={styles.touchableTime} onPress={this._showDateTimePickerEndHour}>
                {/* <Icon name="add-circle" style={styles.titleIcon} /> */}
                <Text style={{ fontSize: 24 }}>{this.textCapitalice(date)}</Text>
                <Text style={styles.text}>{this.state.endHour.toString().substr(16, 5)}</Text>
                <DateTimePicker mode="time" titleIOS="Selecciona hora de inicio" isVisible={this.state.isDateTimePickerVisibleEndHour} onConfirm={this._handleEndHour} onCancel={this._hideDateTimePickerEndtHour} />
                {/* <Text style={styles.title}>Salida</Text> */}
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Button title="Guardar" icon={{ name: "done" }} raised rounded backgroundColor="#47BC97" />
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
    color: "#30384C",
    opacity: 0.6,
    alignSelf: "center"
  },
  text: {
    ...systemWeights.light,
    fontSize: 28,
    opacity: 0.6
  },
  timeContainer: {
    flexDirection: "column",
    borderTopColor: "rgb(234,239,243)",
    borderTopWidth: 1.5,
    width: SCREEN_WIDTH,
    position: "absolute",
    bottom: 0
    // backgroundColor: "blue"
  },
  touchableTime: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "40%",
    alignItems: "center"
  },
  titleIcon: {
    ...systemWeights.thin,
    fontSize: 28,
    justifyContent: "center",
    alignSelf: "center",
    opacity: 0.6
  },
  calendar: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0
  },
  clock: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 90,
    position: "absolute",
    bottom: 42
  }
});

function mapStateToProps(state) {
  return {
    date: state.date
  };
}

export default connect(mapStateToProps)(DashBoard);
