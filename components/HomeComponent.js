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
import { FlatList } from "react-native";
import { ListItem, Card } from "react-native-elements";
import { RECIPES } from "../shared/recipe";
import Header from "./Header";
import * as Font from "expo-font";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: RECIPES,
      fontsLoaded: false,
      selectedRecipe: null,
    };
  }
  static navigationOptions = {
    title: "Home",
  };

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      "RobotoMono-Italic": require("../assets/fonts/RobotoMono-Italic.ttf"),
      "RobotoMono-Regular": require("../assets/fonts/RobotoMono-Regular.ttf"),
      "RobotoMono-Bold": require("../assets/fonts/RobotoMono-Bold.ttf"),

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

  onRecipeSelect(recipeId) {
    this.setState({ selectedRecipe: recipeId });
  }

  render() {
    const { navigate } = this.props.navigation;

    // const recipeId = this.props.navigation.getParam("recipeId");

    const renderRecipeItem = ({ item }) => {
      return (
        <View
          style={{
            borderRadius: 8,
            margin: 10,
            padding: 5,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card key={item.id}>
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

                  fontFamily: "RobotoMono-Bold",

                  fontSize: 28,
                }}
                onPress={() => navigate("FoodInfo", { recipeId: item.id })}
              >
                {item.name}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#BF360C",
                padding: 10,
                opacity: 0.7,
              }}
            >
              <Text style={{ fontFamily: "RobotoMono-Bold", fontSize: 24 }}>
                RECIPES
              </Text>
            </TouchableOpacity>
            {/*<Text
                //   style={{
                //     margn: 10,
                //     fontSize: 16,
                //     fontFamily: "RobotoMono-Italic",
                //   }}
                // >
                //   {items.description}
                // </Text>*/}
          </Card>
        </View>
      );
    };

    return (
      <ScrollView style={{ backgroundColor: "rgb(180,40,150)" }}>
        <Header />
        <FlatList
          data={this.state.recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
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
