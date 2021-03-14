import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
//import { ListItem, Card } from "react-native-elements";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      "RobotoMono-Italic": require("../assets/fonts/RobotoMono-Italic.ttf"),
      "RobotoMono-Regular": require("../assets/fonts/RobotoMono-Regular.ttf"),
      "RobotoMono-ExtraLight": require("../assets/fonts/RobotoMono-ExtraLight.ttf"),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      "RobotoMono-Light": {
        uri: require("../assets/fonts/RobotoMono-Light.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
  }
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          margin: 20,
          padding: 10,
          opacity: 0.7,
        }}
      >
        <Text
          style={{
            fontSize: 28,

            fontFamily: "RobotoMono-ExtraLight",
          }}
        >
          Cultural Recipes App
        </Text>
      </View>
    );
  }
}

export default Header;
