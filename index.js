require('dotenv').config();

const express = require('express');
const app = express();

// JSON body parse karne ke liye (zaroori hai req.body use karne ke liye)
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server chal raha hai!');
});

// Auth routes connect karna
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});