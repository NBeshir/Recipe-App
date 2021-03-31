import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

import { RECIPES } from "../shared/recipe";

class RouteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: RECIPES,
      fontsLoaded: false,
      route: "taiwanese",
    };
  }
  onRouteChange(route) {
    this.setState({ route: route });
  }
  render() {
    return (
      <View>
        {this.state.route === "home" ? (
          <Home
            onRouteChange={(route) => this.onRouteChange(route)}
            recipes={this.state.recipes}
          />
        ) : "taiwanese" ? (
          <Taiwanese />
        ) : "ethopian" ? (
          <Ethiopian />
        ) : "american" ? (
          <American />
        ) : "Indian" ? (
          <Indian />
        ) : (
          <Thai />
        )}
      </View>
    );
  }
}

export default RouteComponent;
