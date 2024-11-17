const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.json())
// get -> 콜백함수 실행
app.get('/', (req, res) => {
    res.render('index', {searchResult: null});
});

app.get('/seongjin',(req,res) => {
    res.send('승진이 A+')
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