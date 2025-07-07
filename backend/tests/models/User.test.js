const mongoose = require('mongoose');
const User = require('../../src/models/User');

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('Validación de campos', () => {
    it('debería crear un usuario válido', async () => {
      const userData = {
        w3id: 'test-w3id-123',
        email: 'test@example.com',
        name: 'Test User',
        teamId: new mongoose.Types.ObjectId()
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.w3id).toBe(userData.w3id);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.name).toBe(userData.name);
      expect(savedUser.points).toBe(0);
      expect(savedUser.isActive).toBe(true);
    });

    it('debería requerir w3id', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        teamId: new mongoose.Types.ObjectId()
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.w3id).toBeDefined();
    });

    it('debería requerir email', async () => {
      const userData = {
        w3id: 'test-w3id-123',
        name: 'Test User',
        teamId: new mongoose.Types.ObjectId()
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

    it('debería requerir name', async () => {
      const userData = {
        w3id: 'test-w3id-123',
        email: 'test@example.com',
        teamId: new mongoose.Types.ObjectId()
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.name).toBeDefined();
    });

    it('debería requerir teamId', async () => {
      const userData = {
        w3id: 'test-w3id-123',
        email: 'test@example.com',
        name: 'Test User'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.teamId).toBeDefined();
    });
  });

  describe('Métodos de instancia', () => {
    let user;

    beforeEach(async () => {
      user = new User({
        w3id: 'test-w3id-123',
        email: 'test@example.com',
        name: 'Test User',
        teamId: new mongoose.Types.ObjectId()
      });
      await user.save();
    });

    it('debería agregar puntos correctamente', async () => {
      await user.addPoints(100);
      expect(user.points).toBe(100);
      expect(user.totalPoints).toBe(100);
      expect(user.monthlyPoints).toBe(100);
    });

    it('debería remover puntos correctamente', async () => {
      await user.addPoints(100);
      await user.removePoints(30);
      expect(user.points).toBe(70);
    });

    it('no debería tener puntos negativos', async () => {
      await user.removePoints(50);
      expect(user.points).toBe(0);
    });

    it('debería actualizar estadísticas de vulnerabilidades', async () => {
      await user.updateVulnerabilityStats('critical');
      expect(user.vulnerabilitiesSolved.critical).toBe(1);
    });

    it('debería resetear puntos mensuales', async () => {
      await user.addPoints(100);
      await user.resetMonthlyPoints();
      expect(user.monthlyPoints).toBe(0);
      expect(user.consecutiveMvpMonths).toBe(0);
      expect(user.isCurrentMvp).toBe(false);
    });

    it('debería establecer MVP', async () => {
      await user.setMvp();
      expect(user.isCurrentMvp).toBe(true);
      expect(user.mvpCount).toBe(1);
      expect(user.consecutiveMvpMonths).toBe(1);
    });

    it('debería entrar al Gulag', async () => {
      await user.enterGulag();
      expect(user.isInGulag).toBe(true);
      expect(user.gulagStartDate).toBeDefined();
    });

    it('debería salir del Gulag', async () => {
      await user.enterGulag();
      await user.exitGulag();
      expect(user.isInGulag).toBe(false);
      expect(user.gulagStartDate).toBeNull();
    });
  });

  describe('Virtuals', () => {
    let user;

    beforeEach(async () => {
      user = new User({
        w3id: 'test-w3id-123',
        email: 'test@example.com',
        name: 'Test User',
        teamId: new mongoose.Types.ObjectId()
      });
      await user.save();
    });

    it('debería calcular total de vulnerabilidades resueltas', () => {
      user.vulnerabilitiesSolved = {
        critical: 2,
        high: 3,
        medium: 1,
        low: 4
      };

      expect(user.totalVulnerabilitiesSolved).toBe(10);
    });

    it('debería calcular promedio de prioridad de vulnerabilidades', () => {
      user.vulnerabilitiesSolved = {
        critical: 1,
        high: 1,
        medium: 1,
        low: 1
      };

      expect(user.averageVulnerabilityPriority).toBe(2.5);
    });

    it('debería retornar 0 si no hay vulnerabilidades resueltas', () => {
      expect(user.averageVulnerabilityPriority).toBe(0);
    });
  });

  describe('Métodos estáticos', () => {
    beforeEach(async () => {
      const users = [
        {
          w3id: 'user1',
          email: 'user1@example.com',
          name: 'User 1',
          teamId: new mongoose.Types.ObjectId(),
          points: 100
        },
        {
          w3id: 'user2',
          email: 'user2@example.com',
          name: 'User 2',
          teamId: new mongoose.Types.ObjectId(),
          points: 200
        },
        {
          w3id: 'user3',
          email: 'user3@example.com',
          name: 'User 3',
          teamId: new mongoose.Types.ObjectId(),
          points: 50
        }
      ];

      for (const userData of users) {
        const user = new User(userData);
        await user.save();
      }
    });

    it('debería obtener usuarios top', async () => {
      const topUsers = await User.getTopUsers(2);
      expect(topUsers).toHaveLength(2);
      expect(topUsers[0].points).toBe(200);
      expect(topUsers[1].points).toBe(100);
    });

    it('debería obtener usuarios MVP', async () => {
      const user = await User.findOne({ w3id: 'user1' });
      await user.setMvp();

      const mvpUsers = await User.getMvpUsers();
      expect(mvpUsers).toHaveLength(1);
      expect(mvpUsers[0].w3id).toBe('user1');
    });
  });
}); 