import React from 'react';

import { Grid } from '../Grid';
import { TextInput } from '../TextInput';

export const PaymentMethodForm = ({ formik }) => (
  <>
    <Grid.Item size={12}>
      <TextInput
        label="Card number"
        placeholder="e.g 4000056655665556"
        value={formik.values.number}
        error={formik.errors.number}
        onChangeText={formik.handleChange('number')}
      />
    </Grid.Item>

    <Grid.Item size={6}>
      <TextInput
        label="Expiry date"
        placeholder="e.g 03/21"
        value={formik.values.expiry}
        error={formik.errors.expiry}
        onChangeText={formik.handleChange('expiry')}
      />
    </Grid.Item>

    <Grid.Item size={6}>
      <TextInput
        label="CVC"
        placeholder="e.g 123"
        value={formik.values.cvc}
        error={formik.errors.cvc}
        onChangeText={formik.handleChange('cvc')}
      />
    </Grid.Item>
  </>
);
