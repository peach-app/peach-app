import styled from 'styled-components/native';

const FlatListHorizontal = styled.FlatList.attrs(props => ({
  horizontal: true,
  contentContainerStyle: {
    paddingHorizontal: props.theme.spacing,
    paddingBottom: props.theme.spacing,
  },
}))`
  margin-bottom: -${props => props.theme.spacing}px;
  margin-horizontal: -${props => props.theme.spacing}px;
`;

export default FlatListHorizontal;
