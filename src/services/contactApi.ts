import type { Contact, ContactDraft } from '../types'

const apiBaseUrl = (
  import.meta.env.VITE_CONTACTS_API_BASE_URL ||
  'https://jsonplaceholder.typicode.com'
).replace(/\/$/, '')

function parseContact(value: unknown): Contact {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('id' in value) ||
    !('name' in value) ||
    !('phone' in value) ||
    !('email' in value) ||
    typeof value.id !== 'number' ||
    typeof value.name !== 'string' ||
    typeof value.phone !== 'string' ||
    typeof value.email !== 'string'
  ) {
    throw new Error('The contact service returned an invalid contact.')
  }

  return {
    id: value.id,
    name: value.name,
    phone: value.phone,
    email: value.email,
  }
}

async function requestJson(path: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(`${apiBaseUrl}/users${path}`, init)

  if (!response.ok) {
    throw new Error(`The contact service responded with ${response.status}.`)
  }

  return (await response.json()) as unknown
}

export async function getContacts(signal?: AbortSignal): Promise<Contact[]> {
  const payload = await requestJson('', { signal })

  if (!Array.isArray(payload)) {
    throw new Error('The contact service returned an invalid contact list.')
  }

  return payload.map(parseContact)
}

export async function getContact(
  contactId: string,
  signal?: AbortSignal,
): Promise<Contact> {
  return parseContact(await requestJson(`/${encodeURIComponent(contactId)}`, { signal }))
}

export async function createContact(contact: ContactDraft): Promise<Contact> {
  return parseContact(
    await requestJson('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    }),
  )
}

export async function updateContact(contact: Contact): Promise<Contact> {
  return parseContact(
    await requestJson(`/${contact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    }),
  )
}
