export interface Product {
  id: number
  name: string
  category: string
  price: string
  description: string
  imageUrl: string
}

export interface Contact {
  id: number
  name: string
  phone: string
  email: string
}

export interface ContactDraft {
  name: string
  phone: string
  email: string
}

export interface CartEntry {
  entryId: string
  product: Product
}
