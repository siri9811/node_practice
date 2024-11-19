const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));  // 폼 데이터 처리
app.use(express.json());  // JSON 데이터 처리

app.get('/', (req, res) => {
    res.render('base', {
      body: "body content"  
    });
  });
  
// MongoDB setup
const Schema = mongoose.Schema;
const WritingSchema = new Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});
const Writing = mongoose.model('Writing', WritingSchema);

mongoose
  .connect('mongodb://localhost:27017/')
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

  
app.get('/write', (req, res) => {
  res.render('write.ejs');
});

app.post('/write', async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const newWriting = new Writing({
        title,
        content
      });
  
      const savedWriting = await newWriting.save();
  
      // Debugging: 로그로 전달되는 데이터 확인
      console.log("Saved Writing:", savedWriting);
  
      // 전달된 데이터가 제대로 들어가 있는지 확인
      res.render('detail', {
        title: savedWriting.title,   // 제목
        content: savedWriting.content, // 내용
        date: savedWriting.date // 날짜
      });
    } catch (err) {
      console.error(err);
      res.render('write');
    }
  });
app.get('/search', (req, res) => {
  const searchQuery = req.query.id;

  if (searchQuery) {
    res.render('index', { searchResult: searchQuery });
  } else {
    res.render('index', { searchResult: 'Enter a search query' });
  }
});

app.listen(port, () => {
  console.log('Example app running');
});