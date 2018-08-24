import React, { Component } from "react";
import { View, Text, StyleSheet, Image, AsyncStorage, ImageBackground, Dimensions } from "react-native";

import { Container, Header, Content, Left } from "native-base";
import { Icon, SocialIcon, Button } from "react-native-elements";

import Expo from "expo";

const Movile_with = Dimensions.get("window").width;
const Movile_height = Dimensions.get("window").height;

class Login extends Component {
  //Login
  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        //ndroidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: "128925080638-upsktq0h6bsguvkiq5t2ui68oalf2c9v.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("====================================");
        // console.log(result.user);
        console.log("====================================");

        // return result.accessToken;
        try {
          await AsyncStorage.setItem("user", JSON.stringify(result.user));
        } catch (error) {
          console.log("error saving data");
        }
        return this.props.navigation.navigate("Main");
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <View>
          <ImageBackground source={require("../assets/login.jpg")} style={styles.backgroundImage}>
            <Button title="Entrar con google" raised backgroundColor="#f50057" icon={{ name: "google", type: "font-awesome" }} onPress={() => this.signInWithGoogleAsync()} />
          </ImageBackground>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundImage: {
    flex: 1,
    width: Movile_with,
    height: Movile_height,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0,0,0,0)",
    fontSize: 32
  }
});

export default Login;
