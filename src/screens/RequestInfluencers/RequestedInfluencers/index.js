import React from 'react';
import { Text, Grid } from '../../../components';
import { RequestedInfluencersWrapper } from '../styles';

const RequestedInfluencers = ({requestedInfluencers}) =>
<RequestedInfluencersWrapper>
<Grid noWrap align="center" justify="flex-end">
    <Grid.Item>
<Text>Requested: {requestedInfluencers.length} </Text>
</Grid.Item>
</Grid>
</RequestedInfluencersWrapper>

export default RequestedInfluencers;
