// import IonIcons from 'react-native-vector-icons/IonIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as React from 'react';

const tabBarIcon = name => ({ tintColor }) => (
  <Icon
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={{tintColor: 'black'}}
    size={18}
  />
);

export default tabBarIcon;