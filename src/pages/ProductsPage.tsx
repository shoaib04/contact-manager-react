import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Package, Plus, ShoppingBag } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { useCart } from '../context/CartContext'
import { PRODUCTS, getProduct } from '../data/products'
import type { Product } from '../types'

function ProductImage({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <div className={`product-media${compact ? ' is-compact' : ''}`}>
      <div className="product-image-fallback" aria-hidden="true">
        <Package size={28} />
        <span>{product.category}</span>
      </div>
      <img
        src={product.imageUrl}
        alt={product.name}
        loading="lazy"
        onError={(event) => { event.currentTarget.hidden = true }}
      />
    </div>
  )
}

export function ProductsPage() {
  const { addToCart } = useCart()
  const [addedProductId, setAddedProductId] = useState<number | null>(null)

  const addProduct = (product: Product) => {
    addToCart(product)
    setAddedProductId(product.id)
  }

  return (
    <section className="page-content catalog-page">
      <header className="page-heading catalog-heading">
        <p className="eyebrow">THE SAMPLE SHOP · 10 ITEMS</p>
        <h1>Shopping</h1>
        <p>Useful things, small pleasures, and a few curious picks.</p>
      </header>

      <p className="sr-only" aria-live="polite">
        {addedProductId === null ? '' : `${getProduct(addedProductId)?.name} added to cart.`}
      </p>

      <div className="product-grid">
        {PRODUCTS.map((product, index) => (
          <article className="product-card" key={product.id}>
            <Link className="product-image-link" to={`/products/${product.id}`} aria-label={`View ${product.name} details`}>
              <ProductImage product={product} />
              <span className="product-index">{String(index + 1).padStart(2, '0')}</span>
              <ArrowUpRight className="image-arrow" size={18} aria-hidden="true" />
            </Link>
            <div className="product-card-copy">
              <p className="product-category">{product.category}</p>
              <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
              <p className="product-description">{product.description}</p>
              <div className="product-card-bottom">
                <span className="price">{product.price}</span>
                <button className="button button-small button-dark" type="button" onClick={() => addProduct(product)}>
                  <Plus size={16} aria-hidden="true" />
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ProductDetailsPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const product = getProduct(Number(productId))

  if (!product) {
    return (
      <section className="page-content state-page">
        <p className="eyebrow">SHOPPING · 404</p>
        <h1>Product not found</h1>
        <Link className="text-link" to="/products"><ArrowLeft size={16} /> Back to Shopping</Link>
      </section>
    )
  }

  return (
    <section className="page-content detail-page">
      <Link className="text-link detail-back" to="/products"><ArrowLeft size={16} /> All products</Link>
      <div className="product-detail-layout">
        <ProductImage product={product} />
        <div className="product-detail-copy">
          <p className="eyebrow">PRODUCT {String(product.id).padStart(2, '0')} · {product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">{product.price}</p>
          <button className="button button-dark" type="button" onClick={() => { addToCart(product); setAdded(true) }}>
            <ShoppingBag size={18} aria-hidden="true" />
            Add to cart
          </button>
          <p className="form-feedback success-feedback" aria-live="polite">{added ? `${product.name} added to your sample cart.` : ''}</p>
        </div>
      </div>
    </section>
  )
}
