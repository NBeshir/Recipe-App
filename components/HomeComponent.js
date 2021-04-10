import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native";

import Header from "./Header";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import * as Font from "expo-font";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  static navigationOptions = {
    title: "Home",
  };

  async loadFonts() {
    await Font.loadAsync({
      "RobotoMono-Italic": require("../assets/fonts/RobotoMono-Italic.ttf"),
      "RobotoMono-Regular": require("../assets/fonts/RobotoMono-Regular.ttf"),
      "RobotoMono-Bold": require("../assets/fonts/RobotoMono-Bold.ttf"),
      "RobotoMono-Light": require("../assets/fonts/RobotoMono-Light.ttf"),
    }).catch((err) => {
      console.log(err.message);
    });
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
  }

  render() {
    const { navigate } = this.props.navigation;

    function renderRecipeItem({ item }) {
      if (item) {
        return (
          <View key={item.id} style={styles.renderItem}>
            <View style={styles.contentBox}>
              <Image
                style={styles.imageStyle}
                source={{ uri: baseUrl + item.homeImage }}
              />
              <View style={styles.overlay}></View>
              <Text style={styles.country}>{item.country}</Text>
            </View>
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                navigate("FoodInfo", {
                  recipes: item.recipes,
                  recipeId: item.id,
                });
              }}
            >
              <Text style={{ fontSize: 24 }}>RECIPES</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return <View />;
    }

    return (
      <View>
        <ScrollView style={{}}>
          <Header />

          <FlatList
            data={this.props.recipes.recipes}
            //data={this.state.recipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

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
  renderItem: {
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
  },
  contentBox: {
    position: "relative",
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    minWidth: "100%",
    height: 200,
  },
  country: {
    position: "absolute",
    top: "40%",
    color: "rgb(255,250,200)",

    fontFamily: "RobotoMono-Bold",

    fontSize: 28,
  },
  touchableStyle: {
    alignItems: "center",
    backgroundColor: "#BF360C",
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    opacity: 0.7,
    width: "100%",
  },
});

export default connect(mapStateToProps)(Home);
