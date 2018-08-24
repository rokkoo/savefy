import { createSwitchNavigator } from "react-navigation";
import { Login, DashBoard, Setting } from "../screens";
import NavigatorMain from "./NavigatorMain";
export default createSwitchNavigator({
  Login: DashBoard,
  Main: NavigatorMain
});
