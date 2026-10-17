import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { entries, count, removeFromCart } = useCart()

  return (
    <section className="page-content cart-page">
      <header className="page-heading cart-heading">
        <p className="eyebrow">SAMPLE CART · {count} {count === 1 ? 'ENTRY' : 'ENTRIES'}</p>
        <h1>Your cart</h1>
        <p>Each addition is its own sample entry. This cart is not an order.</p>
      </header>

      {entries.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={32} aria-hidden="true" />
          <h2>Your cart is empty</h2>
          <p>Browse the sample shop to add something here.</p>
          <Link className="button button-dark" to="/products">Browse Shopping <ArrowRight size={16} /></Link>
        </div>
      ) : (
        <div className="cart-list">
          <ul>
            {entries.map(({ entryId, product }) => (
              <li className="cart-row" key={entryId}>
                <div className="cart-item-image"><ProductsPageImage product={product} /></div>
                <div className="cart-item-copy">
                  <p className="product-category">{product.category}</p>
                  <h2>{product.name}</h2>
                </div>
                <span className="cart-row-price">{product.price}</span>
                <button
                  className="icon-button remove-entry"
                  type="button"
                  aria-label={`Remove ${product.name} entry`}
                  title={`Remove ${product.name}`}
                  onClick={() => removeFromCart(entryId)}
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <Link className="text-link continue-shopping" to="/products">Continue shopping <ArrowRight size={16} /></Link>
        </div>
      )}
    </section>
  )
}

function ProductsPageImage({ product }: { product: { name: string; category: string; imageUrl: string } }) {
  return (
    <>
      <span className="cart-image-fallback" aria-hidden="true">{product.category.slice(0, 1)}</span>
      <img src={product.imageUrl} alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true }} />
    </>
  )
}
