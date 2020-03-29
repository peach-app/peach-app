import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { Title } from '../Title';

const dim = Dimensions.get('window');

const imageStyles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    width: dim.width,
    height: dim.height / 1.7,
  },
});

const Container = styled.View`
  background-color: ${props => props.theme.background};
`;

const Fallback = styled.View`
  display: flex;
  background-color: ${props => props.theme.background};
  align-items: center;
  justify-content: center;
  width: ${dim.width}px;
  height: ${dim.height / 1.7}px;
  position: absolute;
  border-radius: ${props => props.theme.radius};
  border-bottom-width: 1px;
  border-color: ${props => props.theme.greyLight};
`;

export const ProgressiveImage = ({ source, fallback }) => {
  const imageAnimated = new Animated.Value(0);

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
    }).start();
  };

  return (
    <Container>
      {source.uri ? (
        <Animated.Image
          onLoad={onImageLoad}
          source={source}
          // styled does not support the animated opacity
          style={[imageStyles.imageOverlay, { opacity: imageAnimated }]}
        />
      ) : (
        <Fallback>
          <Title>
            {(fallback || '')
              .split(' ')
              .map(a => a.slice(0, 1))
              .slice(0, 2)
              .join('')
              .toUpperCase()}
          </Title>
        </Fallback>
      )}
    </Container>
  );
};
ProgressiveImage.defaultProps = {
  fallback: null,
  source: null,
};
ProgressiveImage.propTypes = {
  fallback: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
};
