import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import moment from "moment";
import "moment/locale/es";

import { Calendar, CalendarList, Agenda, LocaleConfig, Arrow } from "react-native-calendars";
import { Card, Divider } from "react-native-elements";

moment.locale("es");
const _format = moment().format("YYYY-MM-DD");
const _today = moment().format(_format);
const _maxDate = moment()
  .add(15, "days")
  .format(_format);

const monthNamesShort = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const dayNamesShort = {
  lunes: "Lun",
  martes: "Mar",
  miércoles: "Mier",
  jueves: "Jue",
  viernes: "Vier",
  sábado: "Sab",
  domingo: "Dom"
};
LocaleConfig.locales["es"] = {
  monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  dayNames: ["Domingo", "Luenes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"]
};

class DayCalendar extends Component {
  // It is not possible to select some to current day.
  initialState = {
    [_today]: { selected: true, marked: true, selectedColor: "#1CBFE2" }
  };

  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
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
    let nombreDia = dayNamesShort[moment(day.dateString).format("dddd")];
    this.props.changeDate(`${nombreDia}, ${monthNamesShort[day.month - 1]} ${day.day}`);
    if (this.state._markedDates[_selectedDay]) {
      // Already in marked dates, so reverse current marked state
      marked = !this.state._markedDates[_selectedDay].marked;
    }

    //Creamos un nuevo objeto inmutable que contendra solo el estado inicial y el dia selecionado
    const updatedMarkedDates = { ...this.state.initialState, ...{ [_selectedDay]: { selected: true, marked: true, selectedColor: "#1CBFE2" } } };
    // Triggers component to render again, picking up the new state
    this.setState({ _markedDates: updatedMarkedDates });
  };

  render() {
    const { date } = this.props;
    console.log("hora props ", date);
    return (
      <Card containerStyle={{ backgroundColor: "#ffffff" }}>
        <Calendar
          // style={{ height: 400 }}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#32883b",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#333",
            dayTextColor: "#666",
            textDisabledColor: "#d9e1e8",
            dotColor: "#32883b",
            selectedDotColor: "#ffffff",
            // arrowColor: "#32883b",
            monthTextColor: "#333",
            // textDayFontFamily: "Montserrat-Medium",
            // textMonthFontFamily: "Montserrat-SemiBold",
            // textDayHeaderFontFamily: "Montserrat-Medium",
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 14
          }}
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
        {/* <Divider / */}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    date: state.date
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeDate: newDate => dispatch({ type: "SET_DATE", payload: newDate })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayCalendar);
