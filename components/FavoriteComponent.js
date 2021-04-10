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
    const renderFavoriteItem = ({ item }) => {
      return (
        <View key={item.id}>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.country}>{item.country}</Text>
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

          <View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Delete Favorite?",
                  "Are you sure you wish to delete your favorite  " +
                    item.name +
                    "recipe" +
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
              <Text style={styles.deleteFavorite}>Delete Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <FlatList
          data={this.props.recipes.filter((recipe) =>
            this.props.favorites.includes(recipe.id)
          )}
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

const styles = StyleSheet.create({
  deleteFavorite: {
    backgroundColor: "#FD202D",
    color: "white",
    fontWeight: "700",
    marginLeft: 110,
    marginTop: 10,
    padding: 10,
    textAlign: "center",
    fontSize: 16,
    width: 150,
  },
  country: {
    fontSize: 20,
    color: "#2B0306",
    margin: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
