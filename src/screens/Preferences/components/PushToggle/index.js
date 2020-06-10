import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import { Switch } from 'components';
import { registerForPushNotificationsAsync } from 'helpers';

import UPDATE_USER_PREFERENCES from '../../graphql/update-user-preferences';

export const PushToggle = ({ value }) => {
  const [internalValue, setInternal] = useState(value);

  useEffect(() => {
    setInternal(value);
  }, [value]);

  const [updatePreferences] = useMutation(UPDATE_USER_PREFERENCES, {
    refetchQueries: ['getUserPreferences'],
  });

  const handleChange = async pushAlerts => {
    setInternal(pushAlerts);
    const pushToken = pushAlerts
      ? await registerForPushNotificationsAsync()
      : undefined;

    updatePreferences({
      variables: {
        pushToken,
        preferences: {
          pushAlerts: pushAlerts && pushToken !== undefined,
        },
      },
    });
  };

  return (
    <Switch
      label="Enable Push notifications"
      value={internalValue}
      onValueChange={handleChange}
    />
  );
};

PushToggle.defaultProps = {
  value: false,
};

PushToggle.propTypes = {
  value: PropTypes.bool,
};
