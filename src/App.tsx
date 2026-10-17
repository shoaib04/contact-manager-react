import { Navigate, Route, Routes } from 'react-router'
import AppShell from './components/AppShell'
import { CartProvider } from './context/CartContext'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import { ContactDetailsPage, ContactsPage, NewContactPage } from './pages/ContactsPage'
import ConceptsPage from './pages/ConceptsPage'
import NotFoundPage from './pages/NotFoundPage'
import { ProductDetailsPage, ProductsPage } from './pages/ProductsPage'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/concepts" replace />} />
          <Route path="concepts" element={<ConceptsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="contacts/new" element={<NewContactPage />} />
          <Route path="contacts/:contactId" element={<ContactDetailsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/cart" element={<CartPage />} />
          <Route path="products/:productId" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App
