import React from 'react';
import getOr from 'lodash/fp/getOr';

import { Text } from '../Text';

export const GraphQLErrors = ({ error }) => {
  if (!error) return;

  return (
    <>
      {getOr([], 'graphQLErrors', error).map(({ message }, i) => (
        <Text isCenter key={i} isError>
          {message}
        </Text>
      ))}
    </>
  );
};
