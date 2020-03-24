import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Grid, Text, Button } from 'components';

export const AcceptedActions = () => {
  const navigation = useNavigation();

  return (
    <Grid justify="center">
      <Grid.Item size={12}>
        <Text
          isCenter
        >{`You've been accepted onto this campaign! \n Let us know when you've completed the required work.`}</Text>
      </Grid.Item>
      <Grid.Item>
        <Button
          title="I'm all done"
          fixedWidth
          onPress={() => {
            navigation.navigate('BookingCompletion');
          }}
        />
      </Grid.Item>
    </Grid>
  );
};
