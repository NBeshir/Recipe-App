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
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Icon
          name="list"
          type="font-awesome"
          onPress={() => navigation.toggleDrawer()}
          //iconStyle={StyleSheet.stackIcon}
        />
      ),
    }),
    FoodInfo: { screen: FoodInfo },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="home"
          type="font-awesome"
          onPress={() => navigation.toggleDrawer()}
          // iconStyle={StyleSheet.stackIcon}
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
  <ScrollView>
    <SafeAreaView
      //style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View //style={styles.drawerHeader}
      >
        <View style={{ flex: 1 }}>
          <Image
          // source={require("../assets/images/logo.png")}
          // style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text>Variety</Text>
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

mapDispatchToProps = {
  fetchRecipes,
  fetchComments,
};
mapDispatchToProps;
export default connect(null, mapDispatchToProps)(Main);
