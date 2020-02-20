import get from 'lodash/fp/get';

export const formatRefs = refs =>
  (refs || []).map(ref => ({
    id: get('id', ref),
    collection: {
      id: get('collection.id', ref),
    },
  }));
