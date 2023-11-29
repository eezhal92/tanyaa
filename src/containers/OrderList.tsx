import { MouseEventHandler, useCallback, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { orderSelectors, orderSlice } from "../store/order.slice"

export default function OrderList() {
  const [id, setId] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const orders = useAppSelector(orderSelectors.selectOrders)
  const handleAdd:  MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault()
    if (id.length < 3) {
      setShowError(true)
      return
    }
    dispatch(orderSlice.actions.addOrder({
      order: { id: id, total: 222 }
    }))
    setId('')
  }, [id])

  return (
    <div>
      <div style={{ display: showError ? 'block' : 'none' }} role="alert">Minimum 3 characters</div>
      <input onChange={(e) => {
        setShowError(false);
        setId(e.target.value);
      }} value={id} aria-label="order-id-input" type="text" />
      <button onClick={handleAdd}>Add</button>
      <div role="list">
      {orders.map(el => (
        <div role="listitem" key={el.id}>#{el.id}</div>
      ))}
      </div>
    </div>
  )
}
