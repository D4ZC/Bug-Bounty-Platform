const express = require('express');

const router = express.Router();

// Mock data for users
const users = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user',
    points: 1500,
    rank: 5,
    team: 'Team Alpha',
    joinDate: '2024-01-15'
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    role: 'admin',
    points: 2200,
    rank: 2,
    team: 'Team Beta',
    joinDate: '2024-01-10'
  },
  {
    id: 3,
    username: 'bob_wilson',
    email: 'bob@example.com',
    role: 'user',
    points: 800,
    rank: 15,
    team: 'Team Gamma',
    joinDate: '2024-02-01'
  }
];

// Get all users
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: users
  });
});

// Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  res.json({
    success: true,
    data: user
  });
});

// Create new user
router.post('/', (req, res) => {
  const { username, email, role } = req.body;

  if (!username || !email) {
    return res.status(400).json({
      success: false,
      message: 'Username and email are required'
    });
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    role: role || 'user',
    points: 0,
    rank: users.length + 1,
    team: null,
    joinDate: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });
});

// Update user
router.put('/:id', (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const {
    username, email, role, points, team
  } = req.body;

  users[userIndex] = {
    ...users[userIndex],
    ...(username && { username }),
    ...(email && { email }),
    ...(role && { role }),
    ...(points !== undefined && { points }),
    ...(team !== undefined && { team })
  };

  res.json({
    success: true,
    data: users[userIndex]
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  users.splice(userIndex, 1);

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

module.exports = router;
