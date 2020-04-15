import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Modal,
  Grid,
  Title,
  SubTitle,
  Actions,
  Button,
  TextInput,
  Text,
} from 'components';
import { formatToMoneyFromPence } from 'helpers';

import { stripe } from '../../../stripe';

const validationSchema = Yup.object().shape({
  number: Yup.string()
    .max(16)
    .required('Card number is required'),
  expiry: Yup.string()
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      'Not a valid expiration date. Example: MM/YY'
    )
    .required('Expiry date is required'),
  cvc: Yup.string()
    .min(3)
    .max(4)
    .required('CVC is required'),
});

const ConfirmPaymentModal = ({ onClose, cost, onConfirm, isLoading }) => {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      number: '',
      expiry: '',
      cvc: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ number, expiry, cvc }) => {
      const [expMonth, expYear] = expiry.split('/');
      const { id, error } = await stripe.createToken({
        card: {
          currency: 'gbp',
          number,
          exp_month: expMonth,
          exp_year: expYear,
          cvc,
        },
      });

      if (error) {
        formik.setErrors({ generic: error.message });
        return;
      }

      onConfirm(id);
    },
  });

  return (
    <Modal isOpen shouldCloseOnBackdropClick onClose={onClose}>
      <Grid>
        <Grid.Item size={12}>
          <Title>Payment Details</Title>
        </Grid.Item>

        <Grid.Item size={12}>
          <SubTitle>Total</SubTitle>
          <Title>{formatToMoneyFromPence(cost)}</Title>
        </Grid.Item>

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

        {formik.errors.generic && (
          <Grid.Item size={12}>
            <Text isCenter>{formik.errors.generic}</Text>
          </Grid.Item>
        )}

        <Grid.Item size={12}>
          <Actions>
            <Button
              fixedWidth
              title="Confirm"
              onPress={formik.handleSubmit}
              isLoading={isLoading}
            />
          </Actions>
        </Grid.Item>
      </Grid>
    </Modal>
  );
};

ConfirmPaymentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  cost: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ConfirmPaymentModal;
