import { useEffect, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchOrderItems,
  removeItem,
  setDeliveryField,
  submitOrder,
  updateQuantity,
} from '../../features/order/orderSlice'
import styles from './OrderPage.module.css'

const OrderPage = () => {
  const dispatch = useAppDispatch()
  const { items, status, error, street, house, message } = useAppSelector(
    (state) => state.order,
  )

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchOrderItems())
    }
  }, [dispatch, status])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(submitOrder())
  }

  return (
    <section className={styles.orderSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>Finish your order</h1>

        {status === 'loading' ? (
          <p className={styles.feedback}>Loading order items...</p>
        ) : null}

        {status === 'failed' ? (
          <p className={styles.feedback}>{error}</p>
        ) : null}

        {items.map((item) => (
          <article key={item.id} className={styles.orderCard}>
            <div className={styles.itemDetails}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <h2 className={styles.itemName}>{item.name}</h2>
            </div>

            <div className={styles.itemControls}>
              <div className={styles.price}>$ {item.price.toFixed(2)} USD</div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                className={styles.quantityInput}
                onChange={(event) =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Number(event.target.value) || 1,
                    }),
                  )
                }
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => dispatch(removeItem(item.id))}
              >
                X
              </button>
            </div>
          </article>
        ))}

        {status === 'succeeded' && !items.length ? (
          <p className={styles.feedback}>Your order list is empty.</p>
        ) : null}

        <form className={styles.addressForm} onSubmit={handleSubmit}>
          <label className={styles.fieldRow}>
            <span className={styles.fieldLabel}>Street</span>
            <input
              type="text"
              className={styles.fieldInput}
              value={street}
              onChange={(event) =>
                dispatch(
                  setDeliveryField({ field: 'street', value: event.target.value }),
                )
              }
            />
          </label>

          <label className={styles.fieldRow}>
            <span className={styles.fieldLabel}>House</span>
            <input
              type="text"
              className={styles.fieldInput}
              value={house}
              onChange={(event) =>
                dispatch(
                  setDeliveryField({ field: 'house', value: event.target.value }),
                )
              }
            />
          </label>

          <button type="submit" className={styles.submitButton}>
            Order
          </button>
        </form>

        {message ? <p className={styles.feedback}>{message}</p> : null}
      </div>
    </section>
  )
}

export default OrderPage