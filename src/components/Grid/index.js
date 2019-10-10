import styled from 'styled-components/native';

export const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: ${props => `-${props.theme.spacing}px -${props.theme.spacing}px 0 0`};
`;

export const GridItem = styled.View`
  ${props => {
    if (props.size) {
      return `width: ${100 * (props.size / 12)}%;`;
    }

    if (props.flex) {
      return `flex: ${props.flex};`;
    }

    return `width: 100%;`;
  }}
  margin: ${props => `${props.theme.spacing}px ${props.theme.spacing}px 0 0`};
`;
