import get from 'lodash/fp/get';

const formatRefs = refs =>
  (refs || []).map(ref => ({
    id: get('id', ref),
    collection: {
      id: get('collection.id', ref),
    },
  }));

export default formatRefs;
