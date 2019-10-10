import styled from 'styled-components/native';

const Card = styled.View`
  padding: ${props => props.theme.spacing}px;
  border-width: 1px;
  border-color: ${props => props.theme.greyLight};
  border-radius: ${props => props.theme.radius}px;
`;

export default Card;
