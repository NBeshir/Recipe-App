import React, { Component } from "react";
import { StyleSheet, View, Icon } from "react-native";
import Home from "./HomeComponent";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import FoodInfo from "./FoodInfoComponent";
import { RECIPES } from "../shared/recipe";
import RouteComponent from "./RouteComponent";
import Taiwanese from "./Taiwanese";
import Ethiopian from "./Ethiopian";
import Indian from "./Indian";
import American from "./American";
import Thai from "./Thai";

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

const IndianNavigator = createStackNavigator(
  {
    Indian: { screen: Indian },
  },
  {
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
const ThaiNavigator = createStackNavigator(
  {
    Thai: { screen: Thai },
  },
  {
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

const TaiwaneseNavigator = createStackNavigator(
  {
    Taiwanese: { screen: Taiwanese },
  },
  {
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
const AmericanNavigator = createStackNavigator(
  {
    American: { screen: American },
  },
  {
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

const EthiopianNavigator = createStackNavigator(
  {
    Ethiopian: { screen: Ethiopian },
  },
  {
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

const RouteNavigator = createStackNavigator(
  {
    RouteComponent: { screen: RouteComponent },
  },
  {
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

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator },
    // RouteComponent: { screen: RouteNavigator },
    Taiwanese: { screen: TaiwaneseNavigator },
    Ethiopian: { screen: EthiopianNavigator },
    American: { screen: AmericanNavigator },
    Indian: { screen: IndianNavigator },
    Thai: { screen: ThaiNavigator },
    // FoodInfo: { screen: FoodNavigator },
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
      route: "",
    };
  }
  // onRouteSelect(RecipeId) {
  //   this.setState({ route: RecipeId });
  // }

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
