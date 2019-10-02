import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Landing from '../screens/Landing';
import Login from '../screens/Login';

const UnAuthedNavigator = createStackNavigator(
  {
    Landing,
    Login,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(UnAuthedNavigator);
