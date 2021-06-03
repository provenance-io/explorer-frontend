import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Themes } from 'theme';
import store from 'redux/store';
import BackendExplorer from './BackendExplorer';
import BackendContextProvider from './BackendExplorer/context';

const customRender = (ui, options) => {
  const rendered = render(
    <Provider store={store}>
      <BackendContextProvider>
        <BrowserRouter>
          <ThemeProvider theme={Themes.default}>
            <BackendExplorer />
            {ui}
          </ThemeProvider>
        </BrowserRouter>
      </BackendContextProvider>
    </Provider>,
    options
  );

  return {
    ...rendered,
    renderer: (newUi) =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  };
};

// re-export everything
export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

// override render method
export { customRender as render };
