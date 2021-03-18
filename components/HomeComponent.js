import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { FlatList, ImageBackground } from "react-native";
import { SearchBar, Card } from "react-native-elements";
import { RECIPES } from "../shared/recipe";
import Header from "./Header";
import * as Font from "expo-font";
import American from "./American";
import Thai from "./Thai";
import Indian from "./Indian";
import Ethiopian from "./Ethiopian";
import Taiwanese from "./Taiwanese";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: RECIPES,
      fontsLoaded: false,

      search: [],
    };
  }
  static navigationOptions = {
    title: "Home",
  };

  // async loadFonts() {
  //   await Font.loadAsync({
  // Load a font `Montserrat` from a static resource
  // "RobotoMono-Italic": require("../assets/fonts/RobotoMono-Italic.ttf"),
  // "RobotoMono-Regular": require("../assets/fonts/RobotoMono-Regular.ttf"),
  //"RobotoMono-Bold": require("../assets/fonts/RobotoMono-Bold.ttf"),

  // Any string can be used as the fontFamily name. Here we use an object to provide more control
  //     "RobotoMono-Light": {
  //       uri: require("../assets/fonts/RobotoMono-Light.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //   });
  //   this.setState({ fontsLoaded: true });
  // }
  // componentDidMount() {
  //   this.loadFonts();
  // }

  updateSearch = (recipe) => {
    this.setState({
      search: this.state.recipes.filter((r) =>
        r.name.toLowerCase().includes(recipe.toLowerCase())
      ),
    });
  };
  render() {
    const { navigate } = this.props.navigation;

    const renderRecipeItem = ({ item }) => {
      return (
        <View
          key={item.id}
          style={{
            borderRadius: 8,
            margin: 10,
            padding: 20,

            justifyContent: "center",
            alignItems: "center",
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowColor: "grey",
            shadowOpacity: 0.8,
            elevation: 2,
          }}
        >
          <View
            style={{
              position: "relative",
              borderTopStartRadius: 8,
              borderTopEndRadius: 8,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                minWidth: "100%",
                height: 200,
              }}
              source={{ uri: item.image }}
            />
            <View style={styles.overlay}></View>
            <Text
              style={{
                position: "absolute",
                top: "40%",
                color: "rgb(255,250,160)",

                fontFamily: "RobotoMono-Light",

                fontSize: 28,
              }}
            >
              {item.country}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#BF360C",
              padding: 10,
              marginTop: 20,
              borderRadius: 8,
              opacity: 0.7,
              width: "100%",
            }}
            onPress={() => navigate("FoodInfo", { recipeId: item.id })}
          >
            <Text style={{ fontSize: 24 }}>RECIPES</Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View>
        <ScrollView style={{}}>
          <Header />
          <SearchBar
            round
            lightTheme
            style={{ borderRadius: 5 }}
            placeholder="Search a recipe..."
            onChangeText={(recipe) => this.updateSearch(recipe)}
          />

          <FlatList
            data={this.state.search}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={{ flex: 1 }}>
            <Image
              source={require("./images/mexican.jpg")}
              style={{
                flex: 1,
                width: "100%",
                height: 800,
                resizeMode: "cover",
                justifyContent: "center",
                opacity: 0.6,
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "red",
    opacity: 0.3,
  },
});

export default Home;
