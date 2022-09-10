import React from 'react';
import { ThemeProvider } from '@theme';

import ShallowRenderer from 'react-test-renderer/shallow';
import Meet from '.';

describe('Meet', () => {
  it('should render correctly', () => {
    const component = new ShallowRenderer();
    const result = component.render(
      <ThemeProvider>
        <Meet />
      </ThemeProvider>,
    );
    expect(result).toMatchSnapshot();
  });
});
