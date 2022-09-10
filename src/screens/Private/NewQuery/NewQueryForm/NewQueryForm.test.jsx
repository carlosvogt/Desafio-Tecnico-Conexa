import React from 'react';
import { ThemeProvider } from '@theme';

import ShallowRenderer from 'react-test-renderer/shallow';
import NewQueryForm from '.';

describe('NewQueryForm', () => {
  it('should render correctly', () => {
    const component = new ShallowRenderer();
    const result = component.render(
      <ThemeProvider>
        <NewQueryForm
        onSubmit={(values) => console.log(value)}
        isSubmitting={false}/>
      </ThemeProvider>,
    );
    expect(result).toMatchSnapshot();
  });
});
