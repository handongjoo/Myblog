const express = require("express");
const app = express();
const port = 3000;

const commentRouter = require('./routes/comment');
const loginRouter = require('./routes/login');
const postRouter = require('./routes/post');
const signupRouter = require('./routes/signup');

app.use('/', [commentRouter, loginRouter, postRouter,signupRouter]);
app.use(express.json());

app.get('/', (res, req) => {
    res.send("메인페이지")
})

app.listen(port, () => {
    console.log(port, "서버 오픈")
})