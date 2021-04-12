import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  Image,
  Share,
} from "react-native";
import { Card, Rating, Icon } from "react-native-elements";
import { deleteFavorite } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";
import * as Print from "expo-print";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const shareRecipe = (title, message, url) => {
  Share.share(
    {
      title: title,
      message: `${title}: ${message} ${url}`,
      url: url,
    },
    {
      dialogTitle: "Share " + title + " recipe",
    }
  );
};

class Favorite extends Component {
  static navigationOptions = {
    title: "My Favorites",
  };

  render() {
    //const recipe = this.props.recipes.map((recipes) => recipes);
    const reduceRecipe = this.props.recipes
      .map((recipeType) => {
        return recipeType.recipes;
      })
      .flat();

    const renderFavoriteItem = ({ item }) => {
      return (
        <View key={item.recId} style={{ backgroundColor: "#EFEAEE" }}>
          <View style={{ marginBottom: 30, backgroundColor: "#DAF7A6" }}>
            <View style={styles.title}>
              <Text style={styles.recipeTitle}>{item.recipeTitle}</Text>
              <Text style={{ padding: 10 }}> Author:{item.author}</Text>
              <Text
                style={{
                  margin: 10,
                  alignContent: "center",
                }}
              >
                {item.date}
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
                      item.recipeTitle,
                      item.description,
                      baseUrl + item.image
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
                      item.recipeTitle,
                      item.description,
                      baseUrl + item.image
                    )
                  }
                />
                <Text style={{ padding: 5, margin: 5 }}>Tweet</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mailTouchable}>
                <Icon
                  name={"envelope"}
                  type="font-awesome"
                  style={styles.mailIcon}
                  onPress={() =>
                    shareRecipe(
                      item.recipeTitle,
                      item.description,
                      baseUrl + item.image
                    )
                  }
                />
                <Text style={{ padding: 5, margin: 5 }}>Mail</Text>
              </TouchableOpacity>
            </View>
            <Card>
              <Image
                style={styles.image}
                source={{
                  uri: baseUrl + item.image,
                }}
              />
              <Rating
                startingValue={item.rating}
                readonly
                imageSize={10}
                style={{ alignItems: "flex-start", paddingVertical: "5%" }}
              />

              <Text style={{ margin: 5 }}>{item.description}</Text>
            </Card>
            <View style={styles.recipeDetails}>
              <View style={styles.prepTime}>
                <Text style={{ margin: 10 }}>Prep Time </Text>

                <Text>{item.prep}</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ margin: 10 }}>Cook Time</Text>

                <Text>{item.cook}</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ margin: 10 }}>Total Time</Text>
                <Text>{item.total}</Text>
              </View>
            </View>
            {item.Ingredients.map((ing) => (
              <View style={{ margin: 5, padding: 10 }} key={ing.ingId}>
                <Text style={styles.ingredients}>INGREDIENTS</Text>
                <Text>{`\u2022 ${ing.ingOne}`}</Text>
                <Text>{`\u2022 ${ing.ingTwo} `}</Text>
                <Text>{`\u2022 ${ing.ingThree} `}</Text>
                <Text>{`\u2022 ${ing.ingFour} `}</Text>
                <Text>{`\u2022 ${ing.ingFive}`}</Text>
              </View>
            ))}
            {item.Instructions.map((ins) => (
              <View style={{ margin: 5, padding: 10 }} key={ins.insId}>
                <Text style={styles.instructions}>INSTRUCTIONS</Text>
                <Text style={{ padding: 5 }}>{`\u2022 ${ins.insOne}  `}</Text>
                <Text style={{ padding: 5 }}>{` \u2022 ${ins.insTwo}`}</Text>
                <Text style={{ padding: 5 }}>{` \u2022 ${ins.insThree} `}</Text>
                <Text style={{ padding: 5 }}>{` \u2022 ${ins.insFour} `}</Text>
                <Text style={{ padding: 5 }}>{` \u2022 ${ins.insFive}`}</Text>
              </View>
            ))}
            <View style={styles.nutritionView}>
              <Text style={styles.nutritionText}>NUTRITION</Text>
              {item.nutrition.map((nut) => (
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
            <View style={styles.favoriteAlert}>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Delete Favorite?",
                    "Are you sure you wish to delete your favorite  " +
                      item.recipeTitle +
                      " recipe" +
                      "?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log(item.name + "Not Deleted"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => this.props.deleteFavorite(item.recId),
                      },
                    ],
                    { cancelable: false }
                  )
                }
              >
                <Text style={styles.deleteFavorite}>Delete Favorite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <FlatList
          data={reduceRecipe.filter((recipe) =>
            this.props.favorites.includes(recipe.recId)
          )}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.recId.toString()}
        />
      </Animatable.View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,

    favorites: state.favorites,
  };
};
mapDispatchToProps = {
  deleteFavorite: (recipeId) => deleteFavorite(recipeId),
};

const styles = StyleSheet.create({
  deleteFavorite: {
    backgroundColor: "#FD202D",
    color: "white",
    fontWeight: "700",
    marginLeft: 110,
    marginTop: 10,
    padding: 15,
    textAlign: "center",
    fontSize: 16,
    width: 150,
  },

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
  mailTouchable: {
    backgroundColor: "#BF360C",
    padding: 5,
    margin: 5,
    opacity: 0.7,
    flexDirection: "row",
    alignItems: "center",
  },
  mailIcon: {
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
  recipeTitle: {
    color: "#581845",
    fontSize: 24,
  },
  favoriteAlert: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  title: {
    marginTop: 10,

    alignItems: "center",
    padding: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
