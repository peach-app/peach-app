import React from 'react';
import SubDate from 'date-fns/sub';

import {
  Grid,
  Card,
  TextInput,
  Button,
  DatePicker,
  Actions,
  SubTitle,
} from 'components';

export const PersonalDetails = () => (
  <Card>
    <Grid>
      <Grid.Item size={12}>
        <SubTitle>Personal details</SubTitle>
      </Grid.Item>

      <Grid.Item size={6}>
        <TextInput label="First name" />
      </Grid.Item>

      <Grid.Item size={6}>
        <TextInput label="Last name" />
      </Grid.Item>

      <Grid.Item size={12}>
        <DatePicker
          label="Date of birth"
          value={SubDate(new Date(), { years: 18 })}
        />
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
