require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
// JSON body parse karne ke liye (zaroori hai req.body use karne ke liye)
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server chal raha hai!');
});

// Auth routes connect karna
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

// Auth routes connect karna
const propertyRoutes = require('./src/routes/propertyRoutes');
app.use('/api/properties', propertyRoutes);

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});