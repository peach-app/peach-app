import React, { useRef } from 'react';
import { ScrollView as ScrollViewBase, Animated } from 'react-native';
import styled from 'styled-components/native';

const Border = styled(Animated.View)`
  height: 1px;
  background-color: ${props => props.theme.greyLight};
`;

export const ScrollView = ({ children, ...props }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Border style={{ opacity }} />
      <ScrollViewBase
        keyboardDismissMode="interactive"
        scrollEventThrottle={16}
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
      >
        {children}
      </ScrollViewBase>
    </>
  );
};
