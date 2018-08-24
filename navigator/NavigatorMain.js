import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Setting, Login, DashBoard } from "../screens";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    DashBoard: DashBoard,
    Setting: Setting
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `home`;
        } else if (routeName === "Login") {
          iconName = `favorite`;
        } else if (routeName === "Profile") {
          iconName = `ios-person`;
        } else if (routeName === "Setting") {
          iconName = `settings`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={30} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "white",
      labelStyle: {
        fontSize: 10
      },
      style: {
        backgroundColor: "blue"
      }
    }
  }
);

export default TabNavigator;
