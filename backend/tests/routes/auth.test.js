const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/User');
const {
  createTestUser,
  createTestToken,
  validateApiResponse,
  validateUserStructure
} = require('../setup');

describe('Auth Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        nickname: 'johndoe'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      validateApiResponse(response, 201);
      
      const { user, token } = response.body;
      expect(token).toBeDefined();
      validateUserStructure(user);
      expect(user.email).toBe(userData.email);
      expect(user.nickname).toBe(userData.nickname);
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.role).toBe('member');
      expect(user.points).toBe(0);
      expect(user.isActive).toBe(true);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors).toContain('El nombre es requerido');
      expect(response.body.errors).toContain('El apellido es requerido');
      expect(response.body.errors).toContain('El email es requerido');
      expect(response.body.errors).toContain('La contraseña es requerida');
      expect(response.body.errors).toContain('El nickname es requerido');
    });

    it('should validate email format', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'password123',
        confirmPassword: 'password123',
        nickname: 'johndoe'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('El email debe tener un formato válido');
    });

    it('should validate password length', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '123',
        confirmPassword: '123',
        nickname: 'johndoe'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('La contraseña debe tener al menos 6 caracteres');
    });

    it('should validate password confirmation', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'differentpassword',
        nickname: 'johndoe'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('Las contraseñas no coinciden');
    });

    it('should not allow duplicate email', async () => {
      const existingUser = await createTestUser({ email: 'john@example.com' });

      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        nickname: 'johndoe2'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('email ya existe');
    });

    it('should not allow duplicate nickname', async () => {
      const existingUser = await createTestUser({ nickname: 'johndoe' });

      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john2@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        nickname: 'johndoe'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('nickname ya existe');
    });

    it('should generate unique nickname if not provided', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      validateApiResponse(response, 201);
      expect(response.body.user.nickname).toBeDefined();
      expect(response.body.user.nickname).toMatch(/^john_doe_\d+$/);
    });

    it('should assign random rank and icon', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        nickname: 'johndoe'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      validateApiResponse(response, 201);
      expect(response.body.user.rango).toBeDefined();
      expect(response.body.user.rangoIcon).toBeDefined();
      expect(['Novato', 'Intermedio', 'Experto', 'Maestro']).toContain(response.body.user.rango);
      expect(['🥉', '🥈', '🥇', '👑']).toContain(response.body.user.rangoIcon);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const user = await createTestUser({
        email: 'john@example.com',
        password: 'password123'
      });

      const loginData = {
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      validateApiResponse(response);
      
      const { user: loggedUser, token } = response.body;
      expect(token).toBeDefined();
      validateUserStructure(loggedUser);
      expect(loggedUser.email).toBe(loginData.email);
      expect(loggedUser.lastLogin).toBeDefined();
    });

    it('should fail with invalid email', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Credenciales inválidas');
    });

    it('should fail with invalid password', async () => {
      const user = await createTestUser({
        email: 'john@example.com',
        password: 'password123'
      });

      const loginData = {
        email: 'john@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Credenciales inválidas');
    });

    it('should fail with inactive user', async () => {
      const user = await createTestUser({
        email: 'john@example.com',
        password: 'password123',
        isActive: false
      });

      const loginData = {
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Cuenta desactivada');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors).toContain('El email es requerido');
      expect(response.body.errors).toContain('La contraseña es requerida');
    });

    it('should update lastLogin timestamp', async () => {
      const user = await createTestUser({
        email: 'john@example.com',
        password: 'password123'
      });

      const originalLastLogin = user.lastLogin;

      const loginData = {
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      validateApiResponse(response);
      
      // Verificar que lastLogin se actualizó
      const updatedUser = await User.findById(user._id);
      expect(updatedUser.lastLogin.getTime()).toBeGreaterThan(originalLastLogin.getTime());
    });
  });

  describe('GET /api/auth/profile', () => {
    it('should return user profile with valid token', async () => {
      const user = await createTestUser();
      const token = createTestToken(user);

      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      validateApiResponse(response);
      validateUserStructure(response.body.user);
      expect(response.body.user._id).toBe(user._id.toString());
    });

    it('should fail without token', async () => {
      const response = await request(app)
        .get('/api/auth/profile');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Token no proporcionado');
    });

    it('should fail with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Token inválido');
    });

    it('should fail with expired token', async () => {
      const user = await createTestUser();
      const expiredToken = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '0s' }
      );

      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Token expirado');
    });
  });

  describe('PUT /api/auth/profile', () => {
    it('should update user profile successfully', async () => {
      const user = await createTestUser();
      const token = createTestToken(user);

      const updateData = {
        firstName: 'Updated',
        lastName: 'Name',
        nickname: 'updatednick'
      };

      const response = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      validateApiResponse(response);
      expect(response.body.user.firstName).toBe(updateData.firstName);
      expect(response.body.user.lastName).toBe(updateData.lastName);
      expect(response.body.user.nickname).toBe(updateData.nickname);
    });

    it('should validate nickname uniqueness', async () => {
      const user1 = await createTestUser({ nickname: 'user1' });
      const user2 = await createTestUser({ nickname: 'user2' });
      const token = createTestToken(user2);

      const updateData = {
        nickname: 'user1'
      };

      const response = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('nickname ya existe');
    });

    it('should allow updating own nickname', async () => {
      const user = await createTestUser({ nickname: 'original' });
      const token = createTestToken(user);

      const updateData = {
        nickname: 'original' // mismo nickname
      };

      const response = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      validateApiResponse(response);
      expect(response.body.user.nickname).toBe(updateData.nickname);
    });

    it('should validate nickname format', async () => {
      const user = await createTestUser();
      const token = createTestToken(user);

      const updateData = {
        nickname: 'invalid nickname with spaces'
      };

      const response = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('El nickname solo puede contener letras, números y guiones bajos');
    });
  });

  describe('PUT /api/auth/password', () => {
    it('should change password successfully', async () => {
      const user = await createTestUser({ password: 'oldpassword' });
      const token = createTestToken(user);

      const passwordData = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword123',
        confirmPassword: 'newpassword123'
      };

      const response = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${token}`)
        .send(passwordData);

      validateApiResponse(response);
      expect(response.body.message).toContain('Contraseña actualizada correctamente');

      // Verificar que la nueva contraseña funciona
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: user.email,
          password: 'newpassword123'
        });

      expect(loginResponse.status).toBe(200);
    });

    it('should fail with incorrect current password', async () => {
      const user = await createTestUser({ password: 'oldpassword' });
      const token = createTestToken(user);

      const passwordData = {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword123',
        confirmPassword: 'newpassword123'
      };

      const response = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${token}`)
        .send(passwordData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Contraseña actual incorrecta');
    });

    it('should validate new password length', async () => {
      const user = await createTestUser({ password: 'oldpassword' });
      const token = createTestToken(user);

      const passwordData = {
        currentPassword: 'oldpassword',
        newPassword: '123',
        confirmPassword: '123'
      };

      const response = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${token}`)
        .send(passwordData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('La nueva contraseña debe tener al menos 6 caracteres');
    });

    it('should validate password confirmation', async () => {
      const user = await createTestUser({ password: 'oldpassword' });
      const token = createTestToken(user);

      const passwordData = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword123',
        confirmPassword: 'differentpassword'
      };

      const response = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${token}`)
        .send(passwordData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('Las contraseñas no coinciden');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully', async () => {
      const user = await createTestUser();
      const token = createTestToken(user);

      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      validateApiResponse(response);
      expect(response.body.message).toContain('Sesión cerrada exitosamente');
    });

    it('should fail without token', async () => {
      const response = await request(app)
        .post('/api/auth/logout');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Token no proporcionado');
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh token successfully', async () => {
      const user = await createTestUser();
      const token = createTestToken(user);

      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Authorization', `Bearer ${token}`);

      validateApiResponse(response);
      expect(response.body.token).toBeDefined();
      expect(response.body.token).not.toBe(token);
    });

    it('should fail with invalid token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Token inválido');
    });
  });
}); 