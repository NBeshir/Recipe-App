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
//import { RECIPES } from "../shared/recipe";
import Header from "./Header";
import { baseUrl } from "../shared/baseUrl";
import * as Font from "expo-font";
import FoodInfo from "./FoodInfoComponent";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      fontsLoaded: false,
      search: [],
      data: [],
      comments: [],
    };
  }

  static navigationOptions = {
    title: "Home",
  };

  // handleComments = () => {
  //   console.log(this.state.comments);
  // };
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
  //commentsArray = RECIPES.comments;
  componentDidMount() {
    fetch(baseUrl + "RECIPES")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ recipes: [...this.state.recipes, data] });
        // console.log(this.state.recipes);
      });

    fetch(baseUrl + "RECIPES.comments")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ comments: [...this.state.comments, data] });
        console.log(this.state.comments);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    // const com = this.state.comments.map((comm) => comm);
    //key={recipe.title + recipe.author + recipe.prepTime}
    function renderRecipeItem({ item }) {
      if (item) {
        return item.map((i, id) => (
          <View
            //  key={item.recipeTitle + item.author + item.prep}
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
                source={{ uri: baseUrl + i.homeImage }}
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
                {i.country}
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
              // onPress={() => navigate("FoodInfo", { recipeId: item.id })}

              onPress={() => {
                navigate("FoodInfo", {
                  recipes: i.recipes,
                  comments: i.comments,
                });
              }}
            >
              <Text style={{ fontSize: 24 }}>RECIPES</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleComments}>
              <Text> hello</Text>
            </TouchableOpacity>
          </View>
        ));
      }
      return <View />;
    }

    return (
      <View>
        <ScrollView style={{}}>
          <Header />

          <FlatList
            data={this.state.recipes}
            renderItem={renderRecipeItem}
            //keyExtractor={(item) => item.id.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}
// <TouchableOpacity onPress={this.updateSearch}>
//   <Text>Search</Text>
// </TouchableOpacity>
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
