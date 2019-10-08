import styled from 'styled-components/native';

const Text = styled.Text`
  font-family: Futura;
  color: ${props => props.theme.foreground};
  ${props => props.isCenter && `text-align: center;`}
`;

export default Text;
