import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import { Switch } from 'components';

import UPDATE_USER_PREFERENCES from '../../graphql/update-user-preferences';

export const EmailToggle = ({ value }) => {
  const [internalValue, setInternal] = useState(value);

  useEffect(() => {
    setInternal(value);
  }, [value]);

  const [updatePreferences] = useMutation(UPDATE_USER_PREFERENCES, {
    refetchQueries: ['getUserPreferences'],
  });

  const handleChange = async emailAlerts => {
    setInternal(emailAlerts);

    updatePreferences({
      variables: {
        preferences: {
          emailAlerts,
        },
      },
    });
  };

  return (
    <Switch
      label="Enable Email notifications"
      value={internalValue}
      onValueChange={handleChange}
    />
  );
};

EmailToggle.defaultProps = {
  value: false,
};

EmailToggle.propTypes = {
  value: PropTypes.bool,
};
