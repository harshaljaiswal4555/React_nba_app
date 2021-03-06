
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LogoTitle from '../../utils/logo';
import { connect } from 'react-redux';
import { getGames } from '../../store/actions/games_actions';
import Moment from 'moment';


class GamesComponent extends Component {
  static navigationOptions = {

    headerTitleAlign: 'center',
    headerTitle: () => (<LogoTitle />),
    headerStyle: {
      backgroundColor: '#001338'
    },
    headerTintColor: 'blue',
  }

  componentDidMount() {
    this.props.dispatch(getGames());
  }

  showGames = (list) => (
    // console.log(list)
    list.games ?
      list.games.map((item, i) => {
        return (
          // console.log(item)
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Article', {
              ...item
            })}
            key={i}
          >
            <View style={styles.gameContainer}>
              <View style={styles.gameBox}>
                <Image
                  // {...console.log(item.awayData.logo)}
                  source={{ uri: item.awayData.logo }}
                  style={{ height: 80, width: 80 }}
                  resizeMode='contain'
                />
                <Text style={styles.teamRecord}> {item.awayData.wins} - {item.awayData.loss}</Text>
              </View>
              <View style={styles.gameBox}>
                <Text style={styles.gameTime}> {item.time}</Text>
                <Text > {Moment(item.date).format('d MMMM')}</Text>
              </View>
              <View style={styles.gameBox}>
                <Image
                  // {...console.log(item.awayData.logo)}
                  source={{ uri: item.localData.logo }}
                  style={{ height: 80, width: 80 }}
                  resizeMode='contain'
                />
                <Text style={styles.teamRecord}> {item.localData.wins} - {item.localData.loss}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })
      :
      null
  )

  render() {

    return (
      <ScrollView style={{ backgroundColor: '#f0f0f0' }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          flexWrap: 'nowrap'
        }}>

          {this.showGames(this.props.Games)}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2,
  },
  gameBox: {
    width: '33.3%',
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamRecord: {
    fontFamily: 'Roboto-Light',
    fontSize: 12
  },
  gameTime:{
    fontFamily:'Roboto-Bold',
    fontSize:15
  }
});

function mapStateToProps(state) {

  return {
    Games: state.Games
  }
}

export default connect(mapStateToProps)(GamesComponent);