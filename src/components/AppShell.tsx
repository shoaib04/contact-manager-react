import { useState } from 'react'
import { ArrowUp, ContactRound, Menu, Search, ShoppingCart, X } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router'
import { useCart } from '../context/CartContext'

const navigationItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Concepts', to: '/concepts' },
  { label: 'Contacts', to: '/contacts' },
  { label: 'PrimeNg', to: '/about' },
  { label: 'Shopping', to: '/products' },
]

export default function AppShell() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const { count } = useCart()

  return (
    <div className="app-shell" id="page-top">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/concepts" aria-label="Contact Manager with Shopping, Concepts">
            <span className="brand-mark" aria-hidden="true"><ContactRound size={21} /></span>
            <span>Contact Manager <em>with Shopping</em></span>
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-label={isNavigationOpen ? 'Close navigation' : 'Open navigation'}
            aria-controls="primary-navigation"
            aria-expanded={isNavigationOpen}
            onClick={() => setIsNavigationOpen((isOpen) => !isOpen)}
          >
            {isNavigationOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav
            aria-label="Main navigation"
            className={`primary-navigation${isNavigationOpen ? ' is-open' : ''}`}
            id="primary-navigation"
            onClick={() => setIsNavigationOpen(false)}
          >
            {navigationItems.map(({ label, to, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <div className="search-demo" aria-label="Search demo, non-interactive">
              <Search size={17} aria-hidden="true" />
              <span>Search</span>
              <span className="demo-label">Demo</span>
            </div>
            <Link className="cart-link" to="/products/cart" aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
              <ShoppingCart size={18} aria-hidden="true" />
              <span>Cart</span>
              <span className="cart-count" aria-hidden="true">{count}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="page-main" id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <span>2019 ITC Infotech</span>
        <a href="#page-top" className="back-to-top">
          <ArrowUp size={16} aria-hidden="true" />
          Back to Top
        </a>
      </footer>
    </div>
  )
}
