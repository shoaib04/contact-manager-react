import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ContactRound, Plus, RotateCw } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { createContact, getContact, getContacts, updateContact } from '../services/contactApi'
import type { Contact, ContactDraft } from '../types'

const emptyContact: ContactDraft = { name: '', phone: '', email: '' }

export function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    void getContacts(controller.signal)
      .then((items) => {
        setContacts(items)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setErrorMessage(error instanceof Error ? error.message : 'The contact service is unavailable.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [reloadCount])

  const retry = () => {
    setErrorMessage('')
    setStatus('loading')
    setReloadCount((count) => count + 1)
  }

  return (
    <section className="page-content contacts-page">
      <header className="page-heading contacts-heading">
        <p className="eyebrow">CONTACTS · DEMO SERVICE</p>
        <div className="heading-row">
          <div>
            <h1>People</h1>
            <p>Browse the demo directory or create a sample contact.</p>
          </div>
          <Link className="button button-dark" to="/contacts/new"><Plus size={17} /> New contact</Link>
        </div>
      </header>

      {status === 'loading' && (
        <div className="state-message" role="status"><span className="loader-dot" /> Loading contacts…</div>
      )}
      {status === 'error' && (
        <div className="state-message error-state" role="alert">
          <ContactRound size={24} />
          <div><h2>Contacts unavailable</h2><p>{errorMessage}</p></div>
          <button className="button button-outline" type="button" onClick={retry}><RotateCw size={16} /> Try again</button>
        </div>
      )}
      {status === 'ready' && contacts.length === 0 && (
        <div className="empty-state">
          <ContactRound size={32} aria-hidden="true" />
          <h2>No contacts yet</h2>
          <p>The demo service returned an empty directory.</p>
          <Link className="button button-dark" to="/contacts/new">Create a contact <ArrowRight size={16} /></Link>
        </div>
      )}
      {status === 'ready' && contacts.length > 0 && (
        <div className="contact-list" aria-label="Contact directory">
          <div className="contact-list-labels" aria-hidden="true"><span>Name</span><span>Phone</span><span /></div>
          {contacts.map((contact, index) => (
            <article className="contact-row" key={contact.id}>
              <span className="contact-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="contact-name-cell">
                <span className="avatar-mark" aria-hidden="true">{contact.name.trim().charAt(0).toUpperCase()}</span>
                <Link to={`/contacts/${contact.id}`}>{contact.name}</Link>
              </div>
              <a className="contact-phone" href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a>
              <Link className="row-arrow" to={`/contacts/${contact.id}`} aria-label={`View ${contact.name}`}><ArrowRight size={19} /></Link>
            </article>
          ))}
          <p className="service-note">Sample data from JSONPlaceholder. Changes are demo responses and are not persisted.</p>
        </div>
      )}
    </section>
  )
}

interface ContactFormProps {
  contact?: Contact
  operation: 'create' | 'update'
  onSave: (values: ContactDraft) => Promise<Contact>
  onSaved?: (contact: Contact) => void
}

function ContactForm({ contact, operation, onSave, onSaved }: ContactFormProps) {
  const [values, setValues] = useState<ContactDraft>(contact ? {
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
  } : emptyContact)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDraft, string>>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [requestError, setRequestError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const updateField = (field: keyof ContactDraft, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setRequestError('')
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Partial<Record<keyof ContactDraft, string>> = {}
    if (!values.name.trim()) nextErrors.name = 'Enter a name.'
    if (!values.phone.trim()) nextErrors.phone = 'Enter a phone number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    setErrors(nextErrors)
    setSuccessMessage('')
    if (Object.values(nextErrors).some(Boolean)) return

    setIsSaving(true)
    setRequestError('')
    try {
      const saved = await onSave({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
      })
      onSaved?.(saved)
      setValues({ name: saved.name, phone: saved.phone, email: saved.email })
      setSuccessMessage(
        `The demo service returned ${saved.name} (ID ${saved.id}). JSONPlaceholder does not persist this change.`,
      )
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'The contact could not be saved. Try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="contact-form" noValidate onSubmit={(event) => { void submit(event) }}>
      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" autoComplete="name" required value={values.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} onChange={(event) => updateField('name', event.target.value)} />
        {errors.name && <p className="field-error" id="contact-name-error" role="alert">{errors.name}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="contact-phone">Phone</label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required value={values.phone} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} onChange={(event) => updateField('phone', event.target.value)} />
        {errors.phone && <p className="field-error" id="contact-phone-error" role="alert">{errors.phone}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} onChange={(event) => updateField('email', event.target.value)} />
        {errors.email && <p className="field-error" id="contact-email-error" role="alert">{errors.email}</p>}
      </div>
      {requestError && <p className="form-feedback error-feedback" role="alert">{requestError}</p>}
      {successMessage && <p className="form-feedback success-feedback" role="status">{successMessage}</p>}
      <button className="button button-dark" type="submit" disabled={isSaving}>
        {isSaving ? 'Sending…' : operation === 'create' ? 'Send to demo service' : 'Save changes'}
        {!isSaving && <ArrowRight size={16} aria-hidden="true" />}
      </button>
    </form>
  )
}

export function NewContactPage() {
  return (
    <section className="page-content form-page">
      <Link className="text-link detail-back" to="/contacts"><ArrowLeft size={16} /> All contacts</Link>
      <header className="page-heading compact-heading">
        <p className="eyebrow">CONTACTS · DEMO SERVICE</p>
        <h1>New contact</h1>
        <p>This sends a sample request. JSONPlaceholder does not persist new records.</p>
      </header>
      <ContactForm operation="create" onSave={createContact} />
    </section>
  )
}

export function ContactDetailsPage() {
  const { contactId = '' } = useParams()
  const [contact, setContact] = useState<Contact | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [reloadCount, setReloadCount] = useState(0)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    void getContact(contactId, controller.signal)
      .then((result) => {
        setContact(result)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setErrorMessage(error instanceof Error ? error.message : 'The contact could not be loaded.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [contactId, reloadCount])

  const retry = () => {
    setStatus('loading')
    setReloadCount((count) => count + 1)
  }

  return (
    <section className="page-content detail-page contact-detail-page">
      <Link className="text-link detail-back" to="/contacts"><ArrowLeft size={16} /> All contacts</Link>
      {status === 'loading' && <div className="state-message" role="status"><span className="loader-dot" /> Loading contact…</div>}
      {status === 'error' && (
        <div className="state-message error-state" role="alert">
          <div><h1>Contact unavailable</h1><p>{errorMessage}</p></div>
          <button className="button button-outline" type="button" onClick={retry}><RotateCw size={16} /> Try again</button>
        </div>
      )}
      {status === 'ready' && contact && (
        <>
          <header className="page-heading detail-heading">
            <p className="eyebrow">CONTACT · #{contact.id}</p>
            <div className="heading-row">
              <div><h1>{contact.name}</h1><p>Demo contact record</p></div>
              <button className="button button-outline" type="button" onClick={() => setIsEditing((editing) => !editing)}>
                {isEditing ? 'Cancel editing' : 'Edit contact'}
              </button>
            </div>
          </header>
          {isEditing ? (
            <ContactForm
              key={contact.id}
              contact={contact}
              operation="update"
              onSave={(values) => updateContact({ id: contact.id, ...values })}
              onSaved={(savedContact) => {
                setContact(savedContact)
                setIsEditing(false)
              }}
            />
          ) : (
            <dl className="contact-detail-list">
              <div><dt>Name</dt><dd>{contact.name}</dd></div>
              <div><dt>Phone</dt><dd><a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a></dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
            </dl>
          )}
          <p className="service-note">JSONPlaceholder is a demo endpoint. It returns sample responses but does not persist changes.</p>
        </>
      )}
    </section>
  )
}
