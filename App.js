import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./components/MainComponent";
import * as Font from "expo-font";

// const getFonts = () =>
//   Font.loadAsync({
//     "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
//     "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
//   });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }
  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      "Nunito-SemiBold": {
        uri: require("./assets/fonts/Nunito-SemiBold.ttf"),
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
      <View style={styles.container}>
        <Main />
      </View>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Nunito",
    alignItems: "center",
    justifyContent: "center",
  },
});
