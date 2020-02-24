import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Icon, Title, Button, SubTitle, Actions } from '..';

const IconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const FeedbackView = ({
  title,
  subTitle,
  actionButtonLabel,
  onActionButtonPressed,
}) => (
  <>
    <Grid.Item size={12}>
      {/* Better icon or SVG here. */}
      <IconWrapper>
        <Icon size={100} name="ios-checkmark" />
      </IconWrapper>
    </Grid.Item>
    <Grid.Item size={12}>
      <Title isCentered>{title}</Title>
    </Grid.Item>
    <Grid.Item size={12}>
      <SubTitle isCentered>{subTitle}</SubTitle>
    </Grid.Item>
    <Grid.Item size={12}>
      <Actions>
        <Button
          fixedWidth
          title={actionButtonLabel}
          onPress={onActionButtonPressed}
        />
      </Actions>
    </Grid.Item>
  </>
);

FeedbackView.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  actionButtonLabel: PropTypes.string.isRequired,
  onActionButtonPressed: PropTypes.func.isRequired,
};
export default FeedbackView;
