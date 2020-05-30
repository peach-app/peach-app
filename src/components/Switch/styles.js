import styled from 'styled-components/native';

export const StyledSwitch = styled.Switch.attrs(props => ({
  trackColor: {
    false: props.theme.white,
    true: props.theme.brand,
  },
  ios_backgroundColor: props.theme.grey,
}))``;
