import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Text from '../../components/Text';

export const TextInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.greyDark,
}))`
  flex: 1;
  max-height: 200px;
  margin-right: ${props => props.theme.spacing}px;
  font-family: futura-book;
  color: ${props => props.theme.foreground};
  padding-vertical: ${props => props.theme.spacingSmall}px;
  ${Platform.select({
    web: `min-height: 100px;`,
  })}
`;

export const InfluencersContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  shadow-color: ${props => props.theme.foreground};
  shadow-offset: {
    width: 0,
    height: 1,
  };
  shadow-opacity: 0.22;
  shadow-radius: 2.22;

  elevation: 3;
`;

export const dropZoneStyles = {
  backgroundColor: '#fff',
  padding: 15,
  height: 200,
  width: '100%',
  minHeight: 200,
  display: 'flex',
  alignItmes: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  //   borderColor: 'black',
  //   borderStyle: 'dotted',
  //   borderWidth: 1,
  borderRadius: 3,
  color: 'black',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
};

export const DropZoneText = styled(Text)`
  font-weight: bold;
  color: black;
  font-size: 20;
  text-transform: uppercase;
  text-align: center;
`;

export const AvatarWrapper = styled.View`
  padding: 10px;
`;
