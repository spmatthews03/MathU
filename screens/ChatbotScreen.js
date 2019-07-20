import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, TouchableHighlight, KeyboardAvoidingView, Keyboard, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import {Button} from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import { stringify } from 'querystring';


// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
export default class ChatbotScreen extends Component {

    constructor(props) {
      super(props);
  
      var welcomeBack = "Hi, Welcome Back! I'm MathU. Enter your problem and we can work through it!"
  
      //create a set number of texts with random lengths. Also randomly put them on the right (user) or left (other person).
      var numberOfMessages = 1;
  
      var messages = [];

      var steps = [];

      messages.push({
        owner: 'MathU',
        text: welcomeBack
      })
  
      this.state = {
        messages: messages,
        currProbSteps: [],
        currStep: 1,
        inputBarText: ''
      }
    }
  
    static navigationOptions = {
      title: 'MathU',
    };
  
    //fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
    componentWillMount () {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }
  
    componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  
    //When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
    //Without this, whatever message is the keyboard's height from the bottom will look like the last message.
    keyboardDidShow (e) {
      this.scrollView.scrollToEnd();
    }
  
    //When the keyboard dissapears, this gets the ScrollView to move the last message back down.
    keyboardDidHide (e) {
      this.scrollView.scrollToEnd();
    }
  
    //scroll to bottom when first showing the view
    componentDidMount() {
      setTimeout(function() {
        this.scrollView.scrollToEnd();
      }.bind(this))
    }
  
    //this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but 
    //the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
    componentDidUpdate() {
      setTimeout(function() {
        this.scrollView.scrollToEnd();
      }.bind(this))
    }
  
    // _askQuestion() {
    //   var uri = "http://192.168.0.43:5000/ask_mathu?msg=" + encodeURIComponent(this.state.inputBarText);
    //   fetch(uri, {
    //     method: "GET",
    //   })
    //   .then(function(response){
    //       return response.json();
    //   })
    //   .then((data) =>{
    //     this.state.messages.push({ owner: "MathU", text: "Got it. There are " + (data.length-2) + " steps. This is the first...\n" + data[this.state.currStep]});

    //     this.setState({
    //       messages: this.state.messages,
    //       currStep: this.state.currStep + 1,
    //       currProbSteps: data,
    //       inputBarText: ''
    //     });
    //   })
    // }


    _sendMessage() {
      this.state.messages.push({owner: "Sean", text: this.state.inputBarText});
  
      var uri = "http://192.168.1.223:5000/ask_mathu?msg=" + encodeURIComponent(this.state.inputBarText);
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
  
    _onChangeInputBarText(text) {
      this.setState({
        inputBarText: text
      });
    }


    nextStepPress = () => {
      this.state.messages.push({owner: "MathU", text: this.state.currProbSteps[this.state.currStep]})
      this.setState({
        messages: this.state.messages,
        currStep: this.state.currStep + 1,
        inputBarText: ''
      });

    }

  
    //This event fires way too often.
    //We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
    //We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
    //The real solution here is probably a fork of AutogrowInput that can provide this information.
    _onInputSizeChange() {
      setTimeout(function() {
        this.scrollView.scrollToEnd({animated: false});
      }.bind(this))
    }
  
    render() {
  
      var messages = [];
  
      this.state.messages.forEach(function(message, index) {
        messages.push(
            <MessageBubble key={index} owner={message.owner} text={message.text}/>
          );
      });
  
      return (
                <View style={styles.outer}>
                    <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>
                      {messages}
                    </ScrollView>
                    <Button style={styles.nextButton}
                      title='Next Step'
                      type="outline"
                      onPress={this.nextStepPress}
                      />
                    <InputBar onSendPressed={() => this._sendMessage()} 
                              onSizeChange={() => this._onInputSizeChange()}
                              onChangeText={(text) => this._onChangeInputBarText(text)}
                              text={this.state.inputBarText}/>
                    <KeyboardSpacer/>             
                </View>
              );
    }
  }

//The bubbles that appear on the left or the right for the messages.
class MessageBubble extends Component {
    render() {
  
      //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
      var leftSpacer = this.props.owner === 'MathU' ? null : <View style={{width: 70}}/>;
      var rightSpacer = this.props.owner === 'MathU' ? <View style={{width: 70}}/> : null;
  
      var bubbleStyles = this.props.owner === 'MathU' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];
  
      var bubbleTextStyle = this.props.owner === 'MathU' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;
  
      return (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              {leftSpacer}
              <View style={bubbleStyles}>
                <Text style={bubbleTextStyle}>
                  {this.props.text}
                </Text>
              </View>
              {rightSpacer}
            </View>
        );
    }
  }
  
  //The bar at the bottom with a textbox and a send button.
  class InputBar extends Component {
  
    //AutogrowInput doesn't change its size when the text is changed from the outside.
    //Thus, when text is reset to zero, we'll call it's reset function which will take it back to the original size.
    //Another possible solution here would be if InputBar kept the text as state and only reported it when the Send button
    //was pressed. Then, resetInputText() could be called when the Send button is pressed. However, this limits the ability
    //of the InputBar's text to be set from the outside.
    componentWillReceiveProps(nextProps) {
      if(nextProps.text === '') {
        this.autogrowInput.resetInputText();
      }
    }
  
    render() {
      return (
            <View style={styles.inputBar}>
              <AutogrowInput style={styles.textBox}
                          ref={(ref) => { this.autogrowInput = ref }} 
                          multiline={true}
                          defaultHeight={30}
                          onChangeText={(text) => this.props.onChangeText(text)}
                          onContentSizeChange={this.props.onSizeChange}
                          value={this.props.text}/>
              <TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
                  <Text style={{color: 'white'}}>Send</Text>
              </TouchableHighlight>
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
    },
 //ChatView
  
    outer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },

    messages: {
    flex    : 1
    },

    //InputBar

    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 3,
    },

    textBox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10
    },

    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        marginLeft: 5,
        paddingRight: 15,
        borderRadius: 5,
        backgroundColor: '#66db30'
    },
    nextButton: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 15,
      marginLeft: 5,
      paddingRight: 15,
      borderRadius: 5,
      backgroundColor: 'white'
  },
    //MessageBubble

    messageBubble: {
        borderRadius: 5,
        marginTop: 8,
        marginRight: 10,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection:'row',
        flex: 1
    },

    messageBubbleLeft: {
        backgroundColor: '#d5d8d4',
    },

    messageBubbleTextLeft: {
        color: 'black',
        fontSize: 16
    },

    messageBubbleRight: {
        backgroundColor: '#66db30'
    },

    messageBubbleTextRight: {
        color: 'white',
        fontSize: 16
    },
})
   
  