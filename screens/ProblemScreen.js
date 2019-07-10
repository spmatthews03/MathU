import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, TouchableHighlight, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import { isTemplateElement } from '@babel/types';

export default class ProblemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        text: 'Enter a problem',
        history: [
            {
                question: "whats the problem",
                img: "solved"
            },
            {
                question: "here is the second one",
                img: "solved again"
            }
        ]
    };
  }
  
  solveButtonPress = () =>{
      var uri = "http://192.168.1.223:5000/ask_mathu?msg=" + encodeURIComponent(this.state.text);
      fetch(uri, {
          method: "GET",
      })
      .then(function(response){
          return response.json();
      })
      .then((data) =>{
          this.setState({ history: data})
      })
      .then(function(){
          console.log(this.state.text)
      })
  }


  render = () => {
    const {navigate} = this.props.navigation;

    return (
        <View style = {{flex:1}}>
            <View style = {{flex:1}}>
                <TextInput
                    style={{height:40, borderColor: 'gray', borderWidth: 1, textAlign:'center'}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems: 'stretch',
                    height:40
                    }}>
                    <View style={{
                        flex:3,
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
                        flex:3,
                        padding:2,
                        height: 20 
                    }}>
                        <Button 
                            title="Simplify"
                            type="outline"
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
            <View style={{flex:3, backgroundColor: 'red'}}>
                    {
                        this.state.history.map((item, index) => (
                            <TouchableOpacity
                                key = {item.question}>
                                <Text style={styles.text}>
                                    {item.img}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
            </View>
            <View style={styles.bottomContainer}>
                <View style={{
                    flex:1,
                    // alignItems:'stretch',
                    width:'100%',
                    position:'absolute',
                    bottom:0,
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
            </View>    
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
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
        borderWidth:1,
        borderRadius:8,
        borderColor:'grey',
        // justifyContent:'center',
        alignItems:'center'
    }
 })

