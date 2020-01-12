import styled from 'styled-components/native';

export const Loading = styled.ActivityIndicator.attrs(props => ({
  color: props.theme.foreground,
}))``;

export default Loading;
