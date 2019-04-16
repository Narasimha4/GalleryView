
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Masonry from 'react-native-masonry';
import { IMAGES } from './components/GalleryHelper';

// Unsplash API Key
const ACCESS_KEY = 'dbe8c37268b52442b08fa86c8fa140f23837e1cdc9f52f3a8a78f46f1fe0dafa';

export default class Gallery extends Component {
  constructor() {
    super();
    console.disableYellowBox = true
    this.state = {
      columns: 1,
      borderRadius: 30,
      images:[]
    };
    this._loadImages = this._loadImages.bind(this);
  }

  async componentDidMount() {
    
    let imagesData = [];
    let images = await this._loadImages();
    for (let i = 0; i < images.length; i++) {
      imagesData.push({uri:images[i].urls.regular});
    }
    imagesData = imagesData.concat(IMAGES);
    this.setState({ images: imagesData });
  }

  _loadImages() {
    return fetch('https://api.unsplash.com/photos/?client_id=' + ACCESS_KEY)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _handlePress = (column) => {
    if (column === 1) {
      this.setState({ columns: 2 })
    } else if (column === 2) {
      this.setState({ columns: 4 })
    } else {
      this.setState({ columns: 1 })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000'}}>
      <StatusBar barStyle='light-content' />
        <View >
          <TouchableOpacity elevation={5} style={styles.buttonContainer} onPress={() => this._handlePress(this.state.columns)}>
            <Text style={styles.textStyle}>Change View</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 15, padding: 15, borderRadius: 30 }}>
          <Masonry
            spacing={4}
            bricks={this.state.images}
            columns={this.state.columns}
            customImageComponent={FastImage} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
    marginLeft: 230,
    marginRight: 25,
    alignItems: 'center',
    shadowColor: '#FFDF00',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});
