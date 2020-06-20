import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import pull from 'lodash/fp/pull';
import { TouchableOpacity } from 'react-native';

import { Grid, Pill } from 'components';

import GET_CATEGORIES from './graphql/get-categories';

export const EditProfileCategories = ({ selectedIds, onChange }) => {
  const { data } = useQuery(GET_CATEGORIES);

  return (
    <Grid>
      {getOr([], 'categories', data).map(category => (
        <Grid.Item key={category._id} size={4}>
          <TouchableOpacity
            onPress={() => {
              const others = pull(category._id)(selectedIds);
              if (selectedIds.includes(category._id)) {
                onChange([...others]);
                return;
              }
              onChange([...others, category._id]);
            }}
          >
            <Pill
              value={category.name}
              isSelected={selectedIds.includes(category._id)}
            />
          </TouchableOpacity>
        </Grid.Item>
      ))}
    </Grid>
  );
};

EditProfileCategories.defaultProps = {
  selectedIds: [],
};

EditProfileCategories.propTypes = {
  selectedIds: PropTypes.arrayOf(PropTypes.string),
};
