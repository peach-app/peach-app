import React from 'react';
import { Grid, IconButton } from '../';


export const AddRemoveAction = ({isActioned}) => <Grid.Item width={50}>
<IconButton name={isActioned ? "ios-checkmark-circle-outline" : "ios-add-circle-outline"}
  size={32} />
</Grid.Item>;
  
