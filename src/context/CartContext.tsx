import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { getProduct } from '../data/products'
import type { CartEntry, Product } from '../types'

interface CartContextValue {
  entries: CartEntry[]
  count: number
  addToCart: (product: Product) => void
  removeFromCart: (entryId: string) => void
}

interface CartProviderProps {
  children: ReactNode
}

function getInitialEntries(): CartEntry[] {
  const cheese = getProduct(2)

  if (!cheese) {
    throw new Error('The initial cart product is missing from the sample catalog.')
  }

  return [{ entryId: 'initial-cheese', product: cheese }]
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: CartProviderProps) {
  const [entries, setEntries] = useState<CartEntry[]>(getInitialEntries)

  const addToCart = (product: Product) => {
    setEntries((currentEntries) => [
      ...currentEntries,
      { entryId: crypto.randomUUID(), product },
    ])
  }

  const removeFromCart = (entryId: string) => {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.entryId !== entryId),
    )
  }

  return (
    <CartContext.Provider
      value={{ entries, count: entries.length, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const cart = useContext(CartContext)

  if (!cart) {
    throw new Error('useCart must be used within a CartProvider.')
  }

  return cart
}
