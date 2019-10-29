import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Landing from '../screens/Landing';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const UnAuthedNavigator = createStackNavigator(
  {
    Landing,
    Login,
    SignUp,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(UnAuthedNavigator);
