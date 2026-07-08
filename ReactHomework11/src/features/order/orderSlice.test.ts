import { configureStore } from '@reduxjs/toolkit'
import orderReducer, {
  fetchOrderItems,
  removeItem,
  setDeliveryField,
  submitOrder,
  updateQuantity,
} from './orderSlice'

describe('orderSlice cart logic', () => {
  const createStore = () =>
    configureStore({
      reducer: {
        order: orderReducer,
      },
    })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads the first three meals into the cart with quantity one', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [
        { id: '1', meal: 'Burger Dreams', img: '/burger-1.jpg', price: '9.2' },
        { id: '2', meal: 'Cheese Melt', img: '/burger-2.jpg', price: '8.1' },
        { id: '3', meal: 'Morning Bun', img: '/burger-3.jpg', price: '7.0' },
        { id: '4', meal: 'Extra Item', img: '/burger-4.jpg', price: '5.0' },
      ],
    })

    const store = createStore()
    await store.dispatch(fetchOrderItems())

    expect(store.getState().order.status).toBe('succeeded')
    expect(store.getState().order.items).toEqual([
      { id: '1', name: 'Burger Dreams', image: '/burger-1.jpg', price: 9.2, quantity: 1 },
      { id: '2', name: 'Cheese Melt', image: '/burger-2.jpg', price: 8.1, quantity: 1 },
      { id: '3', name: 'Morning Bun', image: '/burger-3.jpg', price: 7, quantity: 1 },
    ])
  })

  it('stores an error when loading cart items fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    })

    const store = createStore()
    await store.dispatch(fetchOrderItems())

    expect(store.getState().order.status).toBe('failed')
    expect(store.getState().order.error).toBe('Failed to load order items.')
  })

  it('updates quantity but never lets it go below one', () => {
    const store = createStore()

    store.dispatch({
      type: fetchOrderItems.fulfilled.type,
      payload: [{ id: '1', name: 'Burger Dreams', image: '/burger.jpg', price: 9.2, quantity: 2 }],
    })

    store.dispatch(updateQuantity({ id: '1', quantity: 5 }))
    expect(store.getState().order.items[0].quantity).toBe(5)

    store.dispatch(updateQuantity({ id: '1', quantity: 0 }))
    expect(store.getState().order.items[0].quantity).toBe(1)
  })

  it('removes items from the cart', () => {
    const store = createStore()

    store.dispatch({
      type: fetchOrderItems.fulfilled.type,
      payload: [
        { id: '1', name: 'Burger Dreams', image: '/burger.jpg', price: 9.2, quantity: 1 },
        { id: '2', name: 'Cheese Melt', image: '/burger-2.jpg', price: 8.1, quantity: 1 },
      ],
    })

    store.dispatch(removeItem('1'))

    expect(store.getState().order.items).toEqual([
      { id: '2', name: 'Cheese Melt', image: '/burger-2.jpg', price: 8.1, quantity: 1 },
    ])
  })

  it('updates delivery fields and validates order submission', () => {
    const store = createStore()

    store.dispatch({
      type: fetchOrderItems.fulfilled.type,
      payload: [{ id: '1', name: 'Burger Dreams', image: '/burger.jpg', price: 9.2, quantity: 1 }],
    })

    store.dispatch(submitOrder())
    expect(store.getState().order.message).toBe(
      'Street and house are required before placing the order.',
    )

    store.dispatch(setDeliveryField({ field: 'street', value: 'Main street' }))
    store.dispatch(setDeliveryField({ field: 'house', value: '21B' }))
    store.dispatch(submitOrder())

    expect(store.getState().order.items).toEqual([])
    expect(store.getState().order.street).toBe('')
    expect(store.getState().order.house).toBe('')
    expect(store.getState().order.message).toBe('Order placed successfully.')
  })

  it('prevents ordering when the cart is empty', () => {
    const store = createStore()

    store.dispatch(setDeliveryField({ field: 'street', value: 'Main street' }))
    store.dispatch(setDeliveryField({ field: 'house', value: '21B' }))
    store.dispatch(submitOrder())

    expect(store.getState().order.message).toBe('Your cart is empty.')
  })
})