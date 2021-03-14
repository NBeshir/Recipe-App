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

function RenderItem({ item, onPress }) {
  return item.map((items) => {
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
        <Card key={items.id}>
          <View
            style={{
              position: "relative",
              borderRadius: 8,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                minWidth: "100%",
                height: 200,
                borderBottomRadius: 5,
              }}
              source={{ uri: items.image }}
              //source={require(`${items.url}`)}
            />
            <View style={styles.overlay}></View>
            <Text
              onPress={onPress}
              style={{
                position: "absolute",
                top: "40%",
                color: "#000",
                overlay: "#fff",
                fontFamily: "RobotoMono-Bold",
                opacity: 0.8,
                fontSize: 28,
              }}
            >
              {items.name}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#DDDDDD",
              padding: 10,
            }}
            onPress={onPress}
          >
            <Text>Press Here</Text>
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
  });
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: RECIPES,
      fontsLoaded: false,
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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ backgroundColor: "#CE93D8" }}>
        <Header />
        <RenderItem
          item={this.state.recipes}
          onPress={() => navigate("FoodInfo", {})}
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
