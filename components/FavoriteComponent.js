import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { deleteFavorite } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

class Favorite extends Component {
  static navigationOptions = {
    title: "My Favorites",
  };
  render() {
    // console.log(
    //   this.props.recipes
    //     .map((recipes) => recipes.recipes)
    //     .map((Object) => Object)

    //Object.entries(Objects))
    //.filter((a) => a.recId)
    //);
    // this.props.recipes.map((recipe) =>
    //   Object.keys(recipe).map((r) => console.log(r))
    // );
    // const a = this.props.recipes.map(recipes.Object.key(recipes));
    // console.log(a);

    // .map(function (key) {
    // console.log(this.props.recipes["recipes"][key].description);["recipes"]);

    // this.props.recipes.map((recipe) =>
    //   Object.keys(recipe).map((a) => console.log(a))
    // );
    // .forEach((item) =>
    //   console.log(`${this.props.recipes[item].name} ${item}s each cost
    //   ${this.props.recipes[item].country}`)
    // const recipee = this.props.recipes.map((recipe) => recipe.recipes);
    const renderFavoriteItem = ({ item }) => {
      //if (item) {

      return (
        <View key={item.id}>
          <View //style={styles.deleteView}
          >
            <TouchableOpacity
              //style={styles.deleteTouchable}
              onPress={() =>
                Alert.alert(
                  "Delete Favorite?",
                  "Are you sure you wish to delete your favorite recipe " +
                    item.name +
                    "?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log(item.name + "Not Deleted"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => this.props.deleteFavorite(item.id),
                    },
                  ],
                  { cancelable: false }
                )
              }
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>{item.country}</Text>
              <Text>{item.description}</Text>
            </View>
            <Image
              style={{
                minWidth: "100%",
                height: 200,
              }}
              source={{ uri: baseUrl + item.homeImage }}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("FoodInfo", {
                  recipeId: item.id,
                })
              }
            />
          </View>
        </View>
      );
    };

    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <FlatList
          // data={this.props.recipes.filter((recipe) =>
          //   this.props.favorites.includes(recipe.id)
          // )}
          data={this.props.recipes
            //.map((rec) => rec.recipes)
            .filter((recipe) => this.props.favorites.includes(recipe.id))}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id.toString()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
