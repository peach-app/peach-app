import React, { useState } from 'react';
import getOr from 'lodash/fp/getOr';

import PropTypes from 'prop-types';
import {
  Modal,
  Grid,
  Intro,
  Title,
  Label,
  SubTitle,
  Text,
  Actions,
  Button,
} from 'components';
import { formatToMoneyFromPence } from 'helpers';
import FormatDate from 'date-fns/format';
import { BillingAccounts } from '../../../screens/BillingDetails';

const ConfirmPaymentModal = ({ onClose, campaign, onConfirm, isLoading }) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  return (
    <Modal isOpen shouldCloseOnBackdropClick onClose={onClose}>
      <Grid>
        <Grid.Item size={12}>
          <Title>Payment Details</Title>
        </Grid.Item>
        <Grid.Item size={12}>
          <SubTitle>Summary</SubTitle>
          <Label withoutVerticalMargin isPara>
            {campaign.name}
          </Label>
          <Text isPara>
            {FormatDate(
              new Date(getOr('2020', 'dueDate', campaign)),
              'dd/MM/yyyy'
            )}
          </Text>

          <Text isPara>{campaign.description}</Text>
        </Grid.Item>
        <Grid.Item size={12}>
          <SubTitle>Total</SubTitle>
          <Title>{formatToMoneyFromPence(campaign.budget)}</Title>
        </Grid.Item>

        <Grid.Item size={12}>
          <SubTitle>Billing</SubTitle>
        </Grid.Item>
        <BillingAccounts
          isSelectable
          onSelect={setSelectedAccount}
          selectedAccount={selectedAccount}
        />
      </Grid>
      <Intro />
      <Actions>
        <Button
          isLoading={isLoading}
          title="Confirm"
          fixedWidth
          onPress={() => onConfirm(selectedAccount)}
        />
      </Actions>
    </Modal>
  );
};

ConfirmPaymentModal.propTypes = {
  onClose: propTypes.func.isRequired,
  campaign: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default ConfirmPaymentModal;
