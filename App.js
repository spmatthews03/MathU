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
import StepsScreen from './screens/StepsScreen';

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Solve: {
      // Define the component we will use for the Feed screen.
      screen: ProblemScreen,
        // Add a cool Material Icon for this screen
        // tabBarIcon: tabBarIcon('equals'),
      navigationOptions: {
          tabBarLabel: 'Solve',
      }
    },
    Steps: {
      screen: StepsScreen,
      navigationOptions: {
        tabBarLabel: 'Steps',
      },
    },
    MathU: {
      screen: ChatbotScreen,
      navigationOptions: {
        tabBarLabel: 'MathU',
      },
    }
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      labelStyle:{
        fontSize: 18
      },
      adaptive: true,
      showIcon: false,
      showLabel: true,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      activeBackgroundColor: 'lightgrey'
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