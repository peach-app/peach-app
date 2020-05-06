/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { formatToMoneyFromPence } from 'helpers';
import FromUnixTime from 'date-fns/fromUnixTime';
import FormatDate from 'date-fns/format';
import { Text } from '../Text';
import { Card } from '../Card';
import { Grid } from '../Grid';
import { SkeletonText } from '../Skeletons';
import { StatusWrapper, Status, Icon } from './styles';
import { PAYOUT_STATUSES } from './consts';

export const PayoutCard = ({
  amount,
  amount_refunded,
  created,
  status,
  isLoading,
  payment_method_details,
}) => {
  const payoutStatus = amount - amount_refunded === 0 ? 'refund' : status;
  return (
    <Card>
      <Grid direction="row">
        <Grid.Item size={9}>
          <Grid>
            <Grid.Item size={12}>
              <Status isPara isBold isAmount>
                <SkeletonText isLoading={isLoading}>
                  {formatToMoneyFromPence(amount)}
                </SkeletonText>
              </Status>
            </Grid.Item>
            <Grid.Item size={12}>
              <Text isPara>
                <SkeletonText isLoading={isLoading}>
                  {payment_method_details &&
                    `****${payment_method_details.card.last4}`}
                </SkeletonText>
              </Text>
            </Grid.Item>
            <Grid.Item size={12}>
              <Text isPara>
                <SkeletonText isLoading={isLoading}>
                  {created && FormatDate(FromUnixTime(created), 'dd/MM/yyyy')}
                </SkeletonText>
              </Text>
            </Grid.Item>
          </Grid>
        </Grid.Item>

        <Grid.Item size={3} content="center">
          <SkeletonText isLoading={isLoading}>
            {payoutStatus && (
              <StatusWrapper>
                <Icon
                  name={PAYOUT_STATUSES[payoutStatus].icon}
                  color={PAYOUT_STATUSES[payoutStatus].color}
                />
                <Status>{PAYOUT_STATUSES[payoutStatus].label}</Status>
              </StatusWrapper>
            )}
          </SkeletonText>
        </Grid.Item>
      </Grid>
    </Card>
  );
};

PayoutCard.defaultProps = {
  amount: 0,
  amount_refunded: 0,
  created: 0,
  status: '',
  isLoading: false,
  payment_method_details: { card: { last4: null } },
};
PayoutCard.propTypes = {
  amount: PropTypes.number,
  amount_refunded: PropTypes.number,
  created: PropTypes.number,
  status: PropTypes.string,
  isLoading: PropTypes.bool,
  payment_method_details: PropTypes.object,
};
