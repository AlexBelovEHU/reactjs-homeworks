import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const MEALS_API_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals'

interface MealApiResponse {
  id: string
  meal: string
  img: string
  price: number | string
}

export interface OrderItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

interface OrderState {
  items: OrderItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
  street: string
  house: string
  message: string
}

type DeliveryField = 'street' | 'house'

export const fetchOrderItems = createAsyncThunk<OrderItem[], void, { rejectValue: string }>(
  'order/fetchOrderItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(MEALS_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load order items.')
      }

      const meals = (await response.json()) as MealApiResponse[]

      return meals.slice(0, 3).map((meal) => ({
        id: meal.id,
        name: meal.meal,
        image: meal.img,
        price: Number(meal.price) || 0,
        quantity: 1,
      }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load order items.'
      return rejectWithValue(message)
    }
  },
)

const initialState: OrderState = {
  items: [],
  status: 'idle',
  error: '',
  street: '',
  house: '',
  message: '',
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((entry) => entry.id === action.payload.id)

      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    setDeliveryField(
      state,
      action: PayloadAction<{ field: DeliveryField; value: string }>,
    ) {
      state[action.payload.field] = action.payload.value
    },
    submitOrder(state) {
      if (!state.street.trim() || !state.house.trim()) {
        state.message = 'Street and house are required before placing the order.'
        return
      }

      if (!state.items.length) {
        state.message = 'Your cart is empty.'
        return
      }

      state.items = []
      state.street = ''
      state.house = ''
      state.message = 'Order placed successfully.'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderItems.pending, (state) => {
        state.status = 'loading'
        state.error = ''
        state.message = ''
      })
      .addCase(fetchOrderItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchOrderItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to load order items.'
      })
  },
})

export const {
  updateQuantity,
  removeItem,
  setDeliveryField,
  submitOrder,
} = orderSlice.actions

export default orderSlice.reducer