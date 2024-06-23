const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./userModel'); // Путь к вашему файлу модели


const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 1000;

// Подключение к MongoDB
const mongoURI = 'mongodb://myuser:mypassword@localhost:27017/myappdb';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Пример создания нового пользователя при POST-запросе
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Проверьте, существует ли уже пользователь с таким же email или username
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Создание нового пользователя в базе данных
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: error.message });
  }
});



app.get('/api', (req, res) => {
  res.send('Hello from backend!');
});


// Слушаем порт сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
