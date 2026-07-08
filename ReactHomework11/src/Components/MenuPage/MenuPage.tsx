import React from 'react'
import MenuSection from '../MenuSection/MenuSection'
import { useAppDispatch } from '../../app/hooks'
import { addItem } from '../../features/order/orderSlice'
import type { MenuItem } from '../../config/cdn'

const MenuPage = () => {
  const dispatch = useAppDispatch()

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addItem({ id: item.id, name: item.name, image: item.image, price: item.price }))
  }

  return <MenuSection onAddToCart={handleAddToCart} />
}

export default MenuPage
