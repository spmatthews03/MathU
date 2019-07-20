import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, ScrollView, TouchableHighlight, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Divider} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';


export default class ProblemCard extends Component{
    render(){
        return(
            <Card style={{padding: 5, marginBottom:5, elevation:3}}>
                <View>
                    <Text style={styles.cardHeader}>
                        {this.props.question}                
                    </Text>
                    <Divider style={{backgroundColor:'blue'}}/>
                    <View style={this.props.style}>
                        <Image
                            source={{uri: this.props.img}}
                            style={{
                                flex:1,
                                width: this.props.width,
                                height: this.props.height,
                                resizeMode:'contain'                            
                            }}
                        />
                    </View>

                </View>
            </Card>
        )
    }
}

ProblemCard.defaultProps = {
    style: {

    }
}

const styles = StyleSheet.create({
    cardHeader:{
        fontWeight: 'bold',
        fontSize:18
    }
})