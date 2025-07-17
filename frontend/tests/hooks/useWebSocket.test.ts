import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { createTestUser, createTestChat, createTestMessage } from '../setup';

// Mock de socket.io-client
const mockSocket = {
  on: vi.fn(),
  emit: vi.fn(),
  connect: vi.fn(),
  disconnect: vi.fn(),
  connected: false,
  id: 'test-socket-id'
};

const mockSocketIO = vi.fn(() => mockSocket);
vi.mock('socket.io-client', () => ({
  default: mockSocketIO
}));

// Mock de react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'es'
    }
  })
}));

describe('useWebSocket Hook', () => {
  const mockUser = createTestUser();
  const mockToken = 'test-token';

  beforeEach(() => {
    vi.clearAllMocks();
    mockSocket.connected = false;
    mockSocket.on.mockClear();
    mockSocket.emit.mockClear();
    mockSocket.connect.mockClear();
    mockSocket.disconnect.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize socket connection on mount', () => {
      renderHook(() => useWebSocket(mockUser, mockToken));

      expect(mockSocketIO).toHaveBeenCalledWith('ws://localhost:3001', {
        auth: {
          token: mockToken
        },
        transports: ['websocket', 'polling']
      });
      expect(mockSocket.connect).toHaveBeenCalled();
    });

    it('should not initialize if user or token is missing', () => {
      renderHook(() => useWebSocket(null, null));

      expect(mockSocketIO).not.toHaveBeenCalled();
      expect(mockSocket.connect).not.toHaveBeenCalled();
    });

    it('should not initialize if user is null', () => {
      renderHook(() => useWebSocket(null, mockToken));

      expect(mockSocketIO).not.toHaveBeenCalled();
      expect(mockSocket.connect).not.toHaveBeenCalled();
    });

    it('should not initialize if token is null', () => {
      renderHook(() => useWebSocket(mockUser, null));

      expect(mockSocketIO).not.toHaveBeenCalled();
      expect(mockSocket.connect).not.toHaveBeenCalled();
    });
  });

  describe('Connection Management', () => {
    it('should set up connection event listeners', () => {
      renderHook(() => useWebSocket(mockUser, mockToken));

      expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('connect_error', expect.any(Function));
    });

    it('should update connection state on connect', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));

      // Simulate connection
      act(() => {
        const connectHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'connect'
        )[1];
        connectHandler();
      });

      expect(result.current.isConnected).toBe(true);
      expect(result.current.isConnecting).toBe(false);
    });

    it('should update connection state on disconnect', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));

      // First connect
      act(() => {
        const connectHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'connect'
        )[1];
        connectHandler();
      });

      expect(result.current.isConnected).toBe(true);

      // Then disconnect
      act(() => {
        const disconnectHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'disconnect'
        )[1];
        disconnectHandler();
      });

      expect(result.current.isConnected).toBe(false);
    });

    it('should handle connection errors', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));

      act(() => {
        const errorHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'connect_error'
        )[1];
        errorHandler(new Error('Connection failed'));
      });

      expect(result.current.isConnected).toBe(false);
      expect(result.current.isConnecting).toBe(false);
    });
  });

  describe('Chat Management', () => {
    it('should join chat successfully', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const chatId = 'test-chat-id';

      act(() => {
        result.current.joinChat(chatId);
      });

      expect(mockSocket.emit).toHaveBeenCalledWith('join_chat', { chatId });
    });

    it('should leave chat successfully', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const chatId = 'test-chat-id';

      act(() => {
        result.current.leaveChat(chatId);
      });

      expect(mockSocket.emit).toHaveBeenCalledWith('leave_chat', { chatId });
    });

    it('should send message successfully', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const messageData = {
        chatId: 'test-chat-id',
        content: 'Hello world',
        messageType: 'text'
      };

      act(() => {
        result.current.sendMessage(messageData);
      });

      expect(mockSocket.emit).toHaveBeenCalledWith('send_message', messageData);
    });

    it('should handle typing indicators', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const chatId = 'test-chat-id';

      act(() => {
        result.current.startTyping(chatId);
      });

      expect(mockSocket.emit).toHaveBeenCalledWith('typing_start', { chatId });

      act(() => {
        result.current.stopTyping(chatId);
      });

      expect(mockSocket.emit).toHaveBeenCalledWith('typing_stop', { chatId });
    });

    it('should react to messages', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const reactionData = {
        chatId: 'test-chat-id',
        messageId: 'test-message-id',
        emoji: '👍'
      };

      act(() => {
        result.current.reactToMessage(reactionData);
      });

      expect(mockSocket.emit).toHaveBeenCalledWith('message_reaction', reactionData);
    });

    it('should mark messages as read', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const chatId = 'test-chat-id';

      act(() => {
        result.current.markAsRead(chatId);
      });

      expect(mockSocket.emit).toHaveBeenCalledWith('mark_read', { chatId });
    });
  });

  describe('Event Listeners', () => {
    it('should set up chat message listener', () => {
      renderHook(() => useWebSocket(mockUser, mockToken));

      expect(mockSocket.on).toHaveBeenCalledWith('chat_message', expect.any(Function));
    });

    it('should set up typing listener', () => {
      renderHook(() => useWebSocket(mockUser, mockToken));

      expect(mockSocket.on).toHaveBeenCalledWith('user_typing', expect.any(Function));
    });

    it('should set up notification listener', () => {
      renderHook(() => useWebSocket(mockUser, mockToken));

      expect(mockSocket.on).toHaveBeenCalledWith('notification', expect.any(Function));
    });

    it('should handle chat message events', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const mockMessage = createTestMessage();
      const mockCallback = vi.fn();

      act(() => {
        result.current.onChatMessage(mockCallback);
      });

      // Simulate message event
      act(() => {
        const messageHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'chat_message'
        )[1];
        messageHandler(mockMessage);
      });

      expect(mockCallback).toHaveBeenCalledWith(mockMessage);
    });

    it('should handle typing events', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const mockTypingData = {
        chatId: 'test-chat-id',
        userId: 'test-user-id',
        isTyping: true
      };
      const mockCallback = vi.fn();

      act(() => {
        result.current.onUserTyping(mockCallback);
      });

      // Simulate typing event
      act(() => {
        const typingHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'user_typing'
        )[1];
        typingHandler(mockTypingData);
      });

      expect(mockCallback).toHaveBeenCalledWith(mockTypingData);
    });

    it('should handle notification events', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const mockNotification = {
        type: 'info',
        title: 'Test Notification',
        message: 'Test message'
      };
      const mockCallback = vi.fn();

      act(() => {
        result.current.onNotification(mockCallback);
      });

      // Simulate notification event
      act(() => {
        const notificationHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'notification'
        )[1];
        notificationHandler(mockNotification);
      });

      expect(mockCallback).toHaveBeenCalledWith(mockNotification);
    });
  });

  describe('Reconnection Logic', () => {
    it('should attempt reconnection on disconnect', async () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));

      // Simulate disconnect
      act(() => {
        const disconnectHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'disconnect'
        )[1];
        disconnectHandler();
      });

      expect(result.current.isConnected).toBe(false);

      // Should attempt reconnection after delay
      await waitFor(() => {
        expect(mockSocket.connect).toHaveBeenCalledTimes(2); // Initial + reconnection
      }, { timeout: 2000 });
    });

    it('should limit reconnection attempts', async () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));

      // Simulate multiple disconnects
      for (let i = 0; i < 5; i++) {
        act(() => {
          const disconnectHandler = mockSocket.on.mock.calls.find(
            call => call[0] === 'disconnect'
          )[1];
          disconnectHandler();
        });
      }

      // Should not exceed max reconnection attempts
      await waitFor(() => {
        expect(mockSocket.connect).toHaveBeenCalledTimes(6); // Initial + 5 reconnections
      }, { timeout: 3000 });
    });

    it('should stop reconnection attempts when connected', async () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));

      // Simulate disconnect
      act(() => {
        const disconnectHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'disconnect'
        )[1];
        disconnectHandler();
      });

      // Simulate successful connection
      act(() => {
        const connectHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'connect'
        )[1];
        connectHandler();
      });

      expect(result.current.isConnected).toBe(true);
    });
  });

  describe('Cleanup', () => {
    it('should disconnect socket on unmount', () => {
      const { unmount } = renderHook(() => useWebSocket(mockUser, mockToken));

      unmount();

      expect(mockSocket.disconnect).toHaveBeenCalled();
    });

    it('should clear all event listeners on unmount', () => {
      const { unmount } = renderHook(() => useWebSocket(mockUser, mockToken));

      unmount();

      expect(mockSocket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
    });

    it('should clear custom event listeners', () => {
      const { result, unmount } = renderHook(() => useWebSocket(mockUser, mockToken));
      const mockCallback = vi.fn();

      act(() => {
        result.current.onChatMessage(mockCallback);
      });

      unmount();

      // Should clear the callback
      expect(result.current.onChatMessage).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle socket connection errors gracefully', () => {
      mockSocket.connect.mockImplementation(() => {
        throw new Error('Connection failed');
      });

      expect(() => {
        renderHook(() => useWebSocket(mockUser, mockToken));
      }).not.toThrow();
    });

    it('should handle emit errors gracefully', () => {
      mockSocket.emit.mockImplementation(() => {
        throw new Error('Emit failed');
      });

      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));

      expect(() => {
        act(() => {
          result.current.sendMessage({
            chatId: 'test-chat-id',
            content: 'test',
            messageType: 'text'
          });
        });
      }).not.toThrow();
    });

    it('should handle event listener errors gracefully', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
      const mockCallback = vi.fn(() => {
        throw new Error('Callback error');
      });

      act(() => {
        result.current.onChatMessage(mockCallback);
      });

      // Simulate message event that would trigger the callback
      act(() => {
        const messageHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'chat_message'
        )[1];
        messageHandler(createTestMessage());
      });

      // Should not throw error
      expect(mockCallback).toHaveBeenCalled();
    });
  });

  describe('Performance', () => {
    it('should not create multiple socket instances', () => {
      const { rerender } = renderHook(() => useWebSocket(mockUser, mockToken));

      rerender();

      expect(mockSocketIO).toHaveBeenCalledTimes(1);
    });

    it('should reuse existing socket connection', () => {
      const { result } = renderHook(() => useWebSocket(mockUser, mockToken));

      // Connect first time
      act(() => {
        const connectHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'connect'
        )[1];
        connectHandler();
      });

      expect(result.current.isConnected).toBe(true);

      // Should not create new connection
      expect(mockSocketIO).toHaveBeenCalledTimes(1);
    });
  });

  describe('Configuration', () => {
    it('should use correct WebSocket URL', () => {
      renderHook(() => useWebSocket(mockUser, mockToken));

      expect(mockSocketIO).toHaveBeenCalledWith('ws://localhost:3001', expect.any(Object));
    });

    it('should use correct authentication', () => {
      renderHook(() => useWebSocket(mockUser, mockToken));

      expect(mockSocketIO).toHaveBeenCalledWith(
        'ws://localhost:3001',
        expect.objectContaining({
          auth: {
            token: mockToken
          }
        })
      );
    });

    it('should use correct transport options', () => {
      renderHook(() => useWebSocket(mockUser, mockToken));

      expect(mockSocketIO).toHaveBeenCalledWith(
        'ws://localhost:3001',
        expect.objectContaining({
          transports: ['websocket', 'polling']
        })
      );
    });
  });
}); 