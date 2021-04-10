import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";
import Home from "./HomeComponent";
import Favorites from "./FavoriteComponent";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import FoodInfo from "./FoodInfoComponent";
import { RECIPES } from "../shared/recipe";
import { connect } from "react-redux";
import { fetchRecipes, fetchComments } from "../redux/ActionCreators";

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },

    initialRouteName: "Home",
    defultNavigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Icon
          name="next"
          type="font-awesome"
          iconStyle={StyleSheet.homeIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
    FoodInfo: { screen: FoodInfo },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#65A613",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="home"
          type="font-awesome"
          iconStyle={StyleSheet.homeIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);
const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="heart"
          type="font-awesome"
          // iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const CustomDrawerContentComponent = (props) => (
  <ScrollView style={{ backgroundColor: "#F6A27D", height: "100%" }}>
    <SafeAreaView forceInset={{ horizontal: "never" }}>
      <View>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/logo.jpg")}
            style={styles.drawerImage}
          />
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },

    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        drawerLabel: "My Favorites",
        drawerIcon: ({ tintColor }) => (
          <Icon name="heart" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    contentComponent: CustomDrawerContentComponent,
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

  componentDidMount() {
    // console.log();
    this.props.fetchRecipes();
    this.props.fetchComments();
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
const styles = StyleSheet.create({
  homeIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
  drawerImage: {
    width: "100%",
    height: 120,
  },
});

mapDispatchToProps = {
  fetchRecipes,
  fetchComments,
};

export default connect(null, mapDispatchToProps)(Main);
