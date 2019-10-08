import styled from 'styled-components';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export default SafeAreaView;
