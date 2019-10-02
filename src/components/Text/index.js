import styled from 'styled-components/native';

const Text = styled.Text`
  font-family: Futura;
  ${props => props.isCenter && `text-align: center;`}
`;

export default Text;
