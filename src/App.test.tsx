import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from './App'

const sampleContact = {
  id: 7,
  name: 'Ada Lovelace',
  phone: '555-0107',
  email: 'ada@example.test',
}

const jsonResponse = (payload: unknown) => ({
  ok: true,
  status: 200,
  json: async () => payload,
})

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('application routes and shared flows', () => {
  it('redirects the root address to Concepts inside the shared shell', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { name: 'Concepts' })).toBeVisible()
    expect(screen.getByRole('contentinfo')).toHaveTextContent('2019 ITC Infotech')
    expect(screen.getByText('Search')).toBeVisible()
  })

  it('adds independent cart entries and removes only the selected row', async () => {
    const user = userEvent.setup()
    renderAt('/products')

    expect(screen.getAllByRole('article')).toHaveLength(10)
    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[0])
    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[0])
    await user.click(screen.getByRole('link', { name: 'Cart, 3 items' }))

    expect(screen.getAllByRole('heading', { name: 'Apple' })).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Cheese' })).toBeVisible()
    await user.click(screen.getAllByRole('button', { name: 'Remove Apple entry' })[0])

    expect(screen.getAllByRole('heading', { name: 'Apple' })).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Cart, 2 items' })).toBeVisible()
  })

  it('shows the matching product details for a direct product route', () => {
    renderAt('/products/2')

    expect(screen.getByRole('heading', { name: 'Cheese' })).toBeVisible()
    expect(screen.getByText('Dairy')).toBeVisible()
    expect(screen.getByText('$6.38')).toBeVisible()
  })

  it('blocks invalid contact submissions before making a request', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    renderAt('/contacts/new')

    await user.click(screen.getByRole('button', { name: 'Send to demo service' }))

    expect(screen.getByText('Enter a name.')).toBeVisible()
    expect(screen.getByText('Enter a phone number.')).toBeVisible()
    expect(screen.getByText('Enter a valid email address.')).toBeVisible()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('submits a valid contact and labels the response as demo-only', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ...sampleContact, id: 101 }))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    renderAt('/contacts/new')

    await user.type(screen.getByLabelText('Name'), sampleContact.name)
    await user.type(screen.getByLabelText('Phone'), sampleContact.phone)
    await user.type(screen.getByLabelText('Email'), sampleContact.email)
    await user.click(screen.getByRole('button', { name: 'Send to demo service' }))

    expect(await screen.findByRole('status')).toHaveTextContent('JSONPlaceholder does not persist this change')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('loads and updates all contact fields from the demo response', async () => {
    const updatedContact = { ...sampleContact, phone: '555-0199', email: 'ada.updated@example.test' }
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse(sampleContact))
      .mockResolvedValueOnce(jsonResponse(updatedContact))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    renderAt('/contacts/7')

    await user.click(await screen.findByRole('button', { name: 'Edit contact' }))
    await user.clear(screen.getByLabelText('Phone'))
    await user.type(screen.getByLabelText('Phone'), updatedContact.phone)
    await user.clear(screen.getByLabelText('Email'))
    await user.type(screen.getByLabelText('Email'), updatedContact.email)
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    await waitFor(() => expect(screen.getByText(updatedContact.phone)).toBeVisible())
    expect(screen.getByText(updatedContact.email)).toBeVisible()
    expect(fetchMock).toHaveBeenLastCalledWith(
      'https://jsonplaceholder.typicode.com/users/7',
      expect.objectContaining({ method: 'PUT' }),
    )
  })

  it('keeps About controls local and displays the selected values', async () => {
    const user = userEvent.setup()
    renderAt('/about')

    await user.type(screen.getByLabelText('Chips'), 'sample')
    await user.keyboard('{Enter}')
    fireEvent.change(screen.getByLabelText('Lower boundary'), { target: { value: '35' } })
    await user.click(screen.getByRole('button', { name: 'Send Data' }))

    expect(screen.getByText('Chips: sample')).toBeVisible()
    expect(screen.getByText('Range: 35–80')).toBeVisible()
    expect(screen.getByText('15/April/1988 12:00:00 AM')).toBeVisible()
  })

  it('shows the learning examples and delayed child event', async () => {
    const user = userEvent.setup()
    renderAt('/concepts')

    expect(screen.getByRole('heading', { name: 'Contact Manager' })).toBeVisible()
    expect(screen.getByText('You are not authenticated. This is a local teaching example, not account access.')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Load child result' }))

    expect(await screen.findByText('Arun', {}, { timeout: 3000 })).toBeVisible()
  })
})
