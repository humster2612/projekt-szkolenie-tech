const mongoose = require('mongoose');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Создание модели User на основе схемы
const User = mongoose.model('User', userSchema);

module.exports = User;
