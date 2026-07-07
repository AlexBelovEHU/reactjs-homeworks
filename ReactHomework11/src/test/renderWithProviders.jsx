import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/order/orderSlice'

export const createTestStore = (preloadedState) =>
  configureStore({
    reducer: {
      auth: authReducer,
      order: orderReducer,
    },
    preloadedState,
  })

export const renderWithProviders = (
  ui,
  { preloadedState, store = createTestStore(preloadedState), route = '/' } = {},
) => {
  window.history.pushState({}, 'Test page', route)

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    ),
  }
}