import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import {
  Modal,
  Container,
  Intro,
  Grid,
  Text,
  MoneyInput,
  Actions,
  Button,
  GraphQLErrors,
} from 'components';

import APPLY_TO_CAMPAIGN from './graphql/apply-to-campaign';

const CampaignApplyModal = ({ onClose, campaignId, isUnpaid }) => {
  const [applyToCampaign, { loading, error }] = useMutation(APPLY_TO_CAMPAIGN, {
    refetchQueries: ['getCampaign', 'getCampaigns', 'getCurrentUser'],
    onCompleted: () => onClose(),
  });

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      cost: '',
    },
    onSubmit: ({ cost }, { setFieldError }) => {
      if (!isUnpaid && cost < 500) {
        setFieldError('cost', 'Pay rate must be more than £5.00');
        return;
      }

      applyToCampaign({
        variables: {
          id: campaignId,
          cost: isUnpaid ? 0 : parseInt(cost, 10),
        },
      });
    },
  });

  return (
    <Modal isOpen onClose={onClose}>
      <Container>
        <Intro />
        <Grid>
          <Grid.Item size={12}>
            {isUnpaid ? (
              <Text
                isCenter
              >{`You're applying to work on this UNPAID campaign.`}</Text>
            ) : (
              <Text>{`You're applying to work on this campaign.\nEnter how much you want to be paid below.`}</Text>
            )}
          </Grid.Item>
          {!isUnpaid && (
            <Grid.Item size={6}>
              <MoneyInput
                label="Pay rate (GBP)"
                value={formik.values.cost}
                error={formik.errors.cost}
                onChange={formik.handleChange('cost')}
                onBlur={formik.handleBlur('cost')}
              />
            </Grid.Item>
          )}

          {error && (
            <Grid.Item size={12}>
              <GraphQLErrors error={error} />
            </Grid.Item>
          )}

          <Grid.Item size={12}>
            <Actions>
              <Button
                fixedWidth
                title="Apply"
                isLoading={loading}
                onPress={formik.handleSubmit}
              />
            </Actions>
          </Grid.Item>
        </Grid>
      </Container>
    </Modal>
  );
};

CampaignApplyModal.defaultProps = {
  isUnpaid: false,
};

CampaignApplyModal.propTypes = {
  campaignId: PropTypes.string.isRequired,
  isUnpaid: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default CampaignApplyModal;
