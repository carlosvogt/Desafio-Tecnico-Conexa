import React from 'react';
import { ThemeProvider } from '@theme';

import ShallowRenderer from 'react-test-renderer/shallow';
import NewQuery from '.';

describe('NewQuery', () => {
  it('should render correctly', () => {
    const component = new ShallowRenderer();
    const result = component.render(
      <ThemeProvider>
        <NewQuery />
      </ThemeProvider>,
    );
    expect(result).toMatchSnapshot();
  });
});
