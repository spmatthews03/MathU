import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, ScrollView, TouchableHighlight, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import {Button, Divider} from 'react-native-elements';
import ProblemCard from '../components/ProblemCard';

export default class StepsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        text: 'Enter a problem',
        cards: [
            {
                question: 'Solve 2x=6',
                img: "https://www5b.wolframalpha.com/Calculate/MSP/MSP34391fcgihgib218aba900004h1dge9231gd943g?MSPStoreType=image/gif&s=52",
                width: 20,
                height: 20                
            }
        ]
    };
  }
  
  solveButtonPress = () =>{
      var uri = "http://192.168.1.223:5000/solve?msg=" + encodeURIComponent(this.state.text);
      fetch(uri, {
          method: "GET",
      })
      .then(function(response){
          return response.json();
      })
      .then((data) =>{
        Image.getSize(data, (width, height ) => {
            this.state.cards.push({question: this.state.text, img: data, width: width, height: height});

            this.setState({
                text: 'Enter a problem',
                cards: this.state.cards
            });
        });
      })
  }


  _renderCardItem = ({ item }) => (
      <ProblemCard
        style={{justifyContent:'center', alignItems:'center'}}
        img={item.img}
        question={item.question}
        width={item.width}
        height={item.height}
        />
  );

  _keyExtractor = (item) => item.question;


  render = () => {
    const {navigate} = this.props.navigation;

    return (
        <View style = {{flex:1}}>
            <View style={{height:100, paddingBottom:10}}>
                <View style={{flexDirection:'row', paddingLeft:10, paddingRight: 10}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                </View>  
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems: 'stretch',
                    height:40,
                    paddingLeft:13,
                    paddingRight: 13
                    }}>
                    <View style={{
                        flex:6,
                        padding:2 ,                  
                        height: 20 
                    }}>
                        <Button 
                            title="Solve"
                            type="outline"
                            onPress={this.solveButtonPress}
                        />  
                    </View>
                    <View style={{
                        flex:1,
                        padding:2,
                        height: 20 
                    }}>
                        <TouchableOpacity onPress={() => navigate('MathChat')} style={styles.mathuButton}>
                            <Image source={require('../components/images/mathu.png')} style={styles.mathuImage}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{flex:1}}>
                <FlatList
                    // inverted={true}
                    contentContainerStyle={styles.contentContainer}
                    data={this.state.cards}
                    extraData={this.state}
                    renderItem={this._renderCardItem}
                    keyExtractor={this._keyExtractor}
                    />                                               
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent:'center',
        alignContent: 'center',
        alignItems:'center'
    },
    container: {
        flex:1,
        paddingTop: 2
    },
    bottomContainer: {
        flex:1,
        justifyContent:'flex-end',
        marginBottom: 15
    },
    text: {
        color: '#4f603c'
    },
    solveButton:{
        borderWidth:1,
        borderRadius:8,
        borderColor:'grey',
        // justifyContent:'center',
        alignItems:'center'
    },
    input: {
        flex:1,
        paddingLeft:20,
        margin:5,
        textAlign:'center',
        height: 40,
        borderWidth: 1,
        borderRadius:5
    },
    submitButton: {
        flex:1,
        padding: 10,
    },
    submitButtonText:{
       color: 'white'
    },
    mathuImage:{
        width:40,
        height:40,
    },
    mathuButton:{
        // borderWidth:1,
        // borderRadius:2,
        // borderColor:'grey',
        // justifyContent:'center',
        alignItems:'center'
    },
    cardHeader:{
        fontWeight: 'bold',
        fontSize:18
    }
 })

