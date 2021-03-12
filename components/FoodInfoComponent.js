import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class FoodInfo extends Component {
  render() {
    const recipeId = this.props.navigation.getParam("recipeId");
    return (
      <View>
        <Text>Hello from food info</Text>
      </View>
    );
  }
}
