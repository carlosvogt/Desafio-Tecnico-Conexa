import React from 'react';
import { ThemeProvider } from '@theme';

import ShallowRenderer from 'react-test-renderer/shallow';
import SignIn from '.';

describe('SignIn', () => {
  it('should render correctly', () => {
    const component = new ShallowRenderer();
    const result = component.render(
      <ThemeProvider>
        <SignIn />
      </ThemeProvider>,
    );
    expect(result).toMatchSnapshot();
  });
});
