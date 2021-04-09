import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./components/MainComponent";
import * as Font from "expo-font";
import { ConfigureStore } from "./redux/configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";

// const getFonts = () =>
//   Font.loadAsync({
//     "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
//     "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
//   });
const { persistor, store } = ConfigureStore();

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
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
// <Provider store={store}>
//         //<View style={styles.container}>
//           <Main />
//         </View>
//       </Provider>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Nunito-SemiBold",
    alignItems: "center",
    justifyContent: "center",
  },
});
