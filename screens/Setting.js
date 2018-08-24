import React, { Component } from "react";
import { View, StyleSheet, Image, Alert, AsyncStorage } from "react-native";

import { Icon, Button, Container, Content, Left } from "native-base";
import { Avatar, Header, Text } from "react-native-elements";
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        img: "img"
      }
    };
  }

  _userData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem("user"));
      console.log(value);
      if (value !== null) {
        this.setState({
          user: {
            name: value.name,
            email: value.email,
            img: value.photoUrl
          }
        });
      }
    } catch (error) {
      console.log("User data error", error);
    }
  };

  componentWillMount() {
    this._userData();
  }
  render() {
    const { navigate } = this.props.navigation;
    console.log();
    return (
      <Container>
        <Header leftComponent={{ icon: "menu", color: "#fff" }} centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }} rightComponent={{ icon: "home", color: "#fff" }} />
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text h4>Ventana de ajustes</Text>
          <Avatar xlarge rounded source={{ uri: this.state.user.img }} onPress={() => console.log("Works!")} activeOpacity={0.7} />
          <View>
            <Text style={{ fontSize: 16 }}>Nombre: {this.state.user.name}</Text>
            <Text style={{ fontSize: 16 }}>Tu correo es: {this.state.user.email}</Text>
          </View>
          {/* <Image style={{ width: 100, height: 100, borderRadius: 45 }} source={{ uri: this.state.user.img }} /> */}
          {/* <Text>User: {this.props.user.familyName}</Text> */}
        </Content>
      </Container>
    );
  }
}

export default Setting;
