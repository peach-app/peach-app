import React, { useState } from 'react';
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
  Text,
  Intro,
  PaymentMethodForm,
  UserPaymentMethods,
  Container,
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

const ConfirmPaymentModal = ({ cost, onConfirm, description, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    validationSchema: showForm && validationSchema,
    initialValues: {
      number: '',
      expiry: '',
      cvc: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ number, expiry, cvc }) => {
      setLoading(true);

      if (selectedId) {
        onConfirm({
          cardId: selectedId,
        });
        return;
      }

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

      setLoading(false);

      if (error) {
        formik.setErrors({ generic: error.message });
        return;
      }

      onConfirm({
        token: id,
      });
    },
  });

  return (
    <Modal isOpen onClose={onClose}>
      <Container>
        <Intro />
        <Grid>
          <Grid.Item size={12}>
            <Title>Payment Details</Title>
          </Grid.Item>

          {description && (
            <Grid.Item size={12}>
              <Text>{description}</Text>
            </Grid.Item>
          )}

          <Grid.Item size={12}>
            <SubTitle>Total</SubTitle>
            <Title>{formatToMoneyFromPence(cost)}</Title>
          </Grid.Item>

          {!showForm && (
            <UserPaymentMethods
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onAddNewPress={() => setShowForm(true)}
            />
          )}

          {showForm && <PaymentMethodForm formik={formik} />}

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
                disabled={showForm ? false : !selectedId}
                onPress={formik.handleSubmit}
                isLoading={loading}
              />
            </Actions>
          </Grid.Item>
        </Grid>
      </Container>
    </Modal>
  );
};

ConfirmPaymentModal.defaultProps = {
  description: null,
};

ConfirmPaymentModal.propTypes = {
  cost: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
  description: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmPaymentModal;
