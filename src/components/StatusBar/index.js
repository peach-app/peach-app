import styled from 'styled-components';

const StatusBar = styled.StatusBar.attrs(props => ({
  barStyle: props.theme.darkMode ? 'light-content' : 'dark-content',
}))``;

export default StatusBar;
