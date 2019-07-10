// ./App.js
// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { StyleSheet } from 'react-native';
import tabBarIcon from './utils/tabBarIcon';


import ProblemScreen from './screens/ProblemScreen';
import ChatbotScreen from './screens/ChatbotScreen';

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Problem: {
      // Define the component we will use for the Feed screen.
      screen: ProblemScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon('home'),
      },
    },
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const stackNavigator = createStackNavigator(
  {
    Problem:{
     screen: ProblemScreen
    },
    MathChat:{
      screen: ChatbotScreen
    },
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);

// Export it as the root component
export default createAppContainer(stackNavigator);