import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal, Grid, Title, SubTitle, Actions, Button } from 'components';
import { formatToMoneyFromPence } from 'helpers';

import { BillingAccounts } from '../../../screens/BillingDetails';

const ConfirmPaymentModal = ({ onClose, cost, onConfirm, isLoading }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);

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
          <SubTitle>Billing method</SubTitle>
        </Grid.Item>

        <BillingAccounts
          isSelectable
          onSelect={setSelectedAccount}
          selectedAccount={selectedAccount}
        />

        <Grid.Item size={12}>
          <Actions>
            <Button
              isLoading={isLoading}
              title="Confirm"
              fixedWidth
              disabled={!selectedAccount}
              onPress={() => onConfirm(selectedAccount)}
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
