import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { Title } from '../Title';
import { Text } from '../Text';
import { Button } from '../Button';
import { Grid } from '../Grid';
import { Actions } from '../Actions';

const Main = styled.View`
  flex: 1;
  justify-content: center;
`;

export const NetworkError = ({ loading, refetch }) => (
  <Main>
    <Grid>
      <Grid.Item size={12}>
        <Title isCenter>Uh oh!</Title>
      </Grid.Item>
      <Grid.Item size={12}>
        <Text isCenter>We're having trouble at this time.</Text>
      </Grid.Item>
      <Grid.Item size={12}>
        <Actions>
          <Button
            title="Try again"
            fixedWidth
            isLoading={loading}
            onPress={() => refetch()}
          />
        </Actions>
      </Grid.Item>
    </Grid>
  </Main>
);

NetworkError.defaultProps = {
  loading: false,
};

NetworkError.propTypes = {
  loading: PropTypes.bool,
  refetch: PropTypes.func.isRequired,
};
