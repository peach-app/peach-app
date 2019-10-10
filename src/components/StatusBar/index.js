import styled from 'styled-components/native';

const StatusBar = styled.StatusBar.attrs(props => ({
  barStyle: props.theme.darkMode ? 'light-content' : 'dark-content',
}))``;

export default StatusBar;
