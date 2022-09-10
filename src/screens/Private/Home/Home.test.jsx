import React from 'react';
import { ThemeProvider } from '@theme';

import ShallowRenderer from 'react-test-renderer/shallow';
import Home from '.';

describe('Home ', () => {
  it('should render correctly', () => {
    const component = new ShallowRenderer();
    const result = component.render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>,
    );
    expect(result).toMatchSnapshot();
  });
});
