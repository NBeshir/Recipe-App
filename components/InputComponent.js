import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  TouchableHighlightBase,
} from "react-native";
import {
  Icon,
  Card,
  SocialIcon,
  Rating,
  Input,
  SearchBar,
} from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // recipes: RECIPES,
      comments: [],
      //  fontsLoaded: false,
      search: [],
      rating: 5,
      author: "",
      text: "",
    };
  }
  // onChangeHandler(text, field) {
  //   // this.setState({ text: comment });

  //   if (field === "author") {
  //     //setTimeout(() => {
  //     //this.setState({ author: text });
  //     // }, 60000);
  //     this.setState({ author: text });
  //   }
  //   {
  //     if (field === "comment") {
  //       // setTimeout(() => {
  //       //   this.setState({ author: text });
  //       // }, 60000);
  //       this.setState({ comment: text });

  //       console.log(this.state.comment);
  //     }
  //   }
  // }

  submitComment() {
    // let collection = {};

    // (collection.rating = this.state.rating),
    //   (collection.author = this.state.author),
    //   (collection.text = this.state.text),
    //   (collection.date = new Date().toLocaleDateString("en-US"));
    //
    this.state.comments.push({
      commentId: this.props.comments.length++,
      rating: this.state.rating,
      text: this.state.text,
      author: this.state.author,

      date: new Date().toLocaleDateString("en-US"),
    });

    const message = this.props.comments.concat(this.state.comments);

    this.setState({
      comments: message,
    });

    console.log(message);
  }

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderColor: "red",
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            borderBottomColor: "#000",
            borderBottomWidth: 1,
            margin: 5,
            padding: 10,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Reviews
        </Text>

        <View style={{}}>
          <Rating
            showRating
            imageSize={40}
            onFinishRating={(rating) => this.setState({ rating: rating })}
            style={{ paddingVertical: 10 }}
          />

          <TextInput
            placeholder="Author"
            onChangeText={(text) => this.setState({ author: text })}
            //value="author"
            style={{
              backgroundColor: "#D3D3D3",
              borderBottomColor: "#000000",
              borderBottomWidth: 1,
              padding: 5,
              marginBottom: 15,
            }}
          />

          <TextInput
            placeholder="Comment"
            onChangeText={(comment) => this.setState({ text: comment })}
            // value="text"
            style={{
              backgroundColor: "#D3D3D3",
              borderBottomColor: "#000000",
              borderBottomWidth: 1,
              padding: 5,
            }}
          />

          <View style={{ margin: 10 }}>
            <Button
              title="Submit"
              color="#5637DD"
              onPress={() => this.submitComment()}
            />
          </View>

          <View style={{ margin: 10 }}>
            <Button
              // onPress={() => {
              //   this.toggleModal();
              //   this.resetForm();
              // }}
              color="#808080"
              title="Cancel"
            />
          </View>
        </View>

        {this.state.comments.map((comment) => {
          return (
            <View style={{ backgroundColor: "#C0C0C0", width: "100%" }}>
              <View style={{ margin: 0 }}>
                <View
                  key={comment.commentId}
                  style={{
                    margin: 10,
                    borderColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTop: 1,
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{comment.text}</Text>

                  <Rating
                    startingValue={comment.rating}
                    readonly
                    imageSize={10}
                    style={{
                      alignItems: "flex-start",
                      paddingVertical: "5%",
                    }}
                  />
                  <Text style={{ fontSize: 12 }}>
                    {`--${comment.author}, ${comment.date}`}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default InputComponent;
