import styled from 'styled-components/native';

const Text = styled.Text`
  font-family: futura-book;
  color: ${props => props.theme.foreground};
  ${props => props.isCenter && `text-align: center;`}
`;

export default Text;
