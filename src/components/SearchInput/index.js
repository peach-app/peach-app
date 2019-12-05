import React from 'react';

import { Main, Input, Icon } from './styles';

const SearchInput = props => (
  <Main>
    <Input {...props} />
    <Icon />
  </Main>
);

export default SearchInput;
