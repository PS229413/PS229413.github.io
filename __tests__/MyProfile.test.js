import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyProfile from '../app/profile/page';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock the modules
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue('/profile'),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Mock fetch globally
global.fetch = jest.fn();

const mockPosts = [
  {
    _id: '1',
    creator: {
      _id: '123',
      image: 'https://via.placeholder.com/40',
      username: 'testuser'
    },
    prompt: 'Test prompt',
    tag: '#test'
  }
];

describe('MyProfile Component', () => {
  let mockRouterPush;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: mockRouterPush });
    useSession.mockReturnValue({
      data: { user: { id: '123', name: 'Test User', email: 'test@example.com' } },
      status: 'authenticated'
    });

    // Mock global fetch
    global.fetch.mockReset();
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPosts)
    });
  });

  beforeEach(() => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true); // Mock confirm dialog
  });

  test('renders MyProfile component', async () => {
    render(<MyProfile />);
    await waitFor(() => {
      expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
      expect(screen.getByText(/Welcome to your profile page/i)).toBeInTheDocument();
    });
  });

  test('fetches and displays posts', async () => {
    render(<MyProfile />);

    // Check if 'Test prompt' is present
    await waitFor(() => {
      expect(screen.getByText('Test prompt')).toBeInTheDocument();
    });

    // Use findByText for async element
    const testElement = await screen.findByText(/#test/i);
    
    // Assert if the element is found
    expect(testElement).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith('/api/users/123/posts');
  });

  test('handles post deletion', async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPosts)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ success: true })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue([])
      });

    render(<MyProfile />);

    await waitFor(() => {
      expect(screen.getByText('Test prompt')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Test prompt')).not.toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/prompt/1', expect.objectContaining({
      method: 'DELETE'
    }));
  });

  test('handles edit post', async () => {
    render(<MyProfile />);

    await waitFor(() => {
      expect(screen.getByText('Test prompt')).toBeInTheDocument();
    });

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/update-prompt?id=1');
  });
});
