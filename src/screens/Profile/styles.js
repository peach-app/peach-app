import styled from 'styled-components/native';

export const Head = styled.View`
  background: ${props => props.theme.background};
  padding-vertical: ${props => props.theme.spacingLarge}px;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-color: ${props => props.theme.foreground};
  shadow-offset: 0px 2px;
  margin-bottom: ${props => props.theme.spacingLarge};
`;

export const Section = styled.View`
  border-top-width: 1px;
  border-color: ${props => props.theme.greyLight};
  margin-top: ${props => props.theme.spacingLarge}px;
  padding-top: ${props => props.theme.spacingLarge}px;
`;

export const Categories = styled.View`
  margin-top: ${props => props.theme.spacingSmall}px;
`;

export const WorkSamples = styled.ScrollView.attrs(props => ({
  marginHorizontal: -props.theme.spacing,
  contentContainerStyle: {
    padding: props.theme.spacing,
    paddingRight: 0,
  },
  horizontal: true,
}))``;

export const Media = styled.Image`
  height: 240px;
  width: 240px;
  border-radius: ${props => props.theme.radius}px;
  margin-right: ${props => props.theme.spacing}px;
`;
