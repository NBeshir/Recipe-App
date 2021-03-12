import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

import { FlatList } from "react-native";
import { ListItem, Card } from "react-native-elements";
import { RECIPES } from "../shared/recipe";

function RenderItem({ item, onPress }) {
  return item.map((items) => {
    return (
      <Card
        key={items.id}
        style={{ borderRadius: 15 }}
        featuredTitle={items.name}
        image={require("./images/taiwanese.jpg")}
      >
        <View
          style={{
            backgroundColor: "#888",
            position: "relative",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          <Image
            style={{ width: "100%", height: 200 }}
            source={require("./images/taiwanese.jpg")}
            //source={require(`${items.url}`)}
          />
          <Text
            onPress={onPress}
            style={{
              position: "absolute",
              top: "40%",
              color: "#555",
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            {items.name}
          </Text>
          <Text style={{ margin: 10, fontSize: 16 }}>{items.description}</Text>
        </View>
      </Card>
    );
  });
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: RECIPES,
    };
  }
  static navigationOptions = {
    title: "Home",
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <RenderItem
          item={this.state.recipes}
          onPress={() => navigate("FoodInfo", {})}
        />
      </ScrollView>
    );
  }
}

export default Home;
