import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async loadFonts() {
    await Font.loadAsync({
      "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
      "RobotoMono-Bold": require("../assets/fonts/RobotoMono-Bold.ttf"),
      "RobotoMono-Italic": require("../assets/fonts/RobotoMono-Italic.ttf"),
      "RobotoMono-Regular": require("../assets/fonts/RobotoMono-Regular.ttf"),
      "RobotoMono-ExtraLight": require("../assets/fonts/RobotoMono-ExtraLight.ttf"),
      "RobotoMono-Light": require("../assets/fonts/RobotoMono-Light.ttf"),
    }).catch((err) => {
      console.log(err.message);
    });
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 22,
            color: "#9E1111",
            fontFamily: "RobotoMono-Regular",
          }}
        >
          Multicultural Recipes App
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    padding: 10,
    opacity: 0.7,
    backgroundColor: "#b8b8b8",
  },
});

export default Header;
