import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { RECIPES } from "../shared/recipe";
import { COMMENTS } from "../shared/comments";
import { Icon, Card, SocialIcon, Rating, Input } from "react-native-elements";
import * as Animatable from "react-native-animatable";

function RenderRecipe({ recipe }) {
  if (recipe) {
    recipe.map((rec) =>
      rec.recipes.map((food) => {
        return (
          <ScrollView style={{ backgroundColor: "#d3d3d3" }}>
            <Animatable.View
              animation="fadeInDown"
              duration={2000}
              delay={1000}
            >
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 24 }}>{food.recipeTitle}</Text>
                <Text style={{ margin: 10, alignContent: "center" }}>
                  {food.date}
                </Text>
                <Text>{food.author}</Text>
              </View>

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

              <Card>
                <Image
                  style={{
                    minWidth: "100%",
                    height: 200,
                  }}
                  source={{ uri: food.image }}
                />
                <Rating
                  startingValue={food.rating}
                  readonly
                  imageSize={10}
                  style={{ alignItems: "flex-start", paddingVertical: "5%" }}
                />
                <Text style={{ margin: 10 }}>{food.description}</Text>
              </Card>
              <View
                style={{
                  margin: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ margin: 10 }}>Prep Time </Text>

                  <Text>{food.prep}</Text>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ margin: 10 }}>Cook Time</Text>

                  <Text>{food.cook}</Text>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ margin: 10 }}>Total Time</Text>
                  <Text>{food.total}</Text>
                </View>
              </View>
              <View style={{ margin: 5, padding: 10 }}>
                <Text
                  style={{
                    borderBottomColor: "#000",
                    borderBottomWidth: 1,
                    margin: 5,
                    padding: 10,
                  }}
                >
                  INGREDIENTS
                </Text>
                <Text>{`\u2022 1 large yellow onion, very finely diced`}</Text>
                <Text>{` \u2022 3 cloves garlic, finely minced `}</Text>
                <Text>{` \u2022 Roma tomato, very finely chopped `}</Text>
                <Text>{` \u2022 3 tablespoons tomato paste `}</Text>
                <Text>{` \u2022 1 cup red lentils, rinsed`}</Text>
              </View>
              <View style={{ margin: 5, padding: 10 }}>
                <Text
                  style={{
                    borderBottomColor: "#000",
                    borderBottomWidth: 1,
                    margin: 5,
                    padding: 10,
                  }}
                >
                  INSTRUCTIONS
                </Text>
                <Text
                  style={{ padding: 5 }}
                >{`\u2022 Melt 3 tablespoons of the niter kibbeh in a medium stock pot.  Add the onions and cook over medium-high heat for 8-10 minutes until golden brown.  `}</Text>
                <Text
                  style={{ padding: 5 }}
                >{` \u2022 Add the garlic, tomatoes, tomato paste and 1 tablespoon of the berbere and cook for 5-7 minutes. Reduce the heat if needed to prevent burning.`}</Text>
                <Text
                  style={{ padding: 5 }}
                >{` \u2022 Add the broth and salt, bring it to a boil, reduce the heat to low and cover and simmer the lentils, stirring occasionally, for 40 minutes (adding more broth if needed) or until the lentils are soft. `}</Text>
                <Text
                  style={{ padding: 5 }}
                >{` \u2022 3 tablespoons tomato paste `}</Text>
                <Text
                  style={{ padding: 5 }}
                >{` \u2022 Stir in the remaining tablespoon of niter kibbeh and berbere. Simmer for a couple more minutes. Add salt to taste.`}</Text>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    borderBottomColor: "#000",
                    borderBottomWidth: 1,
                    margin: 5,
                    padding: 10,
                  }}
                >
                  NUTRITION
                </Text>
                <View
                  style={{ flexDirection: "row", margin: 10, flexWrap: "wrap" }}
                >
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    Serving: 1 serving |
                  </Text>
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    Calories: 227kcal|
                  </Text>
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    Carbohydrates: 23g|
                  </Text>
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    Protein: 10g|
                  </Text>
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    Fat: 10g|
                  </Text>
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    Saturated Fat: 6g|
                  </Text>
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    Cholestrol: 25mg|
                  </Text>
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    Sodium: 483mg|
                  </Text>
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    potassium:509mg|
                  </Text>
                  <Text
                    style={{ borderRight: 1, borderColor: "#000", margin: 2 }}
                  >
                    Vitamin A:220IU|
                  </Text>
                </View>
              </View>
            </Animatable.View>
          </ScrollView>
        );
      })
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
      comments: COMMENTS,
      fontsLoaded: false,
      rating: 5,
      author: "",
      comment: "",
    };
  }

  render() {
    const recipeId = this.props.navigation.getParam("recipeId");
    const recipe = this.state.recipes.filter(
      (recipe) => recipe.id === recipeId
    )[0];

    return (
      <ScrollView>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderRecipe recipe={recipe} />
          <RenderComments comments={comments} />
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default FoodInfo;
