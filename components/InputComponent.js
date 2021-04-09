import React, { Component } from "react";
import { TextInput, View, Text, Button, StyleSheet } from "react-native";
import { Rating } from "react-native-elements";
import { connect } from "react-redux";
import { fetchComments, postComment } from "../redux/ActionCreators";

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  fontsLoaded: false,

      rating: 5,
      author: "",
      text: "",
    };
  }

  submitComment(recipeId) {
    this.props.postComment(
      recipeId,
      this.state.rating,
      this.state.author,
      this.state.text
    );
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: "",
      text: "",
    });
  }
  // this.state.comments.push({
  //   commentId: this.props.comments.length++,
  //   rating: this.state.rating,
  //   text: this.state.text,
  //   author: this.state.author,

  //   date: new Date().toLocaleDateString("en-US"),
  // });

  // const message = this.props.comments.concat(this.state.comments);

  // this.setState({
  //   comments: message,
  // });

  //console.log(postComment);

  // componentDidMount() {
  //   fetchComments();
  // console.log("hello");
  //}
  render() {
    console.log(this.props.comments);

    const recipeId = this.props.recipeId;
    recId = this.props.recId; // id for individual recipes
    const comments = this.props.comments.comments.filter(
      (comment) => comment.recipeId === recId
    );

    return (
      <View style={styles.container}>
        <Text style={styles.containerText}>Reviews</Text>

        <View style={{}}>
          <Rating
            showRating
            imageSize={40}
            onFinishRating={(rating) => this.setState({ rating: rating })}
            style={{ paddingVertical: 10 }}
          />

          <TextInput
            style={styles.authorText}
            placeholder="Author"
            onChangeText={(author) => this.setState({ author: author })}
            //value="author"
          />

          <TextInput
            style={styles.commentText}
            placeholder="Comment"
            onChangeText={(comment) => this.setState({ text: comment })}
            // value="text"
          />

          <View style={{ margin: 10 }}>
            <Button
              title="Submit"
              color="#5637DD"
              onPress={() => {
                this.submitComment(recipeId);
                this.resetForm();
              }}
            />
          </View>
        </View>

        {comments.map((comment) => {
          // this.props.comments.map(comment) => comment
          return (
            <View style={{ backgroundColor: "#C0C0C0", width: "100%" }}>
              <View style={{ margin: 0 }}>
                <View key={comment.id} style={styles.CommentView}>
                  <Text style={{ fontSize: 14 }}>{comment.text}</Text>
                  <Rating
                    startingValue={comment.rating}
                    readonly
                    imageSize={10}
                    style={styles.rating}
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

mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};

mapDispatchToProps = {
  postComment: (recipeId, rating, author, text) =>
    postComment(recipeId, rating, author, text),
  fetchComments,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    backgroundColor: "#fff",
  },
  containerText: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    margin: 5,
    padding: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  authorText: {
    backgroundColor: "#D3D3D3",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 15,
  },
  commentText: {
    backgroundColor: "#D3D3D3",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    padding: 5,
  },
  commentView: {
    margin: 10,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    alignItems: "flex-start",
    paddingVertical: "5%",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(InputComponent);
