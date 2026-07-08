import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

const MEALS_API_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals'

type MealApiResponse = {
  id: string
  meal: string
  img: string
  price: string | number
}

export type OrderItem = {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

type OrderStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type OrderState = {
  items: OrderItem[]
  status: OrderStatus
  error: string
  street: string
  house: string
  message: string
}

type UpdateQuantityPayload = {
  id: string
  quantity: number
}

type DeliveryFieldPayload = {
  field: 'street' | 'house'
  value: string
}

export const fetchOrderItems = createAsyncThunk<
  OrderItem[],
  void,
  { rejectValue: string }
>(
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
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unable to load order items.',
      )
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
    updateQuantity(state, action: PayloadAction<UpdateQuantityPayload>) {
      const item = state.items.find((entry) => entry.id === action.payload.id)

      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    setDeliveryField(state, action: PayloadAction<DeliveryFieldPayload>) {
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