import styled from 'styled-components/native';

const FlatList = styled.FlatList.attrs(props => ({
  contentContainerStyle: {
    paddingHorizontal: props.theme.spacing,
    width: 900,
    maxWidth: '100%',
    alignSelf: 'center',
  },
}))``;

const FlatListItem = styled.View`
  padding-bottom: ${props => props.theme.spacing}px;
`;

FlatList.Item = FlatListItem;

export default FlatList;
