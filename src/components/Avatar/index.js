import React, { Children } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';

import { Main, Image, Initial, List, Item } from './styles';
import { SkeletonCircle } from '../Skeletons';
import { Branch } from '../Branch';

export const Avatar = ({ size, source, fallback, isLoading, onPress }) => (
  <SkeletonCircle isLoading={isLoading} size={size}>
    <Main size={size} as={onPress && TouchableOpacity} onPress={onPress}>
      <Branch
        test={Boolean(get('uri', source))}
        left={<Image source={source} />}
        right={
          <Initial size={size}>
            {(fallback || '').slice(0, 1).toUpperCase()}
          </Initial>
        }
      />
    </Main>
  </SkeletonCircle>
);

const AvatarList = ({ children }) => (
  <List>
    {Children.map(children, child => (
      <Item>{child}</Item>
    ))}
  </List>
);

Avatar.defaultProps = {
  isLoading: false,
  size: 40,
  fallback: null,
  source: null,
  onPress: null,
};

Avatar.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.number,
  fallback: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  onPress: PropTypes.func,
};

Avatar.List = AvatarList;
