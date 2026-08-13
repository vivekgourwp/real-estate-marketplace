const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check karo email pehle se exist toh nahi karta
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Password hash karo
    const passwordHash = await bcrypt.hash(password, 10);

    // User create karo
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = { signup };