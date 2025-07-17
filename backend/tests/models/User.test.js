const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../src/models/User');
const {
  createTestUser,
  createTestToken,
  validateUserStructure
} = require('../setup');

describe('User Model', () => {
  describe('Schema Validation', () => {
    it('should create a valid user with required fields', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        nickname: 'johndoe'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.firstName).toBe(userData.firstName);
      expect(savedUser.lastName).toBe(userData.lastName);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.nickname).toBe(userData.nickname);
      expect(savedUser.role).toBe('member'); // valor por defecto
      expect(savedUser.isActive).toBe(true); // valor por defecto
      expect(savedUser.points).toBe(0); // valor por defecto
    });

    it('should require firstName', async () => {
      const userData = {
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        nickname: 'johndoe'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.firstName).toBeDefined();
    });

    it('should require lastName', async () => {
      const userData = {
        firstName: 'John',
        email: 'john@example.com',
        password: 'password123',
        nickname: 'johndoe'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.lastName).toBeDefined();
    });

    it('should require email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
        nickname: 'johndoe'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.email).toBeDefined();
    });

    it('should require password', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        nickname: 'johndoe'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.password).toBeDefined();
    });

    it('should require nickname', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.nickname).toBeDefined();
    });

    it('should validate email format', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'password123',
        nickname: 'johndoe'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.email).toBeDefined();
    });

    it('should validate password length', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '123', // muy corto
        nickname: 'johndoe'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.password).toBeDefined();
    });

    it('should ensure unique email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        nickname: 'johndoe'
      };

      // Crear primer usuario
      await new User(userData).save();

      // Intentar crear segundo usuario con mismo email
      const user2 = new User({
        ...userData,
        nickname: 'johndoe2'
      });

      let error;
      try {
        await user2.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.code).toBe(11000); // código de duplicado
    });

    it('should ensure unique nickname', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        nickname: 'johndoe'
      };

      // Crear primer usuario
      await new User(userData).save();

      // Intentar crear segundo usuario con mismo nickname
      const user2 = new User({
        ...userData,
        email: 'john2@example.com'
      });

      let error;
      try {
        await user2.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.code).toBe(11000); // código de duplicado
    });
  });

  describe('Default Values', () => {
    it('should set default role to member', async () => {
      const user = await createTestUser({ role: undefined });
      expect(user.role).toBe('member');
    });

    it('should set default isActive to true', async () => {
      const user = await createTestUser({ isActive: undefined });
      expect(user.isActive).toBe(true);
    });

    it('should set default points to 0', async () => {
      const user = await createTestUser({ points: undefined });
      expect(user.points).toBe(0);
    });

    it('should set default rango to Novato', async () => {
      const user = await createTestUser({ rango: undefined });
      expect(user.rango).toBe('Novato');
    });

    it('should set default rangoIcon to 🥉', async () => {
      const user = await createTestUser({ rangoIcon: undefined });
      expect(user.rangoIcon).toBe('🥉');
    });

    it('should set default preferences', async () => {
      const user = await createTestUser({ preferences: undefined });
      expect(user.preferences).toBeDefined();
      expect(user.preferences.notifications).toBeDefined();
      expect(user.preferences.notifications.email).toBe(true);
      expect(user.preferences.notifications.push).toBe(true);
      expect(user.preferences.theme).toBe('light');
      expect(user.preferences.language).toBe('es');
    });
  });

  describe('Instance Methods', () => {
    describe('comparePassword', () => {
      it('should return true for correct password', async () => {
        const user = await createTestUser({ password: 'password123' });
        const isMatch = await user.comparePassword('password123');
        expect(isMatch).toBe(true);
      });

      it('should return false for incorrect password', async () => {
        const user = await createTestUser({ password: 'password123' });
        const isMatch = await user.comparePassword('wrongpassword');
        expect(isMatch).toBe(false);
      });
    });

    describe('updatePoints', () => {
      it('should add points correctly', async () => {
        const user = await createTestUser({ points: 100 });
        await user.updatePoints(50);
        expect(user.points).toBe(150);
      });

      it('should subtract points correctly', async () => {
        const user = await createTestUser({ points: 100 });
        await user.updatePoints(-30);
        expect(user.points).toBe(70);
      });

      it('should not allow negative points', async () => {
        const user = await createTestUser({ points: 50 });
        await user.updatePoints(-100);
        expect(user.points).toBe(0);
      });

      it('should update rango based on points', async () => {
        const user = await createTestUser({ points: 100, rango: 'Novato' });
        await user.updatePoints(500); // 600 total points
        expect(user.rango).toBe('Experto');
        expect(user.rangoIcon).toBe('🥇');
      });
    });

    describe('updateRango', () => {
      it('should update rango to Novato for 0-99 points', async () => {
        const user = await createTestUser({ points: 50 });
        await user.updateRango();
        expect(user.rango).toBe('Novato');
        expect(user.rangoIcon).toBe('🥉');
      });

      it('should update rango to Intermedio for 100-299 points', async () => {
        const user = await createTestUser({ points: 200 });
        await user.updateRango();
        expect(user.rango).toBe('Intermedio');
        expect(user.rangoIcon).toBe('🥈');
      });

      it('should update rango to Experto for 300-599 points', async () => {
        const user = await createTestUser({ points: 400 });
        await user.updateRango();
        expect(user.rango).toBe('Experto');
        expect(user.rangoIcon).toBe('🥇');
      });

      it('should update rango to Maestro for 600+ points', async () => {
        const user = await createTestUser({ points: 700 });
        await user.updateRango();
        expect(user.rango).toBe('Maestro');
        expect(user.rangoIcon).toBe('👑');
      });
    });

    describe('getFullName', () => {
      it('should return full name correctly', async () => {
        const user = await createTestUser({
          firstName: 'John',
          lastName: 'Doe'
        });
        expect(user.getFullName()).toBe('John Doe');
      });
    });

    describe('isAdmin', () => {
      it('should return true for admin role', async () => {
        const user = await createTestUser({ role: 'admin' });
        expect(user.isAdmin()).toBe(true);
      });

      it('should return false for non-admin role', async () => {
        const user = await createTestUser({ role: 'member' });
        expect(user.isAdmin()).toBe(false);
      });
    });

    describe('isTeamLeader', () => {
      it('should return true for team leader role', async () => {
        const user = await createTestUser({ role: 'teamLeader' });
        expect(user.isTeamLeader()).toBe(true);
      });

      it('should return false for non-team leader role', async () => {
        const user = await createTestUser({ role: 'member' });
        expect(user.isTeamLeader()).toBe(false);
      });
    });
  });

  describe('Static Methods', () => {
    describe('findByEmail', () => {
      it('should find user by email', async () => {
        const user = await createTestUser({ email: 'test@example.com' });
        const foundUser = await User.findByEmail('test@example.com');
        expect(foundUser._id.toString()).toBe(user._id.toString());
      });

      it('should return null for non-existent email', async () => {
        const foundUser = await User.findByEmail('nonexistent@example.com');
        expect(foundUser).toBeNull();
      });
    });

    describe('findByNickname', () => {
      it('should find user by nickname', async () => {
        const user = await createTestUser({ nickname: 'testuser' });
        const foundUser = await User.findByNickname('testuser');
        expect(foundUser._id.toString()).toBe(user._id.toString());
      });

      it('should return null for non-existent nickname', async () => {
        const foundUser = await User.findByNickname('nonexistent');
        expect(foundUser).toBeNull();
      });
    });

    describe('getRankings', () => {
      it('should return users ordered by points', async () => {
        const user1 = await createTestUser({ points: 100, nickname: 'user1' });
        const user2 = await createTestUser({ points: 300, nickname: 'user2' });
        const user3 = await createTestUser({ points: 200, nickname: 'user3' });

        const rankings = await User.getRankings();
        
        expect(rankings).toHaveLength(3);
        expect(rankings[0].nickname).toBe('user2'); // 300 points
        expect(rankings[1].nickname).toBe('user3'); // 200 points
        expect(rankings[2].nickname).toBe('user1'); // 100 points
      });

      it('should limit results correctly', async () => {
        await createTestUser({ points: 100, nickname: 'user1' });
        await createTestUser({ points: 200, nickname: 'user2' });
        await createTestUser({ points: 300, nickname: 'user3' });

        const rankings = await User.getRankings(2);
        expect(rankings).toHaveLength(2);
        expect(rankings[0].nickname).toBe('user3');
        expect(rankings[1].nickname).toBe('user2');
      });
    });

    describe('getActiveUsers', () => {
      it('should return only active users', async () => {
        const activeUser = await createTestUser({ isActive: true });
        await createTestUser({ isActive: false });

        const activeUsers = await User.getActiveUsers();
        expect(activeUsers).toHaveLength(1);
        expect(activeUsers[0]._id.toString()).toBe(activeUser._id.toString());
      });
    });

    describe('getUsersByRole', () => {
      it('should return users by role', async () => {
        const admin = await createTestUser({ role: 'admin' });
        const member = await createTestUser({ role: 'member' });

        const admins = await User.getUsersByRole('admin');
        const members = await User.getUsersByRole('member');

        expect(admins).toHaveLength(1);
        expect(admins[0]._id.toString()).toBe(admin._id.toString());
        expect(members).toHaveLength(1);
        expect(members[0]._id.toString()).toBe(member._id.toString());
      });
    });
  });

  describe('Middleware', () => {
    describe('Password Hashing', () => {
      it('should hash password before saving', async () => {
        const userData = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
          nickname: 'johndoe'
        };

        const user = new User(userData);
        await user.save();

        expect(user.password).not.toBe('password123');
        expect(user.password).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/); // bcrypt pattern
      });

      it('should not rehash password if not modified', async () => {
        const user = await createTestUser();
        const originalHash = user.password;

        user.firstName = 'Updated';
        await user.save();

        expect(user.password).toBe(originalHash);
      });
    });

    describe('Email Normalization', () => {
      it('should normalize email to lowercase', async () => {
        const user = await createTestUser({ email: 'TEST@EXAMPLE.COM' });
        expect(user.email).toBe('test@example.com');
      });
    });

    describe('Nickname Normalization', () => {
      it('should normalize nickname to lowercase', async () => {
        const user = await createTestUser({ nickname: 'TESTUSER' });
        expect(user.nickname).toBe('testuser');
      });
    });
  });

  describe('Virtual Fields', () => {
    it('should have fullName virtual', async () => {
      const user = await createTestUser({
        firstName: 'John',
        lastName: 'Doe'
      });
      expect(user.fullName).toBe('John Doe');
    });

    it('should have displayName virtual', async () => {
      const user = await createTestUser({
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'johndoe'
      });
      expect(user.displayName).toBe('johndoe');
    });
  });

  describe('Indexes', () => {
    it('should have unique email index', async () => {
      const indexes = await User.collection.indexes();
      const emailIndex = indexes.find(index => 
        index.key && index.key.email === 1
      );
      expect(emailIndex).toBeDefined();
      expect(emailIndex.unique).toBe(true);
    });

    it('should have unique nickname index', async () => {
      const indexes = await User.collection.indexes();
      const nicknameIndex = indexes.find(index => 
        index.key && index.key.nickname === 1
      );
      expect(nicknameIndex).toBeDefined();
      expect(nicknameIndex.unique).toBe(true);
    });

    it('should have points index for rankings', async () => {
      const indexes = await User.collection.indexes();
      const pointsIndex = indexes.find(index => 
        index.key && index.key.points === -1
      );
      expect(pointsIndex).toBeDefined();
    });
  });
});
