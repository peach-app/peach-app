import React, { useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const FlatListBase = styled.FlatList.attrs(props => ({
  contentContainerStyle: {
    paddingHorizontal: props.theme.spacing,
    width: 900,
    maxWidth: '100%',
    alignSelf: 'center',
  },
}))``;

const Border = styled(Animated.View)`
  height: 1px;
  background-color: ${props => props.theme.greyLight};
`;

const FlatListItem = styled.View`
  padding-bottom: ${props => props.theme.spacing}px;
`;

export const FlatList = props => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Border style={{ opacity }} />
      <FlatListBase
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        {...props}
      />
    </>
  );
};

FlatList.Item = FlatListItem;
