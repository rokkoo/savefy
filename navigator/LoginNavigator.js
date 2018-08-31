import { createSwitchNavigator } from "react-navigation";
import { Login, DashBoard, Setting, Grafics } from "../screens";
import NavigatorMain from "./NavigatorMain";
export default createSwitchNavigator({
  Login: NavigatorMain,
  Main: NavigatorMain
});
