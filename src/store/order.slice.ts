import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

type Order = {
  total: number,
  id: string,
}

type OrderState = {
  orders: Order[]
}

const initialState: OrderState = {
  orders: [
    { id: 'abc', total: 100 },
    { id: 'def', total: 200 },
  ]
}

export const orderSelectors = {
  selectOrders: (state: RootState) => state.order.orders,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<{ order: Order }>) {
      state.orders = state.orders.concat(action.payload.order)
    },
    setOrders(state, action: PayloadAction<{ orders: Order[] }>) {
      state.orders = action.payload.orders
    }
  }
})
