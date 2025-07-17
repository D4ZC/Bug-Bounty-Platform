const request = require('supertest');
const app = require('../../src/app');
const Chat = require('../../src/models/Chat');
const User = require('../../src/models/User');
const Team = require('../../src/models/Team');
const {
  createTestUser,
  createTestToken,
  createTestTeam,
  createTestChat,
  validateApiResponse,
  validateChatStructure
} = require('../setup');

describe('Chat Routes', () => {
  let user1, user2, user3, admin, team, token1, token2, token3, adminToken;

  beforeEach(async () => {
    // Crear usuarios de prueba
    user1 = await createTestUser({
      email: 'user1@example.com',
      nickname: 'user1'
    });
    user2 = await createTestUser({
      email: 'user2@example.com',
      nickname: 'user2'
    });
    user3 = await createTestUser({
      email: 'user3@example.com',
      nickname: 'user3'
    });
    admin = await createTestUser({
      email: 'admin@example.com',
      nickname: 'admin',
      role: 'admin'
    });

    // Crear tokens
    token1 = createTestToken(user1);
    token2 = createTestToken(user2);
    token3 = createTestToken(user3);
    adminToken = createTestToken(admin);

    // Crear equipo
    team = await createTestTeam({
      name: 'Test Team',
      leader: user1._id,
      members: [user2._id]
    });
  });

  describe('GET /api/chat', () => {
    it('should return user chats', async () => {
      // Crear chats para el usuario
      const privateChat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ]
      });

      const teamChat = await createTestChat({
        type: 'team',
        team: team._id,
        participants: [
          { user: user1._id, role: 'admin', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ]
      });

      const response = await request(app)
        .get('/api/chat')
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.chats).toHaveLength(2);
      expect(response.body.chats[0]).toHaveProperty('_id');
      expect(response.body.chats[0]).toHaveProperty('type');
      expect(response.body.chats[0]).toHaveProperty('unreadCount');
    });

    it('should return empty array for user with no chats', async () => {
      const response = await request(app)
        .get('/api/chat')
        .set('Authorization', `Bearer ${token3}`);

      validateApiResponse(response);
      expect(response.body.chats).toHaveLength(0);
    });

    it('should fail without authentication', async () => {
      const response = await request(app)
        .get('/api/chat');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/chat/:chatId', () => {
    let chat;

    beforeEach(async () => {
      chat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ],
        messages: [
          {
            sender: user1._id,
            content: 'Hello!',
            messageType: 'text',
            timestamp: new Date()
          },
          {
            sender: user2._id,
            content: 'Hi there!',
            messageType: 'text',
            timestamp: new Date()
          }
        ]
      });
    });

    it('should return chat with messages', async () => {
      const response = await request(app)
        .get(`/api/chat/${chat._id}`)
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.chat._id).toBe(chat._id.toString());
      expect(response.body.messages).toHaveLength(2);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.current).toBe(1);
      expect(response.body.pagination.total).toBe(2);
    });

    it('should paginate messages correctly', async () => {
      // Agregar más mensajes
      for (let i = 0; i < 60; i++) {
        chat.messages.push({
          sender: user1._id,
          content: `Message ${i}`,
          messageType: 'text',
          timestamp: new Date()
        });
      }
      await chat.save();

      const response = await request(app)
        .get(`/api/chat/${chat._id}?page=2&limit=30`)
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.messages).toHaveLength(30);
      expect(response.body.pagination.current).toBe(2);
      expect(response.body.pagination.pages).toBe(3);
    });

    it('should fail for non-participant', async () => {
      const response = await request(app)
        .get(`/api/chat/${chat._id}`)
        .set('Authorization', `Bearer ${token3}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('No tienes acceso a este chat');
    });

    it('should fail for non-existent chat', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/chat/${fakeId}`)
        .set('Authorization', `Bearer ${token1}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Chat no encontrado');
    });
  });

  describe('POST /api/chat/private', () => {
    it('should create private chat between two users', async () => {
      const chatData = {
        userId: user2._id.toString()
      };

      const response = await request(app)
        .post('/api/chat/private')
        .set('Authorization', `Bearer ${token1}`)
        .send(chatData);

      validateApiResponse(response);
      expect(response.body.chat.type).toBe('private');
      expect(response.body.chat.participants).toHaveLength(2);
      expect(response.body.chat.participants.some(p => p.user._id === user1._id.toString())).toBe(true);
      expect(response.body.chat.participants.some(p => p.user._id === user2._id.toString())).toBe(true);
    });

    it('should return existing private chat if already exists', async () => {
      // Crear chat privado existente
      const existingChat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ]
      });

      const chatData = {
        userId: user2._id.toString()
      };

      const response = await request(app)
        .post('/api/chat/private')
        .set('Authorization', `Bearer ${token1}`)
        .send(chatData);

      validateApiResponse(response);
      expect(response.body.chat._id).toBe(existingChat._id.toString());
    });

    it('should not allow private chat with self', async () => {
      const chatData = {
        userId: user1._id.toString()
      };

      const response = await request(app)
        .post('/api/chat/private')
        .set('Authorization', `Bearer ${token1}`)
        .send(chatData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('No puedes crear un chat privado contigo mismo');
    });

    it('should fail with non-existent user', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const chatData = {
        userId: fakeId
      };

      const response = await request(app)
        .post('/api/chat/private')
        .set('Authorization', `Bearer ${token1}`)
        .send(chatData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Usuario no encontrado');
    });

    it('should fail without userId', async () => {
      const response = await request(app)
        .post('/api/chat/private')
        .set('Authorization', `Bearer ${token1}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Se requiere ID de usuario');
    });
  });

  describe('POST /api/chat/team/:teamId', () => {
    it('should create team chat for team member', async () => {
      const response = await request(app)
        .post(`/api/chat/team/${team._id}`)
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.chat.type).toBe('team');
      expect(response.body.chat.team._id).toBe(team._id.toString());
      expect(response.body.chat.participants).toHaveLength(2);
    });

    it('should return existing team chat if already exists', async () => {
      // Crear chat de equipo existente
      const existingChat = await createTestChat({
        type: 'team',
        team: team._id,
        participants: [
          { user: user1._id, role: 'admin', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ]
      });

      const response = await request(app)
        .post(`/api/chat/team/${team._id}`)
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.chat._id).toBe(existingChat._id.toString());
    });

    it('should fail for non-team member', async () => {
      const response = await request(app)
        .post(`/api/chat/team/${team._id}`)
        .set('Authorization', `Bearer ${token3}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('No eres miembro de este equipo');
    });

    it('should fail for non-existent team', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .post(`/api/chat/team/${fakeId}`)
        .set('Authorization', `Bearer ${token1}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Equipo no encontrado');
    });
  });

  describe('GET /api/chat/global/chat', () => {
    it('should return global chat', async () => {
      const response = await request(app)
        .get('/api/chat/global/chat')
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.chat.type).toBe('global');
      expect(response.body.chat.settings.name).toBe('Chat Global');
    });

    it('should add user to global chat if not participant', async () => {
      const response = await request(app)
        .get('/api/chat/global/chat')
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.chat.participants.some(p => p.user._id === user1._id.toString())).toBe(true);
    });
  });

  describe('POST /api/chat/:chatId/messages', () => {
    let chat;

    beforeEach(async () => {
      chat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ]
      });
    });

    it('should send message successfully', async () => {
      const messageData = {
        content: 'Hello, this is a test message!',
        messageType: 'text'
      };

      const response = await request(app)
        .post(`/api/chat/${chat._id}/messages`)
        .set('Authorization', `Bearer ${token1}`)
        .send(messageData);

      validateApiResponse(response);
      expect(response.body.message.content).toBe(messageData.content);
      expect(response.body.message.messageType).toBe(messageData.messageType);
      expect(response.body.message.sender).toBe(user1._id.toString());
    });

    it('should fail with empty message', async () => {
      const messageData = {
        content: '',
        messageType: 'text'
      };

      const response = await request(app)
        .post(`/api/chat/${chat._id}/messages`)
        .set('Authorization', `Bearer ${token1}`)
        .send(messageData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('El mensaje no puede estar vacío');
    });

    it('should fail with message too long', async () => {
      const longMessage = 'a'.repeat(2001);
      const messageData = {
        content: longMessage,
        messageType: 'text'
      };

      const response = await request(app)
        .post(`/api/chat/${chat._id}/messages`)
        .set('Authorization', `Bearer ${token1}`)
        .send(messageData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('El mensaje es demasiado largo');
    });

    it('should fail for non-participant', async () => {
      const messageData = {
        content: 'Hello!',
        messageType: 'text'
      };

      const response = await request(app)
        .post(`/api/chat/${chat._id}/messages`)
        .set('Authorization', `Bearer ${token3}`)
        .send(messageData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('No eres participante de este chat');
    });

    it('should support reply to message', async () => {
      // Crear mensaje original
      const originalMessage = {
        sender: user2._id,
        content: 'Original message',
        messageType: 'text',
        timestamp: new Date()
      };
      chat.messages.push(originalMessage);
      await chat.save();

      const messageData = {
        content: 'This is a reply',
        messageType: 'text',
        replyTo: originalMessage._id
      };

      const response = await request(app)
        .post(`/api/chat/${chat._id}/messages`)
        .set('Authorization', `Bearer ${token1}`)
        .send(messageData);

      validateApiResponse(response);
      expect(response.body.message.replyTo).toBe(originalMessage._id.toString());
    });
  });

  describe('PUT /api/chat/:chatId/messages/:messageId', () => {
    let chat, message;

    beforeEach(async () => {
      chat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ],
        messages: [
          {
            sender: user1._id,
            content: 'Original message',
            messageType: 'text',
            timestamp: new Date()
          }
        ]
      });
      message = chat.messages[0];
    });

    it('should edit message successfully', async () => {
      const editData = {
        content: 'Edited message content'
      };

      const response = await request(app)
        .put(`/api/chat/${chat._id}/messages/${message._id}`)
        .set('Authorization', `Bearer ${token1}`)
        .send(editData);

      validateApiResponse(response);
      expect(response.body.message.content).toBe(editData.content);
      expect(response.body.message.isEdited).toBe(true);
      expect(response.body.message.editedAt).toBeDefined();
    });

    it('should fail editing other user message', async () => {
      // Cambiar el sender del mensaje
      message.sender = user2._id;
      await chat.save();

      const editData = {
        content: 'Edited message content'
      };

      const response = await request(app)
        .put(`/api/chat/${chat._id}/messages/${message._id}`)
        .set('Authorization', `Bearer ${token1}`)
        .send(editData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Solo puedes editar tus propios mensajes');
    });

    it('should fail with empty content', async () => {
      const editData = {
        content: ''
      };

      const response = await request(app)
        .put(`/api/chat/${chat._id}/messages/${message._id}`)
        .set('Authorization', `Bearer ${token1}`)
        .send(editData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('El mensaje no puede estar vacío');
    });
  });

  describe('DELETE /api/chat/:chatId/messages/:messageId', () => {
    let chat, message;

    beforeEach(async () => {
      chat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ],
        messages: [
          {
            sender: user1._id,
            content: 'Message to delete',
            messageType: 'text',
            timestamp: new Date()
          }
        ]
      });
      message = chat.messages[0];
    });

    it('should delete message successfully', async () => {
      const response = await request(app)
        .delete(`/api/chat/${chat._id}/messages/${message._id}`)
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.message).toContain('Mensaje eliminado correctamente');
    });

    it('should allow admin to delete any message', async () => {
      // Cambiar el sender del mensaje
      message.sender = user2._id;
      await chat.save();

      const response = await request(app)
        .delete(`/api/chat/${chat._id}/messages/${message._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      validateApiResponse(response);
      expect(response.body.message).toContain('Mensaje eliminado correctamente');
    });

    it('should fail deleting other user message', async () => {
      // Cambiar el sender del mensaje
      message.sender = user2._id;
      await chat.save();

      const response = await request(app)
        .delete(`/api/chat/${chat._id}/messages/${message._id}`)
        .set('Authorization', `Bearer ${token1}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('No tienes permisos para eliminar este mensaje');
    });
  });

  describe('POST /api/chat/:chatId/messages/:messageId/reactions', () => {
    let chat, message;

    beforeEach(async () => {
      chat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ],
        messages: [
          {
            sender: user1._id,
            content: 'Message to react to',
            messageType: 'text',
            timestamp: new Date()
          }
        ]
      });
      message = chat.messages[0];
    });

    it('should add reaction successfully', async () => {
      const reactionData = {
        emoji: '👍'
      };

      const response = await request(app)
        .post(`/api/chat/${chat._id}/messages/${message._id}/reactions`)
        .set('Authorization', `Bearer ${token2}`)
        .send(reactionData);

      validateApiResponse(response);
      expect(response.body.message.reactions).toHaveLength(1);
      expect(response.body.message.reactions[0].emoji).toBe('👍');
      expect(response.body.message.reactions[0].user).toBe(user2._id.toString());
    });

    it('should remove reaction if already exists', async () => {
      // Agregar reacción primero
      message.reactions.push({
        user: user2._id,
        emoji: '👍',
        timestamp: new Date()
      });
      await chat.save();

      const reactionData = {
        emoji: '👍'
      };

      const response = await request(app)
        .post(`/api/chat/${chat._id}/messages/${message._id}/reactions`)
        .set('Authorization', `Bearer ${token2}`)
        .send(reactionData);

      validateApiResponse(response);
      expect(response.body.message.reactions).toHaveLength(0);
    });

    it('should fail without emoji', async () => {
      const response = await request(app)
        .post(`/api/chat/${chat._id}/messages/${message._id}/reactions`)
        .set('Authorization', `Bearer ${token2}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Se requiere emoji');
    });
  });

  describe('POST /api/chat/:chatId/read', () => {
    let chat;

    beforeEach(async () => {
      chat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ]
      });
    });

    it('should mark chat as read successfully', async () => {
      const response = await request(app)
        .post(`/api/chat/${chat._id}/read`)
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.message).toContain('Chat marcado como leído');
    });
  });

  describe('GET /api/chat/search/users', () => {
    it('should search users by query', async () => {
      const response = await request(app)
        .get('/api/chat/search/users?query=user&limit=5')
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.users).toBeDefined();
      expect(response.body.users.length).toBeGreaterThan(0);
      expect(response.body.users[0]).toHaveProperty('firstName');
      expect(response.body.users[0]).toHaveProperty('lastName');
      expect(response.body.users[0]).toHaveProperty('nickname');
    });

    it('should return empty array for short query', async () => {
      const response = await request(app)
        .get('/api/chat/search/users?query=a')
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.users).toHaveLength(0);
    });
  });

  describe('GET /api/chat/:chatId/stats', () => {
    let chat;

    beforeEach(async () => {
      chat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ],
        messages: [
          {
            sender: user1._id,
            content: 'Message 1',
            messageType: 'text',
            timestamp: new Date()
          },
          {
            sender: user2._id,
            content: 'Message 2',
            messageType: 'text',
            timestamp: new Date()
          }
        ]
      });
    });

    it('should return chat statistics', async () => {
      const response = await request(app)
        .get(`/api/chat/${chat._id}/stats`)
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.stats.messageCount).toBe(2);
      expect(response.body.stats.participantCount).toBe(2);
      expect(response.body.stats.activeParticipants).toBe(2);
      expect(response.body.stats.lastActivity).toBeDefined();
    });
  });

  describe('GET /api/chat/:chatId/unread', () => {
    let chat;

    beforeEach(async () => {
      chat = await createTestChat({
        type: 'private',
        participants: [
          { user: user1._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(Date.now() - 1000), isActive: true },
          { user: user2._id, role: 'member', joinedAt: new Date(), lastSeen: new Date(), isActive: true }
        ],
        messages: [
          {
            sender: user2._id,
            content: 'Unread message',
            messageType: 'text',
            timestamp: new Date()
          }
        ]
      });
    });

    it('should return unread messages', async () => {
      const response = await request(app)
        .get(`/api/chat/${chat._id}/unread`)
        .set('Authorization', `Bearer ${token1}`);

      validateApiResponse(response);
      expect(response.body.messages).toHaveLength(1);
      expect(response.body.count).toBe(1);
    });
  });
}); 