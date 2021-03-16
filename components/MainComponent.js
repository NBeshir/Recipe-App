import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./HomeComponent";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import FoodInfo from "./FoodInfoComponent";
import { RECIPES } from "../shared/recipe";

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    FoodInfo: { screen: FoodInfo },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);
// const FoodNavigator = createStackNavigator(
//   {
//     FoodInfo: { screen: FoodInfo },
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: "#5637DD",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         color: "#fff",
//       },
//     },
//   }
// );

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator },
  },
  {
    drawerBackgroundColor: "#CEC8FF",
  }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: RECIPES,
      fontsLoaded: false,
      selectedRecipe: null,
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <AppNavigator />
      </View>
    );
  }
}

export default Main;
