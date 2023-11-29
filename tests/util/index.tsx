import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { Theme, ThemeProvider } from "../../src/context/ThemeContext";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "../../src/store";
import { PreloadedState } from "@reduxjs/toolkit";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
  theme?: Theme
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    theme,
    ...restOptions
  }: ExtendedRenderOptions = {}
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store}>
        <ThemeProvider defaultTheme={theme ?? 'dark'}>{children}</ThemeProvider>
      </Provider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...restOptions });
}

export * from "@testing-library/react";
