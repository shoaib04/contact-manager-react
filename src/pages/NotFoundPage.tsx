import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="page-content not-found-page">
      <Compass size={34} aria-hidden="true" />
      <p className="eyebrow">404 · WRONG TURN</p>
      <h1>Page not found</h1>
      <p>That address does not point to a page in this application.</p>
      <Link className="button button-dark" to="/concepts"><ArrowLeft size={16} /> Return to Concepts</Link>
    </section>
  )
}
