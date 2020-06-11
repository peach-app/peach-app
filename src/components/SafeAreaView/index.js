import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props =>
    props.contrast ? props.theme.backgroundContrast : props.theme.background};
`;
