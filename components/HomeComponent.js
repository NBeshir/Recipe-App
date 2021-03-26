// From popup modal branch
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { SearchBar, Card } from "react-native-elements";
import { RECIPES } from "../shared/recipe";
import Header from "./Header";
import * as Font from "expo-font";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: RECIPES,
      fontsLoaded: false,
      search: RECIPES,
      showModal: false,
      modalHasBeenShowntoUser: false,
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
    const filtered = this.state.recipes.filter((recipes) => {
      return recipes.name.toLowerCase().includes(recipe.toLowerCase());
    });
    this.setState({ search: filtered });
  };

  // Pop-up Modal when user scrolls down the page
  onScrollViewScrolled() {
    if (this.state.modalHasBeenShowntoUser === false) {
      setTimeout(() => {
        this.setState({
          modalHasBeenShowntoUser: true,
          showModal: true,
        });
      }, 2000);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    //key={recipe.title + recipe.author + recipe.prepTime}
    const renderRecipeItem = ({ item }) => {
      if (item) {
        // return item.recipes.map((recipe) => {
        return (
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
                source={{ uri: item.homeImage }}
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
      }

      return <View />;
    };

    return (
      <View>
        <ScrollView onScrollBeginDrag={() => this.onScrollViewScrolled()}>
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
        </ScrollView>
        {/* Modal Content */}
        <Modal transparent={true} visible={this.state.showModal}>
          <View style={styles.modalViewContainerStyle}>
            <View style={styles.modalBackgroundViewStyle}>
              <View style={styles.closeModalContainerStyle}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showModal: false });
                  }}
                >
                  <View>
                    <Text>X</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.modalMainContentContainerStyle}>
                <Text style={styles.modalTitleTextStyle}>
                  Get Recipe Weekly
                </Text>
                <TextInput
                  style={styles.modalInputStyle}
                  placeholder="  Email"
                  keyboardType="email-address"
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showModal: false });
                  }}
                  style={{ width: "80%" }}
                >
                  <View style={styles.submitButtonViewStyle} title="Submit">
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      SUBMIT
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  modalInputStyle: {
    height: 30,
    margin: 15,
    borderWidth: 1,
    width: "80%",
  },
  modalViewContainerStyle: {
    backgroundColor: "#000000aa",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackgroundViewStyle: {
    backgroundColor: "#ffffff",
    margin: 50,
    alignItems: "center",
    borderRadius: 25,
    height: 200,
    width: 300,
  },
  closeModalContainerStyle: {
    alignSelf: "flex-end",
    marginRight: 15,
    marginTop: 15,
  },
  modalMainContentContainerStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitleTextStyle: { fontSize: 25 },
  submitButtonViewStyle: {
    fontSize: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
