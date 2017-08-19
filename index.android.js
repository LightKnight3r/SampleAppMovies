/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
let REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';

export default class AppMovies extends Component {

  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  render() {
    const  {navigate}  = this.props.navigation;
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie.bind(this)}
        style={styles.listView}
      />
    );
  }

   renderLoadingView() {
     return (
       <View style={styles.container}>
         <Text>
           Loading movies...
         </Text>
       </View>
     );
   }
   renderMovie(movie) {

     return (
       <View style={styles.container}>
         <Image
           source={{uri: movie.posters.thumbnail}}
           style={styles.thumbnail}
         />
         <View style={styles.rightContainer}>
           <Text style={styles.title}>{movie.title}</Text>
           <Text style={styles.year}>{movie.year}</Text>
           <Button
                  onPress={() => {
                        this.props.navigation.navigate('Details',movie);
                        }
                  }
                  title="Details"
                  color="#000000"
                  accessibilityLabel="aaaa"
          />
         </View>
       </View>
     );
   }
 componentDidMount() {
   this.fetchData();
 }
 fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }
}
class Details extends Component{
  static navigationOptions = {
    title: 'The Details Of Movies',
  };
  render() {
    console.log(this.props.navigation.state.params);
    return (
      <View style={styles.details}>
        <Image
          source={{uri: this.props.navigation.state.params.posters.thumbnail}}
          style={styles.thumbnails}
        />
        <View style={styles.subDetails}>
          <Text style={{fontWeight: 'bold', fontSize: 30, color : "#e00b0b" }}>{this.props.navigation.state.params.title }</Text>
          <Text style={{fontWeight: 'bold', fontSize: 30, color:"#1b26ba"}}>{this.props.navigation.state.params.year }</Text>
          <Text>ON {this.props.navigation.state.params.release_dates.theater}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subDetails: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a7b7d1',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontWeight:"bold",
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
    fontWeight:'bold',
  },
  thumbnail: {
    borderRadius:35,
    width: 70,
    height: 70,
  },
  thumbnails: {
    width: 100,
    height: 150,
  },
  listView: {
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
});
const SampleAppMovies = StackNavigator({
  Home: { screen: AppMovies },
  Details: { screen: Details },
});
AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);
