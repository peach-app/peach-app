import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Grid,
  Avatar,
  Intro,
  Text,
  FlatList,
} from 'components';

export const Payouts = () => (
  <SafeAreaView>
    <StatusBar />
    <Header title="Payout History" />
    <FlatList
      data={Array.from(Array(15))}
      keyExtractor={(_, i) => i}
      ListHeaderComponent={<Intro />}
      renderItem={({ index }) => (
        <FlatList.Item>
          <Grid noWrap align="center">
            <Grid.Item>
              <Avatar size={50} fallback="John Smith" />
            </Grid.Item>
            <Grid.Item>
              <Text>John Smith</Text>
              <Text>
                You paid £{3.44 * index} for campaign #22{index * 3}
              </Text>
            </Grid.Item>
          </Grid>
        </FlatList.Item>
      )}
    />
  </SafeAreaView>
);
