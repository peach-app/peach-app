import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import { NavigationContainer, useLinking } from '@react-navigation/native';

import { App } from './App';

enableScreens();

export default () => {
  console.log('HEYYYYYY');
  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: ['192.168.1.118:19006'],
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    console.log('EEEEEEEE');
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150)
      ),
    ])
      .catch(e => {
        console.error(e);
      })
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  console.log('INITIAL STATE', initialState);

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <App />
    </NavigationContainer>
  );
};
