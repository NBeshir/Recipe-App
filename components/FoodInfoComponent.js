import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Button,
  TextInput,
  Share,
} from "react-native";
//import { RECIPES } from "../shared/recipe";
import { COMMENTS } from "../shared/comments";

import {
  Icon,
  Card,
  SocialIcon,
  Rating,
  Input,
  SearchBar,
} from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import * as Animatable from "react-native-animatable";
import InputComponent from "./InputComponent";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const shareRecipe = (title, message, url) => {
  Share.share(
    {
      title: title,
      message: `${title}: ${message} ${url}`,
      url: url,
    },
    {
      dialogTitle: "Share " + "recipe",
    }
  );
};
// key={food.recipeTitle + food.author + food.prep}

class FoodInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // recipes: RECIPES,
      comments: COMMENTS,
      fontsLoaded: false,
      search: [],
      rating: 5,
      author: "",
      comment: "",
    };
  }

  componentDidMount() {
    this.setState({ search: this.props.navigation.state.params.recipes });

    //console.log(this.state.search);
  }

  updateSearch = (recipeToSearch) => {
    const filtered = this.props.navigation.state.params.recipes.filter(
      (food) => {
        return food.recipeTitle
          .toLowerCase()
          .includes(recipeToSearch.toLowerCase());
      }
    );

    this.setState({ search: filtered }, () => {
      console.log(this.state.search);
    });
  };

  render() {
    async function PrintDocument() {
      const html = `<h1> HTML string to print into PDF file</h1>`;
      const { uri } = await Print.printAsync({ html });
      Sharing.shareAsync(uri);
    }
    const specificRecipe = this.state.search;

    const RenderRecipe = ({ recipe }) => {
      if (recipe) {
        return recipe.map((food) => (
          <View
            key={food.recId}
            style={{
              backgroundColor: "#d3d3d3",

              margin: 10,
              padding: 20,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animatable.View
              animation="fadeInDown"
              duration={2000}
              delay={1000}
            >
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 24 }}>{food.recipeTitle}</Text>

                <Text
                  style={{
                    margin: 10,
                    alignContent: "center",
                  }}
                >
                  {food.date}
                </Text>
                <Text>Author:{food.author}</Text>
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
                    padding: 3,
                    margin: 3,
                    opacity: 0.7,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name={"facebook"}
                    type="font-awesome"
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      width: 5,
                      height: 5,
                    }}
                    onPress={() =>
                      shareRecipe(
                        recipe.name,
                        food.description,
                        baseUrl + food.image
                      )
                    }
                  />
                  <Text style={{ padding: 5, margin: 5 }}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#BF360C",
                    padding: 3,
                    margin: 3,
                    opacity: 0.7,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name={"twitter"}
                    type="font-awesome"
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      width: 5,
                      height: 5,
                    }}
                    onPress={() =>
                      shareRecipe(
                        recipe.name,
                        food.description,
                        baseUrl + food.image
                      )
                    }
                  />
                  <Text style={{ padding: 5, margin: 5 }}>Tweet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#BF360C",
                    padding: 3,
                    margin: 3,
                    opacity: 0.7,

                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    light
                    name={"envelope"}
                    type="font-awesome"
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      width: 5,
                      height: 5,
                    }}
                    onPress={() =>
                      shareRecipe(
                        recipe.name,
                        food.description,
                        baseUrl + food.image
                      )
                    }
                  />
                  <Text style={{ padding: 5, margin: 5 }}> Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#BF360C",
                    padding: 3,
                    margin: 3,
                    opacity: 0.7,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name={"print"}
                    type="font-awesome"
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      width: 5,
                      height: 5,
                    }}
                    onPress={() => PrintDocument()}
                  />
                  <Text style={{ padding: 5, margin: 5 }}>Print</Text>
                </TouchableOpacity>
              </View>
              <Card>
                <Image
                  style={{
                    minWidth: "100%",
                    height: 200,
                  }}
                  source={{
                    uri: baseUrl + food.image,
                  }}
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
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
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
              {food.Ingredients.map((ing) => (
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
                  <Text>{`\u2022 ${ing.ingOne}`}</Text>
                  <Text>{`\u2022 ${ing.ingTwo} `}</Text>
                  <Text>{`\u2022 ${ing.ingThree} `}</Text>
                  <Text>{`\u2022 ${ing.ingFour} `}</Text>
                  <Text>{`\u2022 ${ing.ingFive}`}</Text>
                </View>
              ))}
              {food.Instructions.map((ins) => (
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
                  <Text style={{ padding: 5 }}>{`\u2022 ${ins.insOne}  `}</Text>
                  <Text style={{ padding: 5 }}>{` \u2022 ${ins.insTwo}`}</Text>
                  <Text
                    style={{ padding: 5 }}
                  >{` \u2022 ${ins.insThree} `}</Text>
                  <Text
                    style={{ padding: 5 }}
                  >{` \u2022 ${ins.insFour} `}</Text>
                  <Text style={{ padding: 5 }}>{` \u2022 ${ins.insFive}`}</Text>
                </View>
              ))}
              <View
                style={{
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                  margin: 5,
                  padding: 10,
                }}
              >
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
                {food.nutrition.map((nut) => (
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      Serving: {nut.serving} serving |
                    </Text>
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      Calories:{nut.calories} kcal|
                    </Text>
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      Carbohydrates: {nut.carbohydrates} g |
                    </Text>
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      Protein: {nut.protein} g|
                    </Text>
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      Fat: {nut.fat} g|
                    </Text>
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      Saturated Fat: {nut.saturatedfat} g|
                    </Text>
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      Cholestrol: {nut.cholestrol} mg|
                    </Text>
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      Sodium: {nut.sodium} mg|
                    </Text>
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      potassium: {nut.potassium} mg|
                    </Text>
                    <Text style={{ borderColor: "#000", margin: 2 }}>
                      Vitamin A: {nut.vitaminA} IU|
                    </Text>
                  </View>
                ))}
              </View>

              <InputComponent
                text={this.state.text}
                author={this.state.author}
                comments={food.comments}
                onSubmit={this.onSubmit}
              />
            </Animatable.View>
          </View>
        ));
      }
      return <View />;
    };

    return (
      <View>
        <ScrollView>
          <SearchBar
            round
            lightTheme
            style={{ borderRadius: 5 }}
            placeholder="Search a recipe..."
            value={this.state.search}
            onChangeText={(recipeToSearch) => this.updateSearch(recipeToSearch)}
          />

          <RenderRecipe recipe={specificRecipe} />
          <View style={{ flex: 1, backgroundColor: "#0C0CC8", height: 40 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text style={{ color: "#fff" }}>Copyright &copy; CN 2021</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default FoodInfo;
