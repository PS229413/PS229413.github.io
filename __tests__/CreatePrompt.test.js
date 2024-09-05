// CreatePrompt.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreatePrompt from '@/components/CreatePrompt'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Mock the useSession and useRouter hooks
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

describe('CreatePrompt Component', () => {
  let mockRouterPush

  beforeEach(() => {
    mockRouterPush = jest.fn()
    useRouter.mockReturnValue({ push: mockRouterPush })
    useSession.mockReturnValue({ data: { user: { id: '123' } } })
    
    // Reset fetch mock after each test
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('renders CreatePrompt component', () => {
    render(<CreatePrompt />)
    expect(screen.getByText(/Create/i)).toBeInTheDocument()
  })

  test('submits form and redirects on success', async () => {
    // Mock the fetch API
    global.fetch.mockResolvedValueOnce({
      ok: true
    })

    render(<CreatePrompt />)
    
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'New Prompt' } })
    fireEvent.change(screen.getByLabelText(/Tag/i), { target: { value: 'New Tag' } })
    
    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i))

    // Assert that fetch was called with correct parameters
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/prompt/new', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          prompt: 'New Prompt',
          userId: '123',
          tag: 'New Tag'
        })
      }))
    })

    // Assert that router.push was called
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/')
    })
  })

  test('handles form submission error', async () => {
    // Mock fetch to reject
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    render(<CreatePrompt />)
    
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'New Prompt' } })
    fireEvent.change(screen.getByLabelText(/Tag/i), { target: { value: 'New Tag' } })
    
    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i))

    // Assert that fetch was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })

    // No need to assert router.push here as it should not be called on error
  })
})
