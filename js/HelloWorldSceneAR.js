"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroARScene, ViroText, ViroConstants, ViroImage } from "react-viro";

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      objects: [],
      imagesShown: [],
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  // Hide the image on click
  hideImage(index) {
    const imgsShown = [...this.state.imagesShown];
    imgsShown[index] = false;
    setState({ imagesShown: imgsShown });
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        {this.state.objects.map((obj, index) => {
          this.state.imagesShown[index] && (
            <ViroImage
              position={(index, index, index)}
              onClick={() => hideImage(index)}
              height={0.25}
              width={0.25}
              placeholderSource={null}
              source={{ uri: obj.source }}
            />
          );
        })}
      </ViroARScene>
    );
  }
  // Set initialized state here
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      const imgUrl =
        "https://w7.pngwing.com/pngs/904/97/png-transparent-beckett-and-bion-the-im-patient-voice-in-psychotherapy-and-literature-the-art-of-ian-miller-amazon-com-highland-christian-church-book-old-shoes-brown-shoe-conversation.png";

      const objs = [
        { source: imgUrl },
        { source: imgUrl },
        { source: imgUrl },
        { source: imgUrl },
      ];
      this.setState({
        text: "Gammel Støvle!",
        objects: objs,
        // Just a list of [true, true, true] for every object
        imagesShown: objs.map((obj) => true),
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

module.exports = HelloWorldSceneAR;
