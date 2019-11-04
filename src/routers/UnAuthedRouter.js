import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Landing from '../screens/Landing';
import Login from '../screens/Login';
import Register from '../screens/Register';

const UnAuthedNavigator = createStackNavigator(
  {
    Landing,
    Login,
    Register,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(UnAuthedNavigator);
