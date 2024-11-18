const express = require('express');
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(express.json())
// get -> 콜백함수 실행

//몽구스 세팅
const Schema = mongoose.Schema;

const WritingSchema = new Schema ({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Writing = mongoose.model('Writing', WritingSchema);

//몽구스 connect
mongoose
    .connect('mongodb://localhost:27017/')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


/*app.get('/', (req, res) => {
    res.render('index', {searchResult: null});
});*/

app.get('/write', (req, res) => {
    res.render('write.ejs');
});

app.post('/write', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    //db에 저장
    const newWriting = new Writing({
        title: String,
        contents: String,
    })
    const result = await Writing.save().then(() => {
        console.log('Success');
        res.render('detail', { title: title, content: content });
    }) .catch((err) =>{
        console.log(err);
        res.render('write')
    })
})



/*app.get('/sound/:name' ,(req,res) => {
    const {name} = req.params
    res.json({'sound': '야옹'})
})*/


app.get('/search', (req, res) => {
    const sq = req.query.id; // 쿼리 파라미터 추출
    /*if (sq) {
        res.send(`검색된 결과: ${sq}`); // 검색어가 있으면 결과 출력
    } else {
        res.send('검색어를 입력하세요'); // 없으면 메시지 반환
    }*/
        if (sq) {
            res.render('index', { searchResult: sq }); // 검색어를 searchResult로 전달
        } else {
            res.render('index', { searchResult: '검색어를 입력하세요' }); // 검색어가 없으면 메시지 표시
        }
});

app.listen(port, () => {
    console.log('example app')
})