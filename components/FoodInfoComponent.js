import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { RECIPES } from "../shared/recipe";
import { Icon, Card, SocialIcon } from "react-native-elements";

function RenderRecipe({ recipe }) {
  if (recipe) {
    return (
      <Card>
        <View>
          <Text>{recipe.recipeTitle}</Text>
          <Text style={{ margin: 10, alignContent: "center" }}>
            {recipe.date}
          </Text>

          <View
            style={{
              flexDirection: "row",

              padding: 5,
              margin: 5,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#BF360C",
                padding: 10,
                margin: 5,
                opacity: 0.7,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SocialIcon
                type="facebook"
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  width: 20,
                  height: 20,
                }}
              />
              <Text>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#BF360C",
                padding: 10,
                margin: 5,
                opacity: 0.7,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SocialIcon
                type="twitter"
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  width: 20,
                  height: 20,
                }}
              />
              <Text style={{ padding: 5, margin: 5 }}>Tweet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#BF360C",
                padding: 10,
                margin: 5,
                opacity: 0.7,
                width: 100,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SocialIcon
                light
                type="envelope"
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  width: 20,
                  height: 20,
                }}
              />
              <Text>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image
          style={{
            minWidth: "100%",
            height: 200,
          }}
          source={{ uri: recipe.image }}
        />

        <Text style={{ margin: 10 }}>{recipe.description}</Text>
      </Card>
    );
  }
  return <View />;
}

class FoodInfo extends Component {
  //const recipeId = this.props.navigation.getParam("recipeId");
  //console.log(route.params);
  constructor(props) {
    super(props);
    this.state = {
      recipes: RECIPES,
      fontsLoaded: false,
    };
  }

  render() {
    const recipeId = this.props.navigation.getParam("recipeId");
    const recipe = this.state.recipes.filter(
      (recipe) => recipe.id === recipeId
    )[0];
    return <RenderRecipe recipe={recipe} />;
  }
}
export default FoodInfo;
