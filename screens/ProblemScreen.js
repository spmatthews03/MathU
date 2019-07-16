import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, ScrollView, TouchableHighlight, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Divider} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';
import { isTemplateElement } from '@babel/types';

export default class ProblemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        text: 'Enter a problem',
        cards: [
            {
                question: "Solve 2x=2",
                img: "http://www4d.wolframalpha.com/Calculate/MSP/MSP397914fhd8eecb8fb3d800000hda459c4c6i8iig?MSPStoreType=image/gif&s=30",
                width:20,
                height:20,
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
        var card;

        Image.getSize(data, (width, height ) => {
            this.state.cards.push({question: this.state.text, img: data, width: width, height: height});

            this.setState({
                text: 'Enter a problem',
                cards: this.state.cards
            });
        });

        // this.state.cards.push(card);

        // this.setState({
        //     text: 'Entera problem',
        //     cards: this.state.cards
        // });
      })
  }


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
            <View style={{height:500}}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {
                        this.state.cards.map((item, index) => (
                            <Card style={{padding:5, marginBottom: 5, elevation: 3}}
                                key = {item.question}>
                                <View>
                                    <Text style={styles.cardHeader}>
                                        {item.question}
                                    </Text>
                                    <Divider style={{ backgroundColor:'blue'}} />
                                    <View style={{height: item.height, justifyContent:'center', alignItems:'center'}}>
                                        <Image 
                                            source={{uri: item.img}}
                                            style={{flex:1, width: item.width, height: item.height, resizeMode: 'contain'}}/>
                                    </View>
                                </View>
                            </Card>
                        ))
                    }
                </ScrollView>
            </View>
            {/* <View style={styles.bottomContainer}>
                <View style={{
                    flex:1,
                    // alignItems:'stretch',
                    width:'100%',
                    position:'absolute',
                    bottom:0,TouchableOpacity,
                    padding:2
                    }}>
                    <View style={{padding:1}}>
                        <Button 
                            title="Explain that again"
                            type="outline"
                        /> 
                    </View>      
                    <View style={{padding:1}}>
                        <Button 
                            title="Next Step"
                            type="outline"
                        />    
                    </View>
                    <View style={{padding:1}}>
                        <Button 
                            title="Enter a Question"
                            type="outline"
                        />               
                    </View>
                </View>
            </View>     */}
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

