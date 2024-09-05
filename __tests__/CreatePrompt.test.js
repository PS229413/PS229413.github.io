import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePrompt from '../app/create-prompt/page'; // Adjust path if needed
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock the useSession and useRouter hooks
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('CreatePrompt Component', () => {
  let mockRouterPush;
  let originalConsoleLog;
  let originalConsoleError;

  beforeAll(() => {
    // Suppress console logs and errors during tests
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    console.log = jest.fn();
    console.error = jest.fn();
  });

  beforeEach(() => {
    mockRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: mockRouterPush });
    useSession.mockReturnValue({ data: { user: { id: '123' } } });

    // Reset fetch mock after each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    // Restore the original console functions
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  test('renders CreatePrompt component', () => {
    render(<CreatePrompt />);
    
    expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
  });

  test('submits form and redirects on success', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true
    });

    render(<CreatePrompt />);
    
    fireEvent.change(screen.getByPlaceholderText(/write your prompt here/i), { target: { value: 'New Prompt' } });
    fireEvent.change(screen.getByPlaceholderText(/#tag/i), { target: { value: 'New Tag' } });
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/prompt/new', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          prompt: 'New Prompt',
          userId: '123',
          tag: 'New Tag'
        })
      }));
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });

  test('handles form submission error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<CreatePrompt />);
    
    fireEvent.change(screen.getByPlaceholderText(/write your prompt here/i), { target: { value: 'New Prompt' } });
    fireEvent.change(screen.getByPlaceholderText(/#tag/i), { target: { value: 'New Tag' } });
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
