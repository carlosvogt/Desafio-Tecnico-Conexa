import React from 'react';
import { ThemeProvider } from '@theme';

import ShallowRenderer from 'react-test-renderer/shallow';
import SignInForm from '.';

describe('SignInForm', () => {
  it('should render correctly', () => {
    const component = new ShallowRenderer();
    const result = component.render(
      <ThemeProvider>
        <SignInForm
        onSubmit={(values) => console.log(value)}
        isSubmitting={false}/>
      </ThemeProvider>,
    );
    expect(result).toMatchSnapshot();
  });
});
