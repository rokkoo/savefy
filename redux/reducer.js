import moment from "moment";
import "moment/locale/es";

moment.locale("es");
const dataSelected = "DATE_SELECTED";
const setDate = "SET_DATE";

const initialState = {
  date: moment().format("MMM Do YY")
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case dataSelected:
      return { date: state.date };
    case setDate:
      return {
        ...state,
        date: action.payload
      };
    default:
      return state;
  }
}

export function newDate(date) {
  return {
    type: setDate,
    payload: {
      date: date
    }
  };
}
