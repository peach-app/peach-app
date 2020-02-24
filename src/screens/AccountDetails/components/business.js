import React from 'react';

import { Grid, Card, TextInput, Button, Actions, SubTitle } from 'components';

export const BusinessDetails = () => (
  <Card>
    <Grid>
      <Grid.Item size={12}>
        <SubTitle>Business details</SubTitle>
      </Grid.Item>

      <Grid.Item size={12}>
        <TextInput label="Legal name" />
      </Grid.Item>

      <Grid.Item size={12}>
        <TextInput label="Company number" />
      </Grid.Item>

      <Grid.Item size={12}>
        <TextInput label="Telephone number" />
      </Grid.Item>

      <Grid.Item size={12}>
        <TextInput label="Address line 1" />
      </Grid.Item>

      <Grid.Item size={6}>
        <TextInput label="Town/City" />
      </Grid.Item>

      <Grid.Item size={6}>
        <TextInput label="Postcode" />
      </Grid.Item>

      <Grid.Item size={12}>
        <Actions>
          <Button title="Save" fixedWidth />
        </Actions>
      </Grid.Item>
    </Grid>
  </Card>
);
