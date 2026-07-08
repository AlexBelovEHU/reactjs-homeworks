import React from 'react'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import OrderPage from './OrderPage'
import Navbar from '../Navbar/Navbar'
import { renderWithProviders } from '../../test/renderWithProviders'

describe('OrderPage cart UI', () => {
  const preloadedState = {
    auth: {
      currentUser: { username: 'Alex', loggedInAt: '2026-07-07T12:00:00.000Z' },
      status: 'idle',
      message: '',
    },
    order: {
      items: [
        { id: '1', name: 'Burger Dreams', image: '/burger.jpg', price: 9.2, quantity: 1 },
        { id: '2', name: 'Cheese Melt', image: '/melt.jpg', price: 8.1, quantity: 2 },
      ],
      status: 'succeeded',
      error: '',
      street: '',
      house: '',
      message: '',
    },
  }

  it('shows the cart count in the navbar based on item quantities', () => {
    renderWithProviders(<Navbar />, { preloadedState, route: '/order' })

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('changes quantity and removes an item from the order page', async () => {
    const user = userEvent.setup()
    renderWithProviders(<OrderPage />, { preloadedState, route: '/order' })

    const quantityInputs = screen.getAllByRole('spinbutton')
    fireEvent.change(quantityInputs[0], { target: { value: '4' } })
    expect(quantityInputs[0]).toHaveValue(4)

    const removeButtons = screen.getAllByRole('button', { name: 'X' })
    await user.click(removeButtons[1])

    expect(screen.queryByText('Cheese Melt')).not.toBeInTheDocument()
  })

  it('shows validation and success messages when placing an order', async () => {
    const user = userEvent.setup()
    renderWithProviders(<OrderPage />, { preloadedState, route: '/order' })

    await user.click(screen.getByRole('button', { name: 'Order' }))
    expect(
      screen.getByText('Street and house are required before placing the order.'),
    ).toBeInTheDocument()

    await user.type(screen.getByLabelText('Street'), 'Main street')
    await user.type(screen.getByLabelText('House'), '21B')
    await user.click(screen.getByRole('button', { name: 'Order' }))

    expect(screen.getByText('Order placed successfully.')).toBeInTheDocument()
    expect(screen.getByText('Your order list is empty.')).toBeInTheDocument()
  })
})