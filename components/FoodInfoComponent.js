import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";

import { connect } from "react-redux";

import { Icon, Card, Rating, SearchBar } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import * as Animatable from "react-native-animatable";
import InputComponent from "./InputComponent";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { postFavorite } from "../redux/ActionCreators";

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

class FoodInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      search: [],
    };
  }

  markFavorite(recipeId) {
    //console.log("postFavorite", this);
    this.props.postFavorite(recipeId);
  }

  componentDidMount() {
    this.setState({ search: this.props.navigation.state.params.recipes });

    // console.log(this.state.search);
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
      //console.log(this.state.search);
    });
  };

  static navigationOptions = {
    title: "Recipes",
  };
  render() {
    async function PrintDocument() {
      const html = `<h1> HTML string to print into PDF file</h1>`;
      const { uri } = await Print.printAsync({ html });
      Sharing.shareAsync(uri);
    }

    const specificRecipe = this.state.search;

    const RenderRecipe = ({ recipe, markFavorite }) => {
      if (recipe) {
        return recipe.map((food) => {
          const favorite = this.props.favorites.includes(food.recId);
          return (
            <View key={food.recId} style={styles.main}>
              <Animatable.View
                animation="fadeInDown"
                duration={2000}
                delay={1000}
              >
                <View style={styles.header}>
                  <Text style={{ fontSize: 24 }}>{food.recipeTitle}</Text>

                  <Text>Author:{food.author}</Text>
                  <Text
                    style={{
                      margin: 10,
                      alignContent: "center",
                    }}
                  >
                    {food.date}
                  </Text>
                </View>
                <View style={styles.icons}>
                  <TouchableOpacity style={styles.facebookTouchable}>
                    <Icon
                      name={"facebook"}
                      type="font-awesome"
                      style={styles.facebookIcon}
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

                  <TouchableOpacity style={styles.twitterTouchable}>
                    <Icon
                      name={"twitter"}
                      type="font-awesome"
                      style={styles.twitterIcon}
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

                  <TouchableOpacity style={styles.printTouchable}>
                    <Icon
                      name={"print"}
                      type="font-awesome"
                      style={styles.printIcon}
                      onPress={() => PrintDocument()}
                    />
                    <Text style={{ padding: 5, margin: 5 }}>Print</Text>
                  </TouchableOpacity>
                </View>

                <Card>
                  <Image
                    style={styles.image}
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
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Icon
                      name={favorite ? "heart" : "heart-o"}
                      type="font-awesome"
                      color="#f50"
                      raised
                      reverse
                      onPress={() =>
                        favorite
                          ? console.log("Already set as a favorite")
                          : markFavorite(food.recId)
                      }
                    />
                  </View>

                  <Text style={{ margin: 5 }}>{food.description}</Text>
                </Card>
                <View style={styles.recipeDetails}>
                  <View style={styles.prepTime}>
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
                  <View style={{ margin: 5, padding: 10 }} key={ing.ingId}>
                    <Text style={styles.ingredients}>INGREDIENTS</Text>
                    <Text>{`\u2022 ${ing.ingOne}`}</Text>
                    <Text>{`\u2022 ${ing.ingTwo} `}</Text>
                    <Text>{`\u2022 ${ing.ingThree} `}</Text>
                    <Text>{`\u2022 ${ing.ingFour} `}</Text>
                    <Text>{`\u2022 ${ing.ingFive}`}</Text>
                  </View>
                ))}
                {food.Instructions.map((ins) => (
                  <View style={{ margin: 5, padding: 10 }} key={ins.insId}>
                    <Text style={styles.instructions}>INSTRUCTIONS</Text>
                    <Text
                      style={{ padding: 5 }}
                    >{`\u2022 ${ins.insOne}  `}</Text>
                    <Text
                      style={{ padding: 5 }}
                    >{` \u2022 ${ins.insTwo}`}</Text>
                    <Text
                      style={{ padding: 5 }}
                    >{` \u2022 ${ins.insThree} `}</Text>
                    <Text
                      style={{ padding: 5 }}
                    >{` \u2022 ${ins.insFour} `}</Text>
                    <Text
                      style={{ padding: 5 }}
                    >{` \u2022 ${ins.insFive}`}</Text>
                  </View>
                ))}
                <View style={styles.nutritionView}>
                  <Text style={styles.nutritionText}>NUTRITION</Text>
                  {food.nutrition.map((nut) => (
                    <View style={styles.nutritionDetails} key={nut.nutId}>
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
                  onSubmit={this.onSubmit}
                  recipeTypes={food.recId}
                />
              </Animatable.View>
            </View>
          );
        });
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

          <RenderRecipe
            recipe={specificRecipe}
            markFavorite={(recipeId) => this.markFavorite(recipeId)}
          />
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
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,

    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  postFavorite,
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#d3d3d3",
    margin: 5,

    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    margin: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",

    padding: 5,

    justifyContent: "center",
  },
  facebookTouchable: {
    backgroundColor: "#BF360C",
    padding: 5,
    margin: 5,
    opacity: 0.7,
    flexDirection: "row",
    alignItems: "center",
  },
  facebookIcon: {
    flexDirection: "row",
    alignContent: "center",
    width: 5,
    height: 5,
  },
  twitterTouchable: {
    backgroundColor: "#BF360C",
    padding: 5,
    margin: 5,
    opacity: 0.7,
    flexDirection: "row",
    alignItems: "center",
  },
  twitterIcon: {
    flexDirection: "row",
    alignContent: "center",
    width: 5,
    height: 5,
  },
  printTouchable: {
    backgroundColor: "#BF360C",
    padding: 5,
    margin: 5,
    opacity: 0.7,
    flexDirection: "row",
    alignItems: "center",
  },
  printIcon: {
    flexDirection: "row",
    alignContent: "center",
    width: 5,
    height: 5,
  },
  image: {
    minWidth: "100%",
    height: 200,
  },
  recipeDetails: {
    margin: 10,
    flexDirection: "row",
  },
  prepTime: {
    justifyContent: "center",
    alignItems: "center",
  },
  ingredients: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    margin: 5,
    padding: 10,
  },
  instructions: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    margin: 5,
    padding: 10,
  },
  nutritionView: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    margin: 5,
    padding: 10,
  },
  nutritionText: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    margin: 5,
    padding: 10,
  },
  nutritionDetails: {
    flexDirection: "row",
    margin: 10,
    flexWrap: "wrap",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodInfo);
