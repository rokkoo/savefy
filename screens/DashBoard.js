import React from "react";
import { Text, View, Image, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";

import { DatePicker, Container, Content, Icon, Item, Row } from "native-base";
import { Card, Header, Divider } from "react-native-elements";

import DateTimePicker from "react-native-modal-datetime-picker";
import { material, systemWeights } from "react-native-typography";

import { Calendar, CalendarList, Agenda, LocaleConfig, Arrow } from "react-native-calendars";
import moment from "moment";

moment.locale("es");
const _format = moment().format("YYYY-MM-DD");
const _today = moment().format(_format);
const _maxDate = moment()
  .add(15, "days")
  .format(_format);

LocaleConfig.locales["es"] = {
  monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
  dayNames: ["Domingo", "Luenes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mier.", "Jue.", "Vier.", "Sab."]
};
export default class DashBoard extends React.Component {
  // It is not possible to select some to current day.
  initialState = {
    [_today]: { selected: true, marked: true, selectedColor: "#1CBFE2" }
  };
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      chosenDate: new Date(),
      startHour: new Date(),
      endHour: new Date(),
      isDateTimePickerVisibleStartHour: false,
      isDateTimePickerVisibleEndHour: false,
      _markedDates: this.initialState
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate = newDate => {
    this.setState({ chosenDate: newDate });
  };

  componentWillMount() {
    LocaleConfig.defaultLocale = "es";
  }

  /** Seleccionamos un dia del calendario */
  onDaySelect = day => {
    const _selectedDay = moment(day.dateString).format("YYYY-MM-DD");
    console.log(_format);
    if (this.state._markedDates[_selectedDay]) {
      // Already in marked dates, so reverse current marked state
      marked = !this.state._markedDates[_selectedDay].marked;
    }

    //Creamos un nuevo objeto inmutable que contendra solo el estado inicial y el dia selecionado
    const updatedMarkedDates = { ...this.state.initialState, ...{ [_selectedDay]: { selected: true, marked: true, selectedColor: "#1CBFE2" } } };
    // Triggers component to render again, picking up the new state
    this.setState({ _markedDates: updatedMarkedDates });
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
          <Card containerStyle={{ backgroundColor: "#ffffff" }}>
            <Calendar
              // Initially visible month. Default = Date()
              // current={'2012-03-01'}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={new Date()}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={new Date(2019, 1, 1)}
              // Handler which gets executed on day press. Default = undefined
              // onDayPress={day => {
              //   console.log("var ", _today);
              //   console.log("selected day", day);
              // }}
              onDayPress={this.onDaySelect}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={day => {
                console.log("selected day", day);
              }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={"dd-MM-yyyy"}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={month => {
                console.log("month changed", month);
              }}
              // Hide month navigation arrows. Default = false
              hideArrows={false}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              renderArrow={this._renderArrow}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={false}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={false}
              // Show week numbers to the left. Default = false
              showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon left. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              markedDates={this.state._markedDates}
            />
          </Card>
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
    justifyContent: "center",
    alignContent: "center"
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
