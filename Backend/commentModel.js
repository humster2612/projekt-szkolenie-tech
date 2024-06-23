// commentModel.js

const mongoose = require('mongoose');

// Определение схемы комментария
const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});

// Создание модели Comment на основе схемы
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
