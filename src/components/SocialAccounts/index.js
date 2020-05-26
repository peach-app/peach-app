import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
  size: 32,
}))``;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: ${props => props.theme.spacingLarge};
  margin-horizontal: -6%;
`;

const IconWrapper = styled.TouchableOpacity`
  margin-horizontal: 6%;
`;

const ICON_PROPS = {
  instagram: {
    icon: 'logo-instagram',
    url: 'https://www.instagram.com/{account}/',
  },
  twitter: {
    icon: 'logo-twitter',
    url: 'https://twitter.com/{account}',
  },
  facebook: {
    icon: 'logo-facebook',
    url: 'https://www.facebook.com/{account}',
  },
  youTube: {
    icon: 'logo-youtube',
    url: '{account}',
  },
  tikTok: {
    icon: 'md-musical-note',
    url: 'https://www.tiktok.com/@{account}?',
  },
};

export const SocialAccounts = ({ socialAccounts, onSocialAccountPressed }) => (
  <Container>
    {Object.entries(socialAccounts).map(
      ([account, value]) =>
        ICON_PROPS[account] &&
        value !== '' && (
          <IconWrapper
            key={account}
            onPress={() =>
              onSocialAccountPressed(
                ICON_PROPS[account].url.replace('{account}', value)
              )
            }
          >
            <Icon name={ICON_PROPS[account].icon} />
          </IconWrapper>
        )
    )}
  </Container>
);

SocialAccounts.propTypes = {
  socialAccounts: PropTypes.object.isRequired,
  onSocialAccountPressed: PropTypes.func.isRequired,
};
