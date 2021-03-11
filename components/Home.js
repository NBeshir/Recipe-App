import React, { Component } from "react";
import { View } from "react-native";
import { RECIPE } from "./shared/recipe";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: RECIPE,
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    const renderFoodItem = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          onPress={() => navigate("FoodList", { recipeId: item.id })}
          leftAvatar={{ source: `${item.image}` }}
        />
      );
    };

    return (
      <FlatList
        data={this.state.recipe}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default Home;
