import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, TouchableHighlight, KeyboardAvoidingView, Keyboard, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import { stringify } from 'querystring';












export function sendMessage() {
    this.state.messages.push({owner: "Sean", text: this.state.inputBarText});

    var uri = "http://192.168.0.43:5000/ask_mathu?msg=" + encodeURIComponent(this.state.inputBarText);
    fetch(uri, {
        method: "GET",
    })
    .then(function(response){
        return response.json();
    })
    .then((data) =>{
      this.state.messages.push({ owner: "MathU", text: "Got it. There are " + (data.length-2) + " steps. This is the first...\n" + data[this.state.currStep]});

      this.setState({
        messages: this.state.messages,
        currStep: this.state.currStep + 1,
        currProbSteps: data,
        inputBarText: ''
      });
    })
    .then(function(){
        console.log(this.state.text)
    })
  }